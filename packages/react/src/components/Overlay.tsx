import React from 'react';
import { useDrawerContext } from '../context';
import { mergeRefs } from '../utils/merge-refs';

export interface DrawerOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const DrawerOverlay = React.forwardRef<HTMLDivElement, DrawerOverlayProps>(
  (props, forwardedRef) => {
    const { children, onClick, style, ...restProps } = props;

    const context = useDrawerContext();
    const { isOpen, overlayRef, close, dismissible } = context;

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(event);
      if (dismissible) {
        close();
      }
    };

    const mergedRef = mergeRefs(overlayRef, forwardedRef);

    return (
      <div
        ref={mergedRef}
        data-state={isOpen ? 'open' : 'closed'}
        onClick={handleClick}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          ...style,
        }}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

DrawerOverlay.displayName = 'DrawerOverlay';
