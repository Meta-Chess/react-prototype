import { Timer } from "./Timer";

describe("Timer", () => {
  it("should give the correct time remaining when never started", () => {
    const timer = new Timer(1000);
    expect(timer.getTimeRemaining(500)).toEqual(1000);
    expect(timer.getTimeRemaining(10000)).toEqual(1000);
  });

  it("should give the correct time remaining while running", () => {
    const timer = new Timer(1000);
    timer.start(100);
    expect(timer.getTimeRemaining(500)).toEqual(600);
  });

  it("should give the correct time remaining while stopped", () => {
    const timer = new Timer(1000);
    timer.start(100);
    timer.stop(300);
    expect(timer.getTimeRemaining(500)).toEqual(800);
    expect(timer.getTimeRemaining(10000)).toEqual(800);
  });

  it("should work with a sequence of stops and starts", () => {
    const timer = new Timer(1000);
    timer.start(100);
    timer.stop(300);
    timer.start(10100);
    timer.stop(10500);
    timer.start(20100);
    timer.stop(20102);
    expect(timer.getTimeRemaining(100000)).toEqual(1000 - 200 - 400 - 2);
  });
});
