#!/bin/bash

# Create a new project with cruft for local testing
# This script replicates the "Create a new project with cruft" step from .github/workflows/test.yml

set -e

rm -rf tests/abc

echo "Creating new project with cruft..."
cruft create . --output-dir tests --extra-context '{"project_name": "abc"}' --no-input

echo "Navigating to project directory..."
cd tests/abc

echo "Installing dependencies and running build, test, lint..."
pnpm install
pnpm build
CI=1 pnpm test
pnpm lint

echo "Project creation and testing completed successfully!"