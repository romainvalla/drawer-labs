import React from 'react';
import { useDrawerContext } from '../context';

export interface DrawerTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

export const DrawerTrigger = React.forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  (props, forwardedRef) => {
    const { children, onClick, asChild = false, ...restProps } = props;

    const context = useDrawerContext();
    const { open } = context;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      open();
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...restProps,
        onClick: handleClick,
        ref: forwardedRef,
      } as React.HTMLAttributes<HTMLElement>);
    }

    return (
      <button ref={forwardedRef} onClick={handleClick} {...restProps}>
        {children}
      </button>
    );
  }
);

DrawerTrigger.displayName = 'DrawerTrigger';
