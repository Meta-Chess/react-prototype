import { wrapToCylinder } from "utilities/wrapToCylinder";

describe("wrapToCylinder", () => {
  it("should return a number between start and end", () => {
    expect(wrapToCylinder(3, 9)(12)).toEqual(5);
    expect(wrapToCylinder(1, 5)(3)).toEqual(3);
    expect(wrapToCylinder(1, 5)(6)).toEqual(1);
  });

  it("should handle negative bounds", () => {
    expect(wrapToCylinder(-3, 3)(0)).toEqual(0);
    expect(wrapToCylinder(-3, 3)(7)).toEqual(0);
    expect(wrapToCylinder(-3, 3)(10)).toEqual(3);
    expect(wrapToCylinder(-3, -1)(0)).toEqual(-3);
  });

  it("should throw an error when end > start", () => {
    expect(() => wrapToCylinder(-3, -4)(0)).toThrow();
  });
});
