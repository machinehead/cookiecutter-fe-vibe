import { Prisma, PrismaClient } from "./generated/prisma/index.js";
import { PrismaNeon } from "@prisma/adapter-neon";
import { createSpan } from "@ilyanekhay/ai-plumbing";
import { decrypt } from "@tka85/dotenvenc";
import path from "path";
import fs from "fs";
import { requireEnv } from "./env";

// Try to decrypt environment variables synchronously at module load time
export async function tryDecryptEnvVars() {
  // Skip decryption if DATABASE_URL is already available (local development)
  if (process.env.DATABASE_URL) {
    return;
  }

  console.info("Attempting to decrypt environment variables...");

  // Skip decryption if no password is available
  if (!process.env.DOTENVENC_PASS) {
    console.warn("Decryption password not set. Skipping decryption.");
    return;
  }

  // Determine stage - default to staging for builds
  const stage = process.env.SST_STAGE || process.env.STAGE || "staging";

  // Find project root by searching up from cwd until .enc file is found
  let current = process.cwd();
  let projectRoot = current;

  while (current !== path.parse(current).root) {
    const encryptedFile = path.join(current, `.env.${stage}.enc`);
    if (fs.existsSync(encryptedFile)) {
      projectRoot = current;
      break;
    }

    current = path.dirname(current);
  }

  const encryptedFile = path.resolve(projectRoot, `.env.${stage}.enc`);

  // Check if encrypted file exists
  if (!fs.existsSync(encryptedFile)) {
    console.warn(`Encrypted environment file not found: ${encryptedFile}`);
    return;
  }

  try {
    console.log(`Loading encrypted env: ${encryptedFile}`);
    await decrypt({ encryptedFile });
  } catch (error) {
    console.error("Failed to decrypt environment variables:", error);
    throw new Error(
      "Environment variable decryption failed. Aborting Prisma client creation.",
    );
  }
}

function createPrismaClient() {
  const connectionString = requireEnv("DATABASE_URL");

  // Use Neon adapter only for Neon database URLs
  const isNeonDatabase = connectionString.includes("neon.tech");

  // https://www.prisma.io/docs/guides/data-dog#3-install-required-dependencies-for-tracing

  const clientConfig: Prisma.PrismaClientOptions = {
    adapter: isNeonDatabase ? new PrismaNeon({ connectionString }) : null,
  };

  return new PrismaClient(clientConfig).$extends({
    query: {
      $allOperations({ operation, model, args, query }) {
        return createSpan(
          `prisma_query_${model?.toLowerCase()}_${operation}`,
          async () => {
            return await query(args);
          },
          {
            "prisma.operation": operation,
            "prisma.model": model?.toLowerCase() || "unknown",
            "prisma.args": JSON.stringify(args),
            // "prisma.rawQuery": query || "",
          },
        );
      },
    },
  });
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Re-export all generated Prisma types from the source location
export * from "./generated/prisma/index.js";
