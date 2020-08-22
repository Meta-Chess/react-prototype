import { range } from "../range";

describe("range", () => {
  it("should return a one-element list if number = 1", () => {
    expect(range(4, 1)).toEqual([4]);
  });

  it("should return the correct number of numbers", () => {
    expect(range(4, 8)).toEqual([4, 5, 6, 7, 8, 9, 10, 11]);
  });

  it("should work with negative numbers", () => {
    expect(range(-4, 8)).toEqual([-4, -3, -2, -1, 0, 1, 2, 3]);
    expect(range(-6, 4)).toEqual([-6, -5, -4, -3]);
  });

  it("should use the given range", () => {
    expect(range(-4, 3, 2)).toEqual([-4, -2, 0]);
    expect(range(-6, 4, 1.5)).toEqual([-6, -4.5, -3, -1.5]);
  });

  it("should return an empty list if asked for a negative number of numbers", () => {
    expect(range(6, -5)).toEqual([]);
  });
});
