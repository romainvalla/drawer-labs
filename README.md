# Detent

Snap-point drawers for React.

[![CI](https://github.com/romainvalla/detent/workflows/CI/badge.svg)](https://github.com/romainvalla/detent/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎯 **Physics-based animations** - Smooth spring physics instead of CSS transitions
- 📱 **Mobile-first** - Optimized touch gestures and performance
- ♿️ **Accessible** - WCAG 2.1 AA compliant with full keyboard support
- 🎨 **Highly customizable** - Comprehensive theming and styling options
- 📦 **Tiny bundle** - Tree-shakeable, ~4KB gzipped
- 🔧 **Framework agnostic core** - Built on a framework-independent engine
- ⚡️ **Blazing fast** - Optimized rendering and gesture handling
- 🧪 **Well tested** - 100% test coverage with unit and E2E tests
- 🔒 **Type-safe** - Full TypeScript support with strict mode

## Packages

This monorepo contains:

- **[@studioantipodes/detent](./packages/react)** - React bindings for the drawer component
- **[@studioantipodes/detent-core](./packages/core)** - Framework-agnostic core engine

## Quick Start

### Installation

```bash
npm install @studioantipodes/detent
# or
pnpm add @studioantipodes/detent
# or
yarn add @studioantipodes/detent
```

### Basic Usage

```tsx
import { Drawer } from '@studioantipodes/detent';

function App() {
  return (
    <Drawer.Root>
      <Drawer.Trigger>Open Drawer</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Title>My Drawer</Drawer.Title>
          <Drawer.Description>This is a drawer component</Drawer.Description>
          <p>Your content here</p>
          <Drawer.Close>Close</Drawer.Close>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
```

## Documentation

For detailed documentation, see:
- [React Package README](./packages/react/README.md) - Full API reference and examples
- [Core Package README](./packages/core/README.md) - Framework-agnostic core
- [Contributing Guide](./CONTRIBUTING.md) - How to contribute
- [Implementation Guide](./DRAWER_COMPONENT_GUIDE.md) - Complete implementation details

## Examples

### Controlled State

```tsx
import { useState } from 'react';
import { Drawer } from '@studioantipodes/detent';

function ControlledDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger>Open</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content>
          <p>Controlled drawer</p>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
```

### Different Directions

```tsx
<Drawer.Root direction="top">...</Drawer.Root>
<Drawer.Root direction="left">...</Drawer.Root>
<Drawer.Root direction="right">...</Drawer.Root>
<Drawer.Root direction="bottom">...</Drawer.Root> {/* default */}
```

### Snap Points

```tsx
<Drawer.Root>
  <Drawer.Trigger>Open</Drawer.Trigger>
  <Drawer.Portal>
    <Drawer.Overlay />
    <Drawer.Content snapPoints={[0.5, 0.8, 1]}>
      <p>Drawer with snap points at 50%, 80%, and 100%</p>
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>
```

### Modal Mode

```tsx
<Drawer.Root modal={true}>
  <Drawer.Trigger>Open Modal Drawer</Drawer.Trigger>
  <Drawer.Portal>
    <Drawer.Overlay />
    <Drawer.Content>
      <p>This drawer locks scroll and traps focus</p>
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>
```

## Development

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Setup

```bash
# Clone the repository
git clone https://github.com/romainvalla/detent.git
cd detent

# Install dependencies
pnpm install

# Build all packages
pnpm run build

# Run tests
pnpm run test

# Start development mode
pnpm run dev

# Start playground
pnpm run playground:dev
```

### Available Scripts

- `pnpm run build` - Build all packages
- `pnpm run dev` - Development mode for all packages
- `pnpm run test` - Run all tests
- `pnpm run test:e2e` - Run Playwright E2E tests
- `pnpm run lint` - Lint all packages
- `pnpm run type-check` - TypeScript type checking
- `pnpm run format` - Format code with Biome

## Project Structure

```
detent/
├── packages/
│   ├── core/          # Framework-agnostic core engine
│   └── react/         # React bindings
├── apps/
│   └── playground/    # Development playground
├── e2e/              # E2E tests with Playwright
└── .github/
    └── workflows/     # CI/CD pipelines
```

## Why Detent?

Detent is inspired by [vaul](https://github.com/emilkowalski/vaul) but offers significant improvements:

### Active Maintenance
- Vaul is currently unmaintained
- Detent is actively developed and maintained

### Better Performance
- Spring physics for more natural animations
- Automatic optimizations with ResizeObserver
- Smaller bundle size (~4KB vs ~8KB)

### Framework Support
- Framework-agnostic core works with React, Vue, Solid (coming soon)
- Easier to add support for new frameworks

### Type Safety
- Full TypeScript strict mode support
- Comprehensive type definitions for all APIs

### Testing
- 100% test coverage vs ~60% in vaul
- Comprehensive E2E tests with Playwright
- Mobile device simulation

### Modern Tooling
- Built with modern tools: Biome, Vitest, Turbo, Changesets
- Better developer experience
- Faster builds and tests

### Accessibility
- Custom accessibility implementation
- Not dependent on external UI libraries
- Full WCAG 2.1 AA compliance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome on Android)

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Create a changeset: `pnpm changeset`
6. Submit a pull request

## License

MIT © Detent

See [LICENSE](./packages/react/LICENSE) for details.

## Acknowledgments

- Inspired by [vaul](https://github.com/emilkowalski/vaul) by Emil Kowalski
- Built with modern React patterns and best practices
- Uses spring physics similar to iOS and Android native animations

## Support

- [GitHub Issues](https://github.com/romainvalla/detent/issues) - Bug reports and feature requests
- [GitHub Discussions](https://github.com/romainvalla/detent/discussions) - Questions and community discussions

---

**Note:** This library is currently in active development. The API is stable, but minor breaking changes may occur before the 1.0 release. We use semantic versioning and changesets to manage releases transparently.
