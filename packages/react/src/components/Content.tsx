import { SPRING_PRESETS, SpringAnimation } from '@studioantipodes/detent-core';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDrawerContext } from '../context';
import { useFocusTrap } from '../hooks/use-focus-trap';
import { useScrollLock } from '../hooks/use-scroll-lock';
import { useWillChange } from '../hooks/use-will-change';
import { mergeRefs } from '../utils/merge-refs';

export interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  snapPoints?: Array<number | string>;
  closeThreshold?: number;
  velocityThreshold?: number;
  springConfig?: keyof typeof SPRING_PRESETS;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  (props, forwardedRef) => {
    const {
      children,
      snapPoints,
      closeThreshold = 0.3,
      velocityThreshold = 0.5,
      springConfig = 'gentle',
      onPointerDown,
      onPointerMove,
      onPointerUp,
      style,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      ...restProps
    } = props;

    const context = useDrawerContext();
    const {
      isOpen,
      direction,
      contentRef,
      pointerTracker,
      setIsDragging,
      setCurrentOffset,
      setGestureState,
      dismissible,
      close,
      modal,
      isDragging,
    } = context;

    const springAnimation = useRef(new SpringAnimation(0, SPRING_PRESETS[springConfig]));

    // Performance optimization: will-change
    useWillChange(isDragging || isOpen, ['transform', 'opacity']);

    // Accessibility: focus trap when modal
    useFocusTrap(contentRef, modal && isOpen);

    // Accessibility: scroll lock when modal and open
    useScrollLock(modal && isOpen);

    // Handle pointer down
    const handlePointerDown = useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        onPointerDown?.(event);

        if (!dismissible) return;

        const gesture = pointerTracker.current.start({
          clientX: event.clientX,
          clientY: event.clientY,
          timeStamp: event.timeStamp,
          pointerId: event.pointerId,
        });

        setIsDragging(true);
        setGestureState(gesture);

        // Capture pointer for smooth tracking
        event.currentTarget.setPointerCapture(event.pointerId);
      },
      [dismissible, onPointerDown, pointerTracker, setIsDragging, setGestureState]
    );

    // Handle pointer move
    const handlePointerMove = useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        onPointerMove?.(event);

        const gesture = pointerTracker.current.getState();
        if (!gesture.isDragging) return;

        const updated = pointerTracker.current.move({
          clientX: event.clientX,
          clientY: event.clientY,
          timeStamp: event.timeStamp,
          pointerId: event.pointerId,
        });

        setGestureState(updated);

        // Calculate offset based on direction
        const isVertical = direction === 'top' || direction === 'bottom';
        const delta = isVertical ? updated.deltaY : updated.deltaX;

        // Apply dampening when dragging in wrong direction
        const shouldDampen =
          (direction === 'bottom' && delta < 0) ||
          (direction === 'top' && delta > 0) ||
          (direction === 'right' && delta < 0) ||
          (direction === 'left' && delta > 0);

        const dampenedDelta = shouldDampen ? delta * 0.3 : delta;
        setCurrentOffset(dampenedDelta);

        // Apply transform directly for immediate feedback
        if (contentRef.current) {
          const transform = isVertical
            ? `translateY(${dampenedDelta}px)`
            : `translateX(${dampenedDelta}px)`;
          contentRef.current.style.transform = transform;
        }
      },
      [direction, onPointerMove, pointerTracker, setGestureState, setCurrentOffset, contentRef]
    );

    // Handle pointer up
    const handlePointerUp = useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        onPointerUp?.(event);

        const gesture = pointerTracker.current.end({
          clientX: event.clientX,
          clientY: event.clientY,
          timeStamp: event.timeStamp,
          pointerId: event.pointerId,
        });

        setIsDragging(false);
        setGestureState(gesture);

        event.currentTarget.releasePointerCapture(event.pointerId);

        // Determine if should close
        const isVertical = direction === 'top' || direction === 'bottom';
        const delta = isVertical ? gesture.deltaY : gesture.deltaX;
        const velocity = isVertical ? gesture.velocityY : gesture.velocityX;

        const containerSize = isVertical
          ? (contentRef.current?.offsetHeight ?? 0)
          : (contentRef.current?.offsetWidth ?? 0);

        const dragPercentage = Math.abs(delta) / containerSize;
        const hasSignificantVelocity = Math.abs(velocity) > velocityThreshold;
        const hasSignificantDrag = dragPercentage > closeThreshold;

        const shouldClose = dismissible && (hasSignificantVelocity || hasSignificantDrag);

        if (shouldClose) {
          // Animate to closed position
          const targetOffset =
            containerSize * (direction === 'top' || direction === 'left' ? -1 : 1);
          springAnimation.current.setTarget(targetOffset, velocity);
          springAnimation.current.onComplete = close;
        } else {
          // Animate back to open position
          springAnimation.current.setTarget(0, velocity);
        }

        springAnimation.current.onUpdate = (value) => {
          setCurrentOffset(value);
          if (contentRef.current) {
            const transform = isVertical ? `translateY(${value}px)` : `translateX(${value}px)`;
            contentRef.current.style.transform = transform;
          }
        };
      },
      [
        direction,
        onPointerUp,
        pointerTracker,
        setIsDragging,
        setGestureState,
        setCurrentOffset,
        contentRef,
        dismissible,
        closeThreshold,
        velocityThreshold,
        close,
      ]
    );

    // Reset position when opened/closed
    useEffect(() => {
      if (isOpen) {
        setCurrentOffset(0);
        if (contentRef.current) {
          contentRef.current.style.transform = '';
        }
      }
    }, [isOpen, setCurrentOffset, contentRef]);

    const mergedRef = mergeRefs(contentRef, forwardedRef);

    return (
      <div
        ref={mergedRef}
        // biome-ignore lint/a11y/useSemanticElements: Using div with role="dialog" for full control over drawer behavior. The HTML dialog element's imperative API doesn't work well with React's declarative model.
        role="dialog"
        aria-modal={modal}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        data-state={isOpen ? 'open' : 'closed'}
        data-direction={direction}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          touchAction: 'none',
          ...style,
        }}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

DrawerContent.displayName = 'DrawerContent';
