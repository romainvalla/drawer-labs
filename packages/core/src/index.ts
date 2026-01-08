/**
 * @drawer-labs/core
 * Framework-agnostic drawer component core
 */

// Version
export const version = '0.1.0';

// Gesture System
export { PointerTracker } from './gestures/pointer-tracker';
export type { PointerEvent, GestureState } from './gestures/pointer-tracker';

// Animation System
export { SpringAnimation, SPRING_PRESETS } from './animation/spring-physics';
export type { SpringConfig } from './animation/spring-physics';

// Snap Points System
export { SnapPointCalculator } from './snap-points/snap-calculator';
export type {
  SnapPoint,
  SnapPointResolved,
  SnapConfig,
} from './snap-points/snap-calculator';
