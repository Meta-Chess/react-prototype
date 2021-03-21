import { formatMillis } from "utilities";
import { IntervalMillis, TimestampMillis } from "game";

const DEFAULT_VALID_PERIOD = 1000;

export class Timer {
  private startTimes: TimestampMillis[] = [];
  private stopTimes: TimestampMillis[] = [];
  private allowanceRemaining: IntervalMillis; // Just memoized for faster updates while timer is running
  private frozen = false;

  constructor(private initialAllowance: IntervalMillis) {
    this.allowanceRemaining = initialAllowance;
  }

  start(asOf: TimestampMillis): void {
    if (!this.isRunning() && !this.frozen) {
      this.startTimes.push(asOf);
      this.recalculateAllowanceRemaining();
    }
  }

  stop(asOf: TimestampMillis): void {
    if (this.isRunning()) {
      this.stopTimes.push(asOf);
      this.recalculateAllowanceRemaining();
    }
  }

  freeze(asOf: TimestampMillis): void {
    this.frozen = true;
    this.stop(asOf);
  }

  getFormattedTime(asOf?: TimestampMillis): { time: string; validFor: IntervalMillis } {
    const timeRemaining = this.getTimeRemaining(asOf);

    if (timeRemaining <= 0) return { ...formatMillis(0), validFor: DEFAULT_VALID_PERIOD };

    const { time, validFor } = formatMillis(timeRemaining);
    return {
      time,
      validFor: asOf || !this.isRunning() ? DEFAULT_VALID_PERIOD : validFor,
    };
  }

  getTimeRemaining(asOf?: TimestampMillis): IntervalMillis {
    return asOf
      ? this.calculateAllowanceRemaining(asOf)
      : this.isRunning()
      ? this.allowanceRemaining -
        (Date.now() - this.startTimes[this.startTimes.length - 1])
      : this.allowanceRemaining;
  }

  isRunning(asOf?: TimestampMillis): boolean {
    if (!asOf) return this.startTimes.length > this.stopTimes.length;
    for (let i = 0; i < this.startTimes.length; i++) {
      if (asOf < this.startTimes[i]) return false;
      if (!this.stopTimes[i] || asOf < this.stopTimes[i]) return true;
    }
    return false;
  }

  private recalculateAllowanceRemaining(): void {
    this.allowanceRemaining = this.calculateAllowanceRemaining();
  }

  private calculateAllowanceRemaining(asOf?: TimestampMillis): IntervalMillis {
    const startTimes = asOf ? this.startTimes.filter((t) => t < asOf) : this.startTimes;
    const stopTimes = asOf ? this.stopTimes.filter((t) => t < asOf) : this.stopTimes;
    let allowance = this.initialAllowance;
    for (let i = 0; i < stopTimes.length; i++) {
      allowance -= stopTimes[i] - startTimes[i];
    }
    if (asOf && startTimes.length > stopTimes.length) {
      return allowance - (asOf - startTimes[startTimes.length - 1]);
    }
    return allowance;
  }
}
