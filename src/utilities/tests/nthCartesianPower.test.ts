import { nthCartesianPower } from "../nthCartesianPower";

describe("nthCartesianPower", () => {
  it("should return all the possible 3-vectors over a 2 element space", () => {
    expect(nthCartesianPower([0, 1], 3)).toEqual([
      [0, 0, 0],
      [0, 0, 1],
      [0, 1, 0],
      [0, 1, 1],
      [1, 0, 0],
      [1, 0, 1],
      [1, 1, 0],
      [1, 1, 1],
    ]);
  });

  it("should return all the possible 2-vectors over a 3 element space", () => {
    expect(nthCartesianPower([0, 1, 2], 2)).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 0],
      [2, 1],
      [2, 2],
    ]);
  });

  it("should return the only possible 0-vector", () => {
    expect(nthCartesianPower([0, 1, 2, 3, 4, 5], 0)).toEqual([[]]);
  });

  it("should return all possible 1-vectors", () => {
    expect(nthCartesianPower([0, 1, 2, 3, 4, 5], 1)).toEqual([
      [0],
      [1],
      [2],
      [3],
      [4],
      [5],
    ]);
  });
});
