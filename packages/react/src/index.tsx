/**
 * detent
 * Snap-point drawers for React.
 */

import { version } from '@studioantipodes/detent-core';

// Version exports
export const reactVersion = '0.1.0';
export const coreVersion = version;

// Component exports
export { DrawerRoot } from './components/Root';
export { DrawerContent } from './components/Content';
export { DrawerOverlay } from './components/Overlay';
export { DrawerTrigger } from './components/Trigger';
export { DrawerClose } from './components/Close';
export { DrawerPortal } from './components/Portal';
export { DrawerTitle } from './components/Title';
export { DrawerDescription } from './components/Description';
export { DrawerHandle } from './components/Handle';

// Hook exports
export { useDrawerState } from './hooks/use-drawer-state';
export { useDrawerContext } from './context';
export { useFocusTrap } from './hooks/use-focus-trap';
export { useScrollLock } from './hooks/use-scroll-lock';
export { useResizeObserver } from './hooks/use-resize-observer';
export { useWillChange } from './hooks/use-will-change';

// Type exports
export type { DrawerRootProps } from './components/Root';
export type { DrawerContentProps } from './components/Content';
export type { DrawerOverlayProps } from './components/Overlay';
export type { DrawerTriggerProps } from './components/Trigger';
export type { DrawerCloseProps } from './components/Close';
export type { DrawerPortalProps } from './components/Portal';
export type { DrawerTitleProps } from './components/Title';
export type { DrawerDescriptionProps } from './components/Description';
export type { DrawerHandleProps } from './components/Handle';
export type { UseDrawerStateOptions } from './hooks/use-drawer-state';
export type { DrawerContextValue } from './context';
export type { Size } from './hooks/use-resize-observer';

import { DrawerClose } from './components/Close';
import { DrawerContent } from './components/Content';
import { DrawerDescription } from './components/Description';
import { DrawerHandle } from './components/Handle';
import { DrawerOverlay } from './components/Overlay';
import { DrawerPortal } from './components/Portal';
// Namespaced export
import { DrawerRoot } from './components/Root';
import { DrawerTitle } from './components/Title';
import { DrawerTrigger } from './components/Trigger';

export const Drawer = {
  Root: DrawerRoot,
  Content: DrawerContent,
  Overlay: DrawerOverlay,
  Trigger: DrawerTrigger,
  Close: DrawerClose,
  Portal: DrawerPortal,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Handle: DrawerHandle,
};
