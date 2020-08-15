import { range2 } from "../range2";

describe("range2", () => {
  it("should return an array of arrays of x-y-pairs", () => {
    expect(range2(4, 5, 1, 3)).toEqual([
      [
        { x: 4, y: 1 },
        { x: 4, y: 2 },
        { x: 4, y: 3 },
      ],
      [
        { x: 5, y: 1 },
        { x: 5, y: 2 },
        { x: 5, y: 3 },
      ],
    ]);
  });

  it("should return an empty list if there are no numbers in the range", () => {
    expect(range2(6, 5, 4, 5)).toEqual([]);
    expect(range2(6, 8, 4, 3)).toEqual([]);
  });
});
