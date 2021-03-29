import { clone } from "lodash";

export class AnimationDelayQueue {
  constructor(public currentQueue: number[] = []) {}

  getDelayAtPosition(position: number): number {
    const priorityAnimations = this.currentQueue.slice(0, position);
    return priorityAnimations.length === 0
      ? 0
      : priorityAnimations.reduce((delay1, delay2) => delay1 + delay2);
  }

  addToQueue(animationLength: number): number {
    this.currentQueue.push(animationLength);
    const positionInQueue = this.currentQueue.length - 1;
    return positionInQueue;
  }

  clear(): void {
    this.currentQueue = [];
  }

  clone(): AnimationDelayQueue {
    return new AnimationDelayQueue(clone(this.currentQueue));
  }
}
