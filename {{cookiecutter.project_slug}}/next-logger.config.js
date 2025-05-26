// eslint-disable-next-line @typescript-eslint/no-require-imports
const pino = require("pino");

const logger = (defaultConfig) =>
  pino({
    ...defaultConfig,
    // messageKey: "message",
    // mixin: () => ({ name: "custom-pino-instance" }),
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        // translateTime: "SYS:standard",
        ignore: "pid,hostname",
      },
    },
  });

module.exports = {
  logger,
};
