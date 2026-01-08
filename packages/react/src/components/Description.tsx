import React from 'react';

export interface DrawerDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const DrawerDescription = React.forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
  (props, forwardedRef) => {
    const { children, ...restProps } = props;

    return (
      <p ref={forwardedRef} {...restProps}>
        {children}
      </p>
    );
  }
);

DrawerDescription.displayName = 'DrawerDescription';
