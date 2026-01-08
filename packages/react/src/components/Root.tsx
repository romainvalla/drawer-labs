import type React from 'react';
import { useMemo } from 'react';
import { DrawerProvider } from '../context';
import { type UseDrawerStateOptions, useDrawerState } from '../hooks/use-drawer-state';

export interface DrawerRootProps extends UseDrawerStateOptions {
  children: React.ReactNode;
  nested?: boolean;
}

export function DrawerRoot(props: DrawerRootProps) {
  const { children, nested = false, ...stateOptions } = props;

  const state = useDrawerState(stateOptions);

  const contextValue = useMemo(
    () => ({
      ...state,
      nested,
    }),
    [state, nested]
  );

  return <DrawerProvider value={contextValue}>{children}</DrawerProvider>;
}

DrawerRoot.displayName = 'DrawerRoot';
