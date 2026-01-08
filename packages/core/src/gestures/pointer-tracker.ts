export interface PointerEvent {
  clientX: number;
  clientY: number;
  timeStamp: number;
  pointerId: number;
}

export interface GestureState {
  isDragging: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  deltaX: number;
  deltaY: number;
  velocityX: number;
  velocityY: number;
  direction: 'up' | 'down' | 'left' | 'right' | null;
  timestamp: number;
}

export class PointerTracker {
  private state: GestureState;
  private history: Array<{ x: number; y: number; time: number }> = [];
  private readonly maxHistoryLength = 5;

  constructor() {
    this.state = this.getInitialState();
  }

  private getInitialState(): GestureState {
    return {
      isDragging: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      deltaX: 0,
      deltaY: 0,
      velocityX: 0,
      velocityY: 0,
      direction: null,
      timestamp: 0,
    };
  }

  start(event: PointerEvent): GestureState {
    this.state = {
      ...this.getInitialState(),
      isDragging: true,
      startX: event.clientX,
      startY: event.clientY,
      currentX: event.clientX,
      currentY: event.clientY,
      timestamp: event.timeStamp,
    };

    this.history = [{ x: event.clientX, y: event.clientY, time: event.timeStamp }];

    return this.state;
  }

  move(event: PointerEvent): GestureState {
    if (!this.state.isDragging) return this.state;

    const deltaX = event.clientX - this.state.startX;
    const deltaY = event.clientY - this.state.startY;

    // Update history for velocity calculation
    this.history.push({
      x: event.clientX,
      y: event.clientY,
      time: event.timeStamp,
    });

    if (this.history.length > this.maxHistoryLength) {
      this.history.shift();
    }

    // Calculate velocity from history
    const { velocityX, velocityY } = this.calculateVelocity();

    // Determine primary direction
    const direction = this.getDirection(deltaX, deltaY);

    this.state = {
      ...this.state,
      currentX: event.clientX,
      currentY: event.clientY,
      deltaX,
      deltaY,
      velocityX,
      velocityY,
      direction,
      timestamp: event.timeStamp,
    };

    return this.state;
  }

  end(event: PointerEvent): GestureState {
    const finalState = this.move(event);
    this.state = { ...finalState, isDragging: false };
    return this.state;
  }

  private calculateVelocity(): { velocityX: number; velocityY: number } {
    if (this.history.length < 2) {
      return { velocityX: 0, velocityY: 0 };
    }

    const latest = this.history[this.history.length - 1];
    const oldest = this.history[0];

    // TypeScript guard - we know these exist due to length check
    if (!latest || !oldest) {
      return { velocityX: 0, velocityY: 0 };
    }

    const timeDelta = latest.time - oldest.time;

    if (timeDelta === 0) {
      return { velocityX: 0, velocityY: 0 };
    }

    const velocityX = (latest.x - oldest.x) / timeDelta;
    const velocityY = (latest.y - oldest.y) / timeDelta;

    return { velocityX, velocityY };
  }

  private getDirection(deltaX: number, deltaY: number): 'up' | 'down' | 'left' | 'right' | null {
    const threshold = 5; // Minimum movement to determine direction

    if (Math.abs(deltaX) < threshold && Math.abs(deltaY) < threshold) {
      return null;
    }

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return deltaX > 0 ? 'right' : 'left';
    }
    return deltaY > 0 ? 'down' : 'up';
  }

  reset(): void {
    this.state = this.getInitialState();
    this.history = [];
  }

  getState(): GestureState {
    return { ...this.state };
  }
}
