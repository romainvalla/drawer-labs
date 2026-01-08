import { type GestureState, PointerTracker } from '@drawer-labs/core';
import { useCallback, useRef, useState } from 'react';

export interface UseDrawerStateOptions {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  modal?: boolean;
  dismissible?: boolean;
}

export function useDrawerState(options: UseDrawerStateOptions = {}) {
  const {
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    direction = 'bottom',
    modal = true,
    dismissible = true,
  } = options;

  // Controlled vs uncontrolled state
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = controlledOpen ?? uncontrolledOpen;

  const [isDragging, setIsDragging] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [activeSnapIndex, setActiveSnapIndex] = useState(0);
  const [gestureState, setGestureState] = useState<GestureState | null>(null);

  const pointerTracker = useRef(new PointerTracker());
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const setOpen = useCallback(
    (newOpen: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [controlledOpen, onOpenChange]
  );

  const open = useCallback(() => setOpen(true), [setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);
  const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen]);

  const snapTo = useCallback((index: number) => {
    setActiveSnapIndex(index);
  }, []);

  return {
    // State
    isOpen,
    isDragging,
    direction,
    currentOffset,
    activeSnapIndex,
    gestureState,

    // State setters
    setIsDragging,
    setCurrentOffset,
    setActiveSnapIndex,
    setGestureState,

    // Controls
    open,
    close,
    toggle,
    snapTo,

    // Refs
    contentRef,
    overlayRef,
    pointerTracker,

    // Configuration
    dismissible,
    modal,
  };
}
