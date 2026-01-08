import React from 'react';
import { useDrawerContext } from '../context';

export interface DrawerCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

export const DrawerClose = React.forwardRef<HTMLButtonElement, DrawerCloseProps>(
  (props, forwardedRef) => {
    const { children, onClick, asChild = false, ...restProps } = props;

    const context = useDrawerContext();
    const { close } = context;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      close();
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

DrawerClose.displayName = 'DrawerClose';
