export interface SpringConfig {
  stiffness: number;
  damping: number;
  mass: number;
  precision: number;
}

export const SPRING_PRESETS = {
  gentle: { stiffness: 120, damping: 14, mass: 1, precision: 0.01 },
  wobbly: { stiffness: 180, damping: 12, mass: 1, precision: 0.01 },
  stiff: { stiffness: 210, damping: 20, mass: 1, precision: 0.01 },
  slow: { stiffness: 280, damping: 60, mass: 1, precision: 0.01 },
  molasses: { stiffness: 280, damping: 120, mass: 1, precision: 0.01 },
} as const;

export class SpringAnimation {
  private currentValue: number;
  private currentVelocity: number;
  private targetValue: number;
  private config: SpringConfig;
  private rafId: number | null = null;
  private lastTime = 0;
  private isAnimating = false;

  constructor(initialValue = 0, config: SpringConfig = SPRING_PRESETS.gentle) {
    this.currentValue = initialValue;
    this.currentVelocity = 0;
    this.targetValue = initialValue;
    this.config = config;
  }

  setTarget(target: number, velocity = 0): void {
    this.targetValue = target;
    this.currentVelocity = velocity;

    if (!this.isAnimating) {
      this.start();
    }
  }

  private start(): void {
    this.isAnimating = true;
    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame(this.tick);
  }

  private tick = (currentTime: number): void => {
    const deltaTime = Math.min(currentTime - this.lastTime, 64) / 1000; // Max 64ms
    this.lastTime = currentTime;

    // Spring physics calculation
    const { stiffness, damping, mass, precision } = this.config;

    const springForce = -stiffness * (this.currentValue - this.targetValue);
    const dampingForce = -damping * this.currentVelocity;
    const acceleration = (springForce + dampingForce) / mass;

    this.currentVelocity += acceleration * deltaTime;
    this.currentValue += this.currentVelocity * deltaTime;

    // Check if animation should stop
    const isAtTarget = Math.abs(this.currentValue - this.targetValue) < precision;
    const isStill = Math.abs(this.currentVelocity) < precision;

    if (isAtTarget && isStill) {
      this.currentValue = this.targetValue;
      this.currentVelocity = 0;
      this.isAnimating = false;
      this.onComplete?.();
      return;
    }

    this.onUpdate?.(this.currentValue, this.currentVelocity);
    this.rafId = requestAnimationFrame(this.tick);
  };

  stop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.isAnimating = false;
  }

  getValue(): number {
    return this.currentValue;
  }

  getVelocity(): number {
    return this.currentVelocity;
  }

  setConfig(config: Partial<SpringConfig>): void {
    this.config = { ...this.config, ...config };
  }

  onUpdate?: (value: number, velocity: number) => void;
  onComplete?: () => void;
}
