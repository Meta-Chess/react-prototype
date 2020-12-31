import moment, { Moment } from "moment";
import { formatMillis } from "utilities";

export class Timer {
  private timer: number[];
  private startTime: Moment;
  private stopTime: Moment;
  private running = false;
  private frozen = false;

  constructor(allowance: number) {
    this.timer = [allowance];
    this.startTime = moment();
    this.stopTime = moment();
  }

  stop(): void {
    if (this.running) {
      this.stopTime = moment();
      const interval = this.stopTime.diff(this.startTime);
      const allowance = this.timer[this.timer.length - 1];
      this.timer.push(allowance - interval);
      this.running = false;
    }
  }

  start(): void {
    if (!this.running && !this.frozen) {
      this.startTime = moment();
      this.running = true;
    }
  }

  freeze(): void {
    this.stop();
    this.frozen = true;
  }

  isRunning(): boolean {
    return this.running;
  }

  // Returns number of milliseconds remaining
  getAllowance(): number {
    return this.timer[this.timer.length - 1];
  }

  getStartTime(): Moment {
    return this.startTime;
  }

  getStopTime(): Moment {
    return this.stopTime;
  }

  setAllowance(adjustedTime: number): void {
    this.timer[this.timer.length - 1] = adjustedTime;
  }

  getTimeRemaining(): number {
    return this.running
      ? this.getAllowance() - moment().diff(this.getStartTime())
      : this.getAllowance();
  }

  getFormattedTime(): { time: string; validFor: number } {
    const timeRemaining = this.getTimeRemaining();

    if (timeRemaining <= 0)
      return { ...formatMillis(0), validFor: Number.POSITIVE_INFINITY };

    const { time, validFor } = formatMillis(timeRemaining);

    return {
      time,
      validFor: this.running ? validFor : Number.POSITIVE_INFINITY,
    };
  }
}
