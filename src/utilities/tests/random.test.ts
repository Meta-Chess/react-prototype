import { randomChoice } from "../random";

describe("randomChoice", () => {
  it("should do 50/50 choices well", () => {
    const array = [0, 1];
    let count = 0;
    for (let i = 0; i < 100; i++) {
      count += randomChoice(array);
    }
    expect(count).toBeLessThan(65);
    expect(count).toBeGreaterThan(35);
  });
});
