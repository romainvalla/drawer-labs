# Contributing to Detent

Thank you for your interest in contributing to Detent! This guide will help you get started.

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/detent/detent.git
cd detent

# Install dependencies
pnpm install

# Build all packages
pnpm run build

# Run tests to ensure everything is working
pnpm run test
```

## Project Structure

```
detent/
├── packages/
│   ├── core/          # Framework-agnostic core engine
│   └── react/         # React bindings
├── apps/
│   └── playground/    # Development playground
└── .github/
    └── workflows/     # CI/CD pipelines
```

## Development Workflow

### Running in Development Mode

```bash
# Start dev mode for all packages
pnpm run dev

# Start dev mode for specific package
pnpm run dev --filter detent

# Start the playground app
pnpm run playground:dev
```

### Running Tests

```bash
# Run all unit tests
pnpm run test

# Run tests in watch mode
pnpm run test --watch

# Run tests with coverage
pnpm run test:coverage

# Run E2E tests
pnpm run test:e2e

# Run E2E tests in UI mode
npx playwright test --ui
```

### Code Quality

```bash
# Type check all packages
pnpm run type-check

# Lint all packages
pnpm run lint

# Format code with Biome
pnpm run format
```

## Making Changes

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

- Write clear, concise commit messages
- Follow the existing code style
- Add tests for new features
- Update documentation as needed

### 3. Run Quality Checks

```bash
# Ensure all checks pass before committing
pnpm run type-check
pnpm run lint
pnpm run test
```

### 4. Create a Changeset

For changes that affect the public API or require a version bump:

```bash
pnpm changeset
```

Follow the prompts to:
- Select which packages are affected
- Choose the version bump type (patch, minor, major)
- Write a clear summary of the changes

### 5. Submit a Pull Request

- Push your branch to GitHub
- Create a pull request against the `main` branch
- Fill out the PR template with relevant information
- Wait for CI checks to pass
- Address any review feedback

## Code Style Guidelines

### TypeScript

- Use TypeScript strict mode
- Avoid `any` types
- Export types for all public APIs
- Use meaningful variable and function names

### React Components

- Use functional components with hooks
- Keep components focused and single-purpose
- Use proper prop types
- Include accessibility attributes

### Testing

- Write tests for all new features
- Aim for high test coverage
- Test edge cases and error conditions
- Use descriptive test names

### Documentation

- Update README files for API changes
- Add JSDoc comments for public APIs
- Include code examples for new features

## Package Publishing

Only maintainers can publish packages. The process is automated via GitHub Actions:

1. Merge PR with changeset to `main`
2. GitHub Actions creates a "Version Packages" PR
3. Merge the version PR to publish to npm

## Project Commands Reference

### Build Commands
- `pnpm run build` - Build all packages
- `pnpm run dev` - Development mode for all packages
- `pnpm run clean` - Clean build artifacts

### Testing Commands
- `pnpm run test` - Run unit tests
- `pnpm run test:coverage` - Run tests with coverage
- `pnpm run test:e2e` - Run Playwright E2E tests

### Quality Commands
- `pnpm run lint` - Lint all packages with Biome
- `pnpm run type-check` - TypeScript type checking
- `pnpm run format` - Format code with Biome

### Release Commands (Maintainers)
- `pnpm changeset` - Create a new changeset
- `pnpm run version` - Update package versions
- `pnpm run release` - Build and publish packages

## Getting Help

- Open an issue for bug reports
- Start a discussion for questions
- Join our community chat (coming soon)

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow GitHub's Community Guidelines

## License

By contributing to Detent, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing! 🎉
