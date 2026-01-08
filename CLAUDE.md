# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: Detent

A modern, performant drawer component library inspired by [vaul](https://github.com/emilkowalski/vaul) but with significant improvements in architecture, performance, and developer experience.

## Documentation

The complete step-by-step implementation guide is available in `DRAWER_COMPONENT_GUIDE.md`. This guide covers:
- Understanding vaul's architecture and limitations
- Complete monorepo setup with modern tooling
- Framework-agnostic core engine implementation
- React bindings with advanced features
- Comprehensive testing strategy
- Documentation and CI/CD setup

## Project Architecture

### Monorepo Structure
```
packages/
  core/          # Framework-agnostic gesture & animation engine
  react/         # React bindings (primary package)
  solid/         # Solid.js bindings (future)
  vue/           # Vue bindings (future)
apps/
  docs/          # Documentation site (Nextra)
  playground/    # Development sandbox
```

### Tech Stack
- **Package Manager**: pnpm (workspace mode)
- **Build System**: Turborepo + tsup/unbuild
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Linting**: Biome (faster alternative to ESLint+Prettier)
- **TypeScript**: Strict mode enabled
- **CI/CD**: GitHub Actions with automated publishing

### Core Technologies
- TypeScript 5.3+ (strict mode)
- React 18+ (hooks-based architecture)
- Spring physics animations (replacing CSS transitions)
- Gesture detection with velocity tracking
- ResizeObserver for responsive handling

## Development Commands

### Initial Setup
```bash
pnpm install                    # Install all dependencies
pnpm run build                  # Build all packages
```

### Development
```bash
pnpm run dev                    # Start dev mode for all packages
pnpm run dev --filter detent    # Dev mode for specific package
```

### Testing
```bash
pnpm run test                   # Run all tests
pnpm run test:coverage          # Run tests with coverage
pnpm run test:e2e               # Run Playwright E2E tests
npx playwright test --ui        # Run E2E tests in UI mode
```

### Code Quality
```bash
pnpm run lint                   # Lint all packages
pnpm run type-check             # TypeScript type checking
biome check .                   # Run Biome linter/formatter
biome check --apply .           # Auto-fix issues
```

### Building
```bash
pnpm run build                  # Build all packages
pnpm run build --filter @detent/core   # Build specific package
publint                         # Validate package exports
```

## Key Implementation Concepts

### Framework-Agnostic Core
The `packages/core` contains all business logic:
- `PointerTracker` - Gesture detection with velocity calculation
- `SpringAnimation` - Physics-based animations
- `SnapPointCalculator` - Snap point resolution and targeting

This allows framework-specific packages to be thin wrappers around the core logic.

### Spring Physics
Unlike vaul's CSS transitions, this uses spring physics for more natural motion:
- Configurable stiffness, damping, and mass
- Velocity inheritance from gestures
- Interruptible animations
- Multiple presets (gentle, wobbly, stiff, etc.)

### Gesture System
Advanced pointer tracking with:
- Velocity calculation using history buffer
- Direction detection
- Dampening for wrong-direction drags
- Smooth pointer capture/release

### Type Safety
- Full TypeScript strict mode
- No `any` types
- Exported type definitions for all APIs
- Discriminated unions for state management

## Testing Strategy

### Unit Tests (Vitest)
- Test core logic in isolation
- Mock DOM APIs where needed
- Aim for 100% coverage
- Fast feedback loop

### E2E Tests (Playwright)
- Test real user interactions
- Mobile device simulation
- Gesture testing with touch events
- Accessibility validation
- Visual regression testing

## Publishing

### Package Requirements
- All tests must pass
- 100% type coverage
- `publint` validation passes
- Semantic versioning via changesets

### Release Process
1. Create changeset: `pnpm changeset`
2. Version packages: `pnpm changeset version`
3. Build and test: `pnpm run build && pnpm run test`
4. Publish: `pnpm publish -r --access public`

## Design Decisions

### Why Monorepo?
- Shared core logic across frameworks
- Coordinated versioning
- Easier testing of integration
- Better developer experience

### Why pnpm + Turbo?
- Faster than npm/yarn
- Better dependency management
- Efficient caching with Turbo
- Industry standard for modern monorepos

### Why Biome over ESLint?
- 100x faster
- Single tool (linter + formatter)
- Better error messages
- Lower configuration overhead

### Why Spring Physics?
- More natural motion
- Velocity inheritance
- Better user experience
- Industry standard (iOS, Android use springs)

### Why Framework-Agnostic Core?
- Code reuse across frameworks
- Easier to test
- Future-proof architecture
- Smaller bundle per framework

## Improvements Over Vaul

1. **Active Maintenance** - Vaul is unmaintained
2. **Better Performance** - Spring physics, automatic optimizations
3. **Framework Support** - Core works with React, Vue, Solid
4. **TypeScript** - Full strict mode vs partial typing
5. **Testing** - 100% coverage vs ~60%
6. **Bundle Size** - ~4KB vs ~8KB
7. **Modern Tooling** - Biome, Vitest, Turbo
8. **Documentation** - Interactive docs with examples
9. **Accessibility** - Custom implementation, not dependent on Radix
10. **Resize Handling** - Automatic via ResizeObserver

## Next Steps

Follow the `DRAWER_COMPONENT_GUIDE.md` to implement each phase:
1. Phase 1: Project Setup & Architecture
2. Phase 2: Core Engine (Framework-Agnostic)
3. Phase 3: React Integration
4. Phase 4: Advanced Features
5. Phase 5: Testing & Documentation
6. Phase 6: Distribution & Maintenance
