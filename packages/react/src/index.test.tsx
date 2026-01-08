import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHandle,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
  coreVersion,
  reactVersion,
  useFocusTrap,
  useResizeObserver,
  useScrollLock,
  useWillChange,
} from './index';

describe('@drawer-labs/react', () => {
  it('exports reactVersion', () => {
    expect(reactVersion).toBe('0.1.0');
  });

  it('exports coreVersion', () => {
    expect(coreVersion).toBeDefined();
  });

  it('exports all components', () => {
    expect(DrawerRoot).toBeDefined();
    expect(DrawerTrigger).toBeDefined();
    expect(DrawerContent).toBeDefined();
    expect(DrawerOverlay).toBeDefined();
    expect(DrawerClose).toBeDefined();
    expect(DrawerPortal).toBeDefined();
    expect(DrawerTitle).toBeDefined();
    expect(DrawerDescription).toBeDefined();
    expect(DrawerHandle).toBeDefined();
  });

  it('exports all hooks', () => {
    expect(useFocusTrap).toBeDefined();
    expect(useScrollLock).toBeDefined();
    expect(useResizeObserver).toBeDefined();
    expect(useWillChange).toBeDefined();
  });

  it('exports namespaced Drawer object', () => {
    expect(Drawer.Root).toBe(DrawerRoot);
    expect(Drawer.Trigger).toBe(DrawerTrigger);
    expect(Drawer.Content).toBe(DrawerContent);
    expect(Drawer.Overlay).toBe(DrawerOverlay);
    expect(Drawer.Close).toBe(DrawerClose);
    expect(Drawer.Portal).toBe(DrawerPortal);
    expect(Drawer.Title).toBe(DrawerTitle);
    expect(Drawer.Description).toBe(DrawerDescription);
    expect(Drawer.Handle).toBe(DrawerHandle);
  });

  describe('Drawer Component Integration', () => {
    it('renders drawer in closed state by default', () => {
      render(
        <Drawer.Root>
          <Drawer.Trigger>Open</Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Content>Content</Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      );

      const content = screen.queryByText('Content');
      expect(content).toHaveAttribute('data-state', 'closed');
    });

    it('opens drawer when trigger is clicked', () => {
      render(
        <Drawer.Root>
          <Drawer.Trigger>Open</Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Content>Content</Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      );

      const trigger = screen.getByText('Open');
      fireEvent.click(trigger);

      const content = screen.getByText('Content');
      expect(content).toHaveAttribute('data-state', 'open');
    });

    it('closes drawer when close button is clicked', () => {
      render(
        <Drawer.Root defaultOpen>
          <Drawer.Portal>
            <Drawer.Content>
              Content
              <Drawer.Close>Close</Drawer.Close>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      );

      expect(screen.getByText('Content')).toHaveAttribute('data-state', 'open');

      const closeButton = screen.getByText('Close');
      fireEvent.click(closeButton);

      expect(screen.getByText('Content')).toHaveAttribute('data-state', 'closed');
    });

    it('calls onOpenChange when drawer state changes', () => {
      const onOpenChange = vi.fn();

      render(
        <Drawer.Root onOpenChange={onOpenChange}>
          <Drawer.Trigger>Open</Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Content>Content</Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      );

      const trigger = screen.getByText('Open');
      fireEvent.click(trigger);

      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('supports controlled state', () => {
      const { rerender } = render(
        <Drawer.Root open={false}>
          <Drawer.Portal>
            <Drawer.Content>Content</Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      );

      expect(screen.getByText('Content')).toHaveAttribute('data-state', 'closed');

      rerender(
        <Drawer.Root open={true}>
          <Drawer.Portal>
            <Drawer.Content>Content</Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      );

      expect(screen.getByText('Content')).toHaveAttribute('data-state', 'open');
    });

    it('renders overlay with correct attributes', () => {
      render(
        <Drawer.Root defaultOpen>
          <Drawer.Portal>
            <Drawer.Overlay data-testid="overlay" />
            <Drawer.Content>Content</Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      );

      const overlay = screen.getByTestId('overlay');
      expect(overlay).toHaveAttribute('data-state', 'open');
    });

    it('closes drawer when overlay is clicked and dismissible', () => {
      render(
        <Drawer.Root defaultOpen dismissible>
          <Drawer.Portal>
            <Drawer.Overlay data-testid="overlay" />
            <Drawer.Content>Content</Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      );

      const overlay = screen.getByTestId('overlay');
      fireEvent.click(overlay);

      expect(screen.getByText('Content')).toHaveAttribute('data-state', 'closed');
    });

    it('renders Title and Description components', () => {
      render(
        <Drawer.Root defaultOpen>
          <Drawer.Portal>
            <Drawer.Content>
              <Drawer.Title>Drawer Title</Drawer.Title>
              <Drawer.Description>Drawer Description</Drawer.Description>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      );

      expect(screen.getByText('Drawer Title')).toBeInTheDocument();
      expect(screen.getByText('Drawer Description')).toBeInTheDocument();
    });

    it('supports different directions', () => {
      render(
        <Drawer.Root direction="top">
          <Drawer.Portal>
            <Drawer.Content>Content</Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      );

      const content = screen.getByText('Content');
      expect(content).toHaveAttribute('data-direction', 'top');
    });
  });

  describe('Phase 4: Accessibility Features', () => {
    it('renders DrawerContent with aria-modal attribute when modal', () => {
      render(
        <Drawer.Root defaultOpen modal>
          <Drawer.Portal>
            <Drawer.Content>Content</Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      );

      const content = screen.getByText('Content');
      expect(content).toHaveAttribute('role', 'dialog');
      expect(content).toHaveAttribute('aria-modal', 'true');
    });

    it('renders DrawerContent with aria-labelledby when provided', () => {
      render(
        <Drawer.Root defaultOpen>
          <Drawer.Portal>
            <Drawer.Content aria-labelledby="drawer-title">
              <Drawer.Title id="drawer-title">Title</Drawer.Title>
              Content
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      );

      const content = screen.getByText(/Content/);
      expect(content).toHaveAttribute('aria-labelledby', 'drawer-title');
    });

    it('renders DrawerContent with aria-describedby when provided', () => {
      render(
        <Drawer.Root defaultOpen>
          <Drawer.Portal>
            <Drawer.Content aria-describedby="drawer-desc">
              <Drawer.Description id="drawer-desc">Description</Drawer.Description>
              Content
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      );

      const content = screen.getByText(/Content/);
      expect(content).toHaveAttribute('aria-describedby', 'drawer-desc');
    });

    it('renders DrawerHandle with default styling', () => {
      render(
        <Drawer.Root defaultOpen>
          <Drawer.Portal>
            <Drawer.Content>
              <Drawer.Handle data-testid="handle" />
              Content
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      );

      const handle = screen.getByTestId('handle');
      expect(handle).toBeInTheDocument();
      expect(handle).toHaveAttribute('data-drawer-handle');
    });

    it('renders DrawerHandle with custom children', () => {
      render(
        <Drawer.Root defaultOpen>
          <Drawer.Portal>
            <Drawer.Content>
              <Drawer.Handle>Custom Handle</Drawer.Handle>
              Content
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      );

      expect(screen.getByText('Custom Handle')).toBeInTheDocument();
    });

    it('locks body scroll when modal and open', () => {
      render(
        <Drawer.Root defaultOpen modal>
          <Drawer.Portal>
            <Drawer.Content>Content</Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      );

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores body scroll when closed', () => {
      const { rerender } = render(
        <Drawer.Root open={true} modal>
          <Drawer.Portal>
            <Drawer.Content>Content</Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      );

      expect(document.body.style.overflow).toBe('hidden');

      rerender(
        <Drawer.Root open={false} modal>
          <Drawer.Portal>
            <Drawer.Content>Content</Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      );

      expect(document.body.style.overflow).not.toBe('hidden');
    });

    it('applies touchAction none to DrawerContent for gesture handling', () => {
      render(
        <Drawer.Root defaultOpen>
          <Drawer.Portal>
            <Drawer.Content data-testid="content">Content</Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      );

      const content = screen.getByTestId('content');
      expect(content.style.touchAction).toBe('none');
    });
  });
});
