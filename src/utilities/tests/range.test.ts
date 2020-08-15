import { range } from "../range";

describe("range", () => {
  it("should return a one-element list when start = end", () => {
    expect(range(4, 4)).toEqual([4]);
  });

  it("should return the integers from start up to end", () => {
    expect(range(4, 11)).toEqual([4, 5, 6, 7, 8, 9, 10, 11]);
  });

  it("should work with negative numbers", () => {
    expect(range(-4, 3)).toEqual([-4, -3, -2, -1, 0, 1, 2, 3]);
    expect(range(-6, -3)).toEqual([-6, -5, -4, -3]);
  });

  it("should return an empty list if there are no numbers in the range", () => {
    expect(range(6, 5)).toEqual([]);
    expect(range(6, 3)).toEqual([]);
  });
});
