import { useEffect, useRef } from 'react';

export function useWillChange<T extends HTMLElement>(
  isActive: boolean,
  properties: string[] = ['transform', 'opacity']
): React.RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (isActive) {
      ref.current.style.willChange = properties.join(', ');
    } else {
      // Remove will-change after animation completes
      const timeoutId = setTimeout(() => {
        if (ref.current) {
          ref.current.style.willChange = 'auto';
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [isActive, properties]);

  return ref;
}
