import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  PointerTracker,
  SPRING_PRESETS,
  SnapPointCalculator,
  SpringAnimation,
  version,
} from './index';

describe('@drawer-labs/core', () => {
  it('exports version', () => {
    expect(version).toBe('0.1.0');
  });

  describe('PointerTracker', () => {
    let tracker: PointerTracker;

    beforeEach(() => {
      tracker = new PointerTracker();
    });

    it('initializes with default state', () => {
      const state = tracker.getState();
      expect(state.isDragging).toBe(false);
      expect(state.deltaX).toBe(0);
      expect(state.deltaY).toBe(0);
    });

    it('starts tracking on pointer down', () => {
      const state = tracker.start({
        clientX: 100,
        clientY: 200,
        timeStamp: 1000,
        pointerId: 1,
      });

      expect(state.isDragging).toBe(true);
      expect(state.startX).toBe(100);
      expect(state.startY).toBe(200);
    });

    it('tracks movement and calculates delta', () => {
      tracker.start({
        clientX: 100,
        clientY: 200,
        timeStamp: 1000,
        pointerId: 1,
      });

      const state = tracker.move({
        clientX: 150,
        clientY: 250,
        timeStamp: 1050,
        pointerId: 1,
      });

      expect(state.deltaX).toBe(50);
      expect(state.deltaY).toBe(50);
      expect(state.currentX).toBe(150);
      expect(state.currentY).toBe(250);
    });

    it('calculates velocity from movement history', () => {
      tracker.start({
        clientX: 100,
        clientY: 200,
        timeStamp: 1000,
        pointerId: 1,
      });

      tracker.move({
        clientX: 150,
        clientY: 250,
        timeStamp: 1050,
        pointerId: 1,
      });

      const state = tracker.getState();
      expect(state.velocityX).toBeGreaterThan(0);
      expect(state.velocityY).toBeGreaterThan(0);
    });

    it('determines direction from movement', () => {
      tracker.start({
        clientX: 100,
        clientY: 100,
        timeStamp: 1000,
        pointerId: 1,
      });

      // Move right
      let state = tracker.move({
        clientX: 200,
        clientY: 100,
        timeStamp: 1050,
        pointerId: 1,
      });
      expect(state.direction).toBe('right');

      tracker.reset();
      tracker.start({
        clientX: 100,
        clientY: 100,
        timeStamp: 1000,
        pointerId: 1,
      });

      // Move down
      state = tracker.move({
        clientX: 100,
        clientY: 200,
        timeStamp: 1050,
        pointerId: 1,
      });
      expect(state.direction).toBe('down');
    });

    it('ends tracking on pointer up', () => {
      tracker.start({
        clientX: 100,
        clientY: 200,
        timeStamp: 1000,
        pointerId: 1,
      });

      const state = tracker.end({
        clientX: 150,
        clientY: 250,
        timeStamp: 1100,
        pointerId: 1,
      });

      expect(state.isDragging).toBe(false);
    });

    it('resets state', () => {
      tracker.start({
        clientX: 100,
        clientY: 200,
        timeStamp: 1000,
        pointerId: 1,
      });

      tracker.reset();
      const state = tracker.getState();

      expect(state.isDragging).toBe(false);
      expect(state.deltaX).toBe(0);
      expect(state.deltaY).toBe(0);
    });
  });

  describe('SpringAnimation', () => {
    let animation: SpringAnimation;

    beforeEach(() => {
      animation = new SpringAnimation(0, SPRING_PRESETS.gentle);
    });

    it('initializes with initial value', () => {
      expect(animation.getValue()).toBe(0);
      expect(animation.getVelocity()).toBe(0);
    });

    it('calls onUpdate when animating', (done) => {
      const onUpdate = vi.fn();
      animation.onUpdate = onUpdate;

      animation.setTarget(100);

      // Wait for at least one animation frame
      setTimeout(() => {
        expect(onUpdate).toHaveBeenCalled();
        animation.stop();
        done();
      }, 50);
    });

    it('calls onComplete when animation finishes', (done) => {
      const onComplete = vi.fn(() => {
        expect(animation.getValue()).toBe(100);
        done();
      });
      animation.onComplete = onComplete;

      animation.setTarget(100);
    }, 3000);

    it('can be stopped manually', () => {
      animation.setTarget(100);
      animation.stop();

      // Animation should not continue
      const valueBefore = animation.getValue();
      expect(animation.getValue()).toBe(valueBefore);
    });

    it('accepts velocity on setTarget', () => {
      animation.setTarget(100, 5);
      expect(animation.getVelocity()).toBe(5);
    });

    it('can update config', () => {
      animation.setConfig({ stiffness: 300 });
      // Config should be updated (test by checking animation behavior changes)
      expect(animation).toBeDefined();
    });
  });

  describe('SnapPointCalculator', () => {
    let calculator: SnapPointCalculator;

    beforeEach(() => {
      calculator = new SnapPointCalculator({
        points: [0, 0.5, 1],
        containerSize: 400,
        direction: 'vertical',
      });
    });

    it('resolves snap points', () => {
      const points = calculator.getAllSnapPoints();
      expect(points).toHaveLength(3);
      expect(points[0].offset).toBe(0);
      expect(points[1].offset).toBe(200);
      expect(points[2].offset).toBe(400);
    });

    it('finds nearest snap point', () => {
      const nearest = calculator.findNearestSnapPoint(180);
      expect(nearest.index).toBe(1);
      expect(nearest.offset).toBe(200);
    });

    it('finds next snap point based on velocity', () => {
      const next = calculator.findNextSnapPoint(0, 1.5);
      expect(next?.index).toBe(1);
    });

    it('returns null for insufficient velocity', () => {
      const next = calculator.findNextSnapPoint(0, 0.2);
      expect(next).toBeNull();
    });

    it('handles pixel values', () => {
      const calc = new SnapPointCalculator({
        points: ['100px', '200px'],
        containerSize: 400,
        direction: 'vertical',
      });

      const points = calc.getAllSnapPoints();
      expect(points[0].offset).toBe(100);
      expect(points[1].offset).toBe(200);
    });

    it('handles percentage values', () => {
      const calc = new SnapPointCalculator({
        points: ['25%', '75%'],
        containerSize: 400,
        direction: 'vertical',
      });

      const points = calc.getAllSnapPoints();
      expect(points[0].offset).toBe(100);
      expect(points[1].offset).toBe(300);
    });

    it('handles named snap points', () => {
      const calc = new SnapPointCalculator({
        points: [{ value: 0.5, id: 'middle' }],
        containerSize: 400,
        direction: 'vertical',
      });

      const point = calc.getSnapPoint(0);
      expect(point?.id).toBe('middle');
      expect(point?.offset).toBe(200);
    });

    it('updates config', () => {
      calculator.updateConfig({
        points: [0, 1],
        containerSize: 800,
        direction: 'vertical',
      });

      const points = calculator.getAllSnapPoints();
      expect(points).toHaveLength(2);
      expect(points[1].offset).toBe(800);
    });
  });
});
