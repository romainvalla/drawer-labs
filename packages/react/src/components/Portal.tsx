import type React from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface DrawerPortalProps {
  children: React.ReactNode;
  container?: HTMLElement | null;
}

export function DrawerPortal(props: DrawerPortalProps) {
  const { children, container } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const portalContainer = container ?? document.body;
  return createPortal(children, portalContainer);
}

DrawerPortal.displayName = 'DrawerPortal';
