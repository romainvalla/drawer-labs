import type { GestureState, PointerTracker } from '@studioantipodes/detent-core';
import { createContext, useContext } from 'react';

export interface DrawerContextValue {
  // State
  isOpen: boolean;
  isDragging: boolean;
  direction: 'top' | 'bottom' | 'left' | 'right';
  currentOffset: number;
  activeSnapIndex: number;

  // Gesture data
  gestureState: GestureState | null;

  // Controls
  open: () => void;
  close: () => void;
  toggle: () => void;
  snapTo: (index: number) => void;

  // State setters
  setIsDragging: (isDragging: boolean) => void;
  setCurrentOffset: (offset: number) => void;
  setActiveSnapIndex: (index: number) => void;
  setGestureState: (state: GestureState | null) => void;

  // Refs
  contentRef: React.RefObject<HTMLDivElement>;
  overlayRef: React.RefObject<HTMLDivElement>;
  pointerTracker: React.MutableRefObject<PointerTracker>;

  // Configuration
  dismissible: boolean;
  modal: boolean;
  nested: boolean;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

export function useDrawerContext(): DrawerContextValue {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error('useDrawerContext must be used within a Drawer.Root');
  }

  return context;
}

export const DrawerProvider = DrawerContext.Provider;
