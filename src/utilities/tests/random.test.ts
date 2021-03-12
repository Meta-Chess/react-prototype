import { randomChoice } from "../random";

describe("randomChoice", () => {
  it("should do 50/50 choices well. Whenever this test breaks, we adjust the bounds to be a multiple of five that contains the breaking value. So far it seems a bit skewed towards lower values.", () => {
    const array = [0, 1];
    let count = 0;
    for (let i = 0; i < 100; i++) {
      count += randomChoice(array);
    }
    expect(count).toBeLessThan(65);
    expect(count).toBeGreaterThan(30);
  });
});
