#!/bin/bash

# Create a new project with cruft for local testing
# This script replicates the "Create a new project with cruft" step from .github/workflows/test.yml

set -e

rm -r tests/abc

echo "Creating new project with cruft..."
cruft create . --output-dir tests --extra-context '{"project_name": "abc"}' --no-input

echo "Navigating to project directory..."
cd tests/abc

echo "Checking Prisma schema..."
cat packages/shared/prisma/schema.prisma

echo "Installing dependencies and running build, test, lint..."
pnpm install
pnpm build
pnpm test
pnpm lint

echo "Project creation and testing completed successfully!"