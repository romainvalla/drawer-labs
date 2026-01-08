# detent

Snap-point drawers for React.

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

## Installation

```bash
npm install detent
# or
pnpm add detent
# or
yarn add detent
```

## Quick Start

```tsx
import { Drawer } from 'detent';

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

## API Reference

### Components

#### `Drawer.Root`

The main container component that manages drawer state and context.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `undefined` | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Uncontrolled default open state |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | Callback when open state changes |
| `direction` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Direction drawer opens from |
| `modal` | `boolean` | `false` | Whether drawer is modal (locks scroll, traps focus) |
| `dismissible` | `boolean` | `true` | Whether drawer can be dismissed by dragging/clicking overlay |

#### `Drawer.Content`

The main drawer content container with gesture handling.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `snapPoints` | `Array<number \| string>` | `undefined` | Snap points for drawer |
| `closeThreshold` | `number` | `0.3` | Percentage dragged to trigger close |
| `velocityThreshold` | `number` | `0.5` | Velocity threshold to trigger close |
| `springConfig` | `'gentle' \| 'wobbly' \| 'stiff' \| 'slow'` | `'gentle'` | Spring animation preset |

### Hooks

#### `useDrawerContext()`

Access drawer context within drawer components.

#### `useResizeObserver<T>()`

Observe element size changes.

## Examples

### Controlled State

```tsx
const [open, setOpen] = useState(false);

<Drawer.Root open={open} onOpenChange={setOpen}>
  <Drawer.Trigger>Open</Drawer.Trigger>
  <Drawer.Portal>
    <Drawer.Overlay />
    <Drawer.Content>
      <p>Controlled drawer</p>
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>
```

### Different Directions

```tsx
<Drawer.Root direction="top">...</Drawer.Root>
<Drawer.Root direction="left">...</Drawer.Root>
<Drawer.Root direction="right">...</Drawer.Root>
```

## License

MIT © Detent
