import React from 'react';

export interface DrawerHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const DrawerHandle = React.forwardRef<HTMLDivElement, DrawerHandleProps>(
  (props, forwardedRef) => {
    const { children, style, ...restProps } = props;

    return (
      <div
        ref={forwardedRef}
        data-drawer-handle
        style={{
          cursor: 'grab',
          touchAction: 'none',
          ...style,
        }}
        {...restProps}
      >
        {children || (
          <div
            style={{
              width: '48px',
              height: '4px',
              borderRadius: '2px',
              backgroundColor: 'currentColor',
              opacity: 0.4,
              margin: '8px auto',
            }}
          />
        )}
      </div>
    );
  }
);

DrawerHandle.displayName = 'DrawerHandle';
