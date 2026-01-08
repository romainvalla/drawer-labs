export type SnapPoint = number | string | { value: number | string; id: string };

export interface SnapPointResolved {
  id: string;
  offset: number;
  relative: boolean;
}

export interface SnapConfig {
  points: SnapPoint[];
  containerSize: number;
  direction: 'horizontal' | 'vertical';
  activeIndex: number;
}

export class SnapPointCalculator {
  private resolvedPoints: SnapPointResolved[] = [];
  private containerSize = 0;

  constructor(config: Omit<SnapConfig, 'activeIndex'>) {
    this.updateConfig(config);
  }

  updateConfig(config: Omit<SnapConfig, 'activeIndex'>): void {
    this.containerSize = config.containerSize;
    this.resolvedPoints = this.resolveSnapPoints(config.points);
  }

  private resolveSnapPoints(points: SnapPoint[]): SnapPointResolved[] {
    return points.map((point, index) => {
      if (typeof point === 'object' && 'value' in point) {
        return {
          id: point.id,
          offset: this.parseSnapValue(point.value),
          relative: typeof point.value === 'number',
        };
      }

      return {
        id: `snap-${index}`,
        offset: this.parseSnapValue(point),
        relative: typeof point === 'number',
      };
    });
  }

  private parseSnapValue(value: number | string): number {
    if (typeof value === 'number') {
      // Relative value (0-1 range represents percentage)
      return value * this.containerSize;
    }

    // Parse pixel values
    if (value.endsWith('px')) {
      return Number.parseFloat(value);
    }

    // Parse percentage values
    if (value.endsWith('%')) {
      return (Number.parseFloat(value) / 100) * this.containerSize;
    }

    // Parse viewport units
    if (value.endsWith('vh')) {
      return (Number.parseFloat(value) / 100) * window.innerHeight;
    }

    if (value.endsWith('vw')) {
      return (Number.parseFloat(value) / 100) * window.innerWidth;
    }

    return Number.parseFloat(value);
  }

  findNearestSnapPoint(currentOffset: number): {
    index: number;
    offset: number;
    id: string;
  } {
    let minDistance = Number.POSITIVE_INFINITY;
    let nearestIndex = 0;

    this.resolvedPoints.forEach((point, index) => {
      const distance = Math.abs(point.offset - currentOffset);
      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = index;
      }
    });

    const nearest = this.resolvedPoints[nearestIndex];
    // TypeScript guard - fallback if no points exist
    if (!nearest) {
      return { index: 0, offset: 0, id: 'snap-0' };
    }

    return {
      index: nearestIndex,
      offset: nearest.offset,
      id: nearest.id,
    };
  }

  findNextSnapPoint(
    currentIndex: number,
    velocity: number,
    velocityThreshold = 0.5
  ): { index: number; offset: number; id: string } | null {
    const isMovingForward = velocity > 0;
    const hasSignificantVelocity = Math.abs(velocity) > velocityThreshold;

    if (!hasSignificantVelocity) {
      return null;
    }

    const nextIndex = isMovingForward
      ? Math.min(currentIndex + 1, this.resolvedPoints.length - 1)
      : Math.max(currentIndex - 1, 0);

    if (nextIndex === currentIndex) {
      return null;
    }

    const next = this.resolvedPoints[nextIndex];
    // TypeScript guard
    if (!next) {
      return null;
    }

    return {
      index: nextIndex,
      offset: next.offset,
      id: next.id,
    };
  }

  getSnapPoint(index: number): SnapPointResolved | null {
    return this.resolvedPoints[index] ?? null;
  }

  getAllSnapPoints(): SnapPointResolved[] {
    return [...this.resolvedPoints];
  }

  getSnapPointCount(): number {
    return this.resolvedPoints.length;
  }
}
