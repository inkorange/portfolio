# Git Hooks

This directory contains Git hooks for the project.

## Pre-commit Hook

The pre-commit hook runs TypeScript type checking before allowing commits.

### Installation

To install the hooks, run:

```bash
# Copy the pre-commit hook to your .git/hooks directory
cp .githooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

Or configure Git to use this directory for hooks:

```bash
git config core.hooksPath .githooks
```

### What it does

- Runs `npx tsc --noEmit` to check for TypeScript errors
- Prevents commits if any TypeScript errors are found
- Shows clear error messages

### Bypassing the hook

If you absolutely need to bypass the hook (not recommended):

```bash
git commit --no-verify
```
