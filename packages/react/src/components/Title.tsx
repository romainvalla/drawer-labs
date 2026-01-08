import React from 'react';

export interface DrawerTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const DrawerTitle = React.forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  (props, forwardedRef) => {
    const { children, ...restProps } = props;

    return (
      <h2 ref={forwardedRef} {...restProps}>
        {children}
      </h2>
    );
  }
);

DrawerTitle.displayName = 'DrawerTitle';
