import moment, { Moment } from "moment";

export class Timer {
  private timer: number[];
  private startTime: Moment | undefined;
  private stopTime: Moment | undefined;
  private running: boolean = false;

  constructor(allowance: number) {
    this.timer = [allowance];
  }

  pause() {
    this.stopTime = moment();
    var interval = this.stopTime.diff(this.startTime);
    var allowance = this.timer[this.timer.length - 1];
    this.timer.push(allowance - interval);
    this.running = false;
  }

  play() {
    this.startTime = moment();
    this.running = true;
  }

  getAllowance() {
    return this.timer[this.timer.length - 1];
  }

  getStartTime() {
    if (this.running === false) return null;
    return this.startTime;
  }

  getStopTime() {
    if (this.running === true) return null;
    return this.stopTime;
  }

  setAllowance(adjustedTime: number) {
    this.timer[this.timer.length - 1] = adjustedTime;
  }

  getClock() {
    return { timeRemaining: this.getAllowance(), atTime: this.getStartTime() };
  }
}
