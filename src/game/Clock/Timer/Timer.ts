import { formatMillis } from "utilities";
import { TimestampMillis } from "game";

export class Timer {
  private timer: number[];
  private startTime?: TimestampMillis = undefined;
  private stopTime?: TimestampMillis = undefined;
  private running = false;
  private frozen = false;

  constructor(allowance: number) {
    this.timer = [allowance];
  }

  stop(asOf: TimestampMillis): void {
    if (this.running && this.startTime) {
      this.stopTime = asOf;
      const interval = this.stopTime - this.startTime;
      const allowance = this.timer[this.timer.length - 1];
      this.timer.push(allowance - interval);
      this.running = false;
    }
  }

  start(asOf: TimestampMillis): void {
    if (!this.running && !this.frozen) {
      this.startTime = asOf;
      this.running = true;
    }
  }

  freeze(asOf: TimestampMillis): void {
    this.stop(asOf);
    this.frozen = true;
  }

  isRunning(): boolean {
    return this.running;
  }

  // Returns number of milliseconds remaining
  getAllowance(): number {
    return this.timer[this.timer.length - 1];
  }

  getStopTime(): TimestampMillis | undefined {
    return this.stopTime;
  }

  getStartTime(): TimestampMillis | undefined {
    return this.startTime;
  }

  updateStopTime(updateTo: TimestampMillis): void {
    if (this.stopTime) {
      const adjustment = updateTo - this.stopTime;
      this.stopTime = updateTo;
      this.timer[this.timer.length - 1] -= adjustment;
    }
  }

  updateStartTime(updateTo: TimestampMillis): void {
    if (this.startTime) {
      const adjustment = updateTo - this.startTime;
      this.startTime = updateTo;
      if (!this.isRunning()) this.timer[this.timer.length - 1] += adjustment;
    }
  }

  setAllowance(adjustedTime: number): void {
    this.timer[this.timer.length - 1] = adjustedTime;
  }

  getTimeRemaining(asOf?: TimestampMillis): number {
    asOf = asOf || Date.now();
    return this.running && this.startTime
      ? this.getAllowance() - (asOf - this.startTime)
      : this.getAllowance();
  }

  getFormattedTime(asOf?: TimestampMillis): { time: string; validFor: number } {
    const timeRemaining = this.getTimeRemaining(asOf);

    if (timeRemaining <= 0)
      return { ...formatMillis(0), validFor: Number.POSITIVE_INFINITY };

    const { time, validFor } = formatMillis(timeRemaining);

    return {
      time,
      validFor: this.running ? validFor : Number.POSITIVE_INFINITY,
    };
  }
}
