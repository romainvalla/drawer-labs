import { useEffect } from 'react';

const FOCUSABLE_ELEMENTS =
  'a[href], button, textarea, input, select, details, [tabindex]:not([tabindex="-1"])';

export function useFocusTrap<T extends HTMLElement>(
  ref: React.RefObject<T>,
  isActive: boolean
): void {
  useEffect(() => {
    if (!isActive || !ref.current) return;

    const element = ref.current;
    const focusableElements = element.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS);
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    // Store previously focused element
    const previouslyFocused = document.activeElement as HTMLElement;

    // Focus first element
    firstFocusable?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);

    return () => {
      element.removeEventListener('keydown', handleKeyDown);
      // Restore focus to previously focused element
      previouslyFocused?.focus();
    };
  }, [ref, isActive]);
}
