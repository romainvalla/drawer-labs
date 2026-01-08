# Publishing Guide

This guide explains how to publish the Detent packages to npm.

## Prerequisites

1. **npm Account**: You need an npm account. Create one at https://www.npmjs.com/signup
2. **Organization (Optional)**: You may want to create an npm organization for `@detent` scope
3. **GitHub Repository**: Already set up ✅

## One-Time Setup

### 1. Create an npm Account and Organization

```bash
# If you don't have an npm account yet
# Visit: https://www.npmjs.com/signup
```

**Important**: Since the packages use the `@detent` scope, you have two options:

**Option A: Create an npm organization (Recommended)**
1. Go to https://www.npmjs.com/org/create
2. Create an organization named `detent`
3. This allows you to publish `@detent/*` packages

**Option B: Use your personal scope**
1. Update package names in:
   - `packages/core/package.json`: Change `@detent/core` to `@yourusername/core`
   - `packages/react/package.json`: Change `detent` to `@yourusername/react`
2. Update the dependency in `packages/react/package.json`

### 2. Create npm Access Token

1. Log in to npm: https://www.npmjs.com/login
2. Go to Access Tokens: https://www.npmjs.com/settings/tokens
3. Click "Generate New Token" → "Classic Token"
4. Select "Automation" (for CI/CD)
5. Copy the token (starts with `npm_...`)

### 3. Add NPM_TOKEN to GitHub Secrets

1. Go to your GitHub repository: https://github.com/romainvalla/detent
2. Click "Settings" → "Secrets and variables" → "Actions"
3. Click "New repository secret"
4. Name: `NPM_TOKEN`
5. Value: Paste your npm token
6. Click "Add secret"

### 4. Configure Local npm Authentication (for manual publishing)

```bash
# Login to npm locally
npm login

# Verify you're logged in
npm whoami
```

## Publishing Workflow

### Automated Publishing (Recommended)

The project uses Changesets for automated version management and publishing via GitHub Actions.

#### Step 1: Create a Changeset

When you make changes that should trigger a release:

```bash
# Create a new changeset
pnpm changeset
```

Follow the prompts:
- Select which packages changed (space to select, enter to confirm)
- Choose version bump type:
  - `patch` (0.1.0 → 0.1.1) - Bug fixes
  - `minor` (0.1.0 → 0.2.0) - New features (backward compatible)
  - `major` (0.1.0 → 1.0.0) - Breaking changes
- Write a summary of changes

This creates a file in `.changeset/` directory.

#### Step 2: Commit and Push

```bash
git add .
git commit -m "feat: add new feature"
git push
```

#### Step 3: Automated Release

When changesets are pushed to `main`:

1. **GitHub Actions creates a "Version Packages" PR** containing:
   - Updated version numbers
   - Updated CHANGELOG files
   - Combined changeset summaries

2. **Review and merge the Version Packages PR**

3. **GitHub Actions automatically publishes to npm** when the version PR is merged

### Manual Publishing (Alternative)

If you prefer to publish manually:

```bash
# 1. Create changesets for your changes
pnpm changeset

# 2. Update versions
pnpm run version

# 3. Build packages
pnpm run build

# 4. Publish to npm
pnpm run release
```

## First Release

For your first release (publishing 0.1.0 → 1.0.0):

```bash
# 1. Create a changeset for the initial release
pnpm changeset

# Select both packages (core and react)
# Choose "major" for both (0.1.0 → 1.0.0)
# Summary: "Initial stable release"

# 2. Commit the changeset
git add .
git commit -m "chore: prepare for 1.0.0 release"
git push

# 3. Wait for GitHub Actions to create the Version PR
# 4. Review and merge the Version PR
# 5. Packages will be automatically published to npm
```

## Troubleshooting

### "ENEEDAUTH" Error

This means npm authentication is missing:

- **In GitHub Actions**: Check that `NPM_TOKEN` secret is set correctly
- **Locally**: Run `npm login` to authenticate

### "EPUBLISHCONFLICT" Error

The version already exists on npm. You need to bump the version:

```bash
pnpm changeset
pnpm run version
```

### "E403" Permission Denied

You don't have permission to publish to the `@detent` scope:

- Create the organization: https://www.npmjs.com/org/create
- Or change package names to use your personal scope

### Workflow Skipped

If the Release workflow is skipped, it means `NPM_TOKEN` is not set in GitHub secrets. Follow step 3 in the setup section.

### "use client" Warnings

The warnings about `"use client"` directives in the build output are expected and can be ignored. They occur because tsup bundles the files, but the directive is still included in the output.

## Package Validation

Before publishing, always validate your packages:

```bash
# Build packages
pnpm run build

# Run tests
pnpm run test

# Type check
pnpm run type-check

# Lint
pnpm run lint

# Validate package exports
cd packages/react && npx publint
cd packages/core && npx publint
```

## Post-Publishing

After publishing, verify the packages:

```bash
# Check package on npm
npm view detent
npm view @detent/core

# Test installation in a new project
mkdir test-install
cd test-install
npm init -y
npm install detent
```

## Version Strategy

We follow [Semantic Versioning](https://semver.org/):

- **Major (1.0.0 → 2.0.0)**: Breaking changes
- **Minor (1.0.0 → 1.1.0)**: New features, backward compatible
- **Patch (1.0.0 → 1.0.1)**: Bug fixes

### Pre-1.0 Releases

During pre-1.0 development:
- Breaking changes can use minor bumps (0.1.0 → 0.2.0)
- New features can use minor bumps (0.1.0 → 0.2.0)
- Bug fixes use patch bumps (0.1.0 → 0.1.1)

## CI/CD Workflows

### CI Workflow (`.github/workflows/ci.yml`)
- Runs on every push and PR
- Tests, linting, type-checking
- E2E tests with Playwright
- Code coverage reporting

### Release Workflow (`.github/workflows/publish.yml`)
- Runs on pushes to `main` (only if NPM_TOKEN is configured)
- Creates version PRs with changesets
- Automatically publishes when version PR is merged

## Resources

- [Changesets Documentation](https://github.com/changesets/changesets)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)

## Questions?

If you run into issues, check:
1. GitHub Actions logs for error details
2. npm documentation
3. Open an issue in the repository
