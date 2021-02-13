import { shuffleInPlace } from "../random";
import { range } from "utilities";

describe("shuffleInPlace", () => {
  it.each`
    array
    ${[]}
    ${[1]}
    ${[1, 2]}
    ${[1, 2, 3, 4, 5, 6, 7, 8]}
  `("should preserve length", ({ array }) => {
    const originalLength = array.length;
    const shuffledLength = shuffleInPlace(array).length;
    expect(shuffledLength).toEqual(originalLength);
  });

  it.each`
    array
    ${[]}
    ${[1]}
    ${["a"]}
    ${[{ a: 1, b: { c: "elephant", d: "giraffe" } }]}
  `("should leave length 0 and length 1", ({ array }) => {
    const originalArray = [...array];
    expect(shuffleInPlace(array)).toEqual(originalArray);
  });

  it.each`
    array
    ${[{ a: 1, b: { c: "elephant", d: "giraffe" } }]}
    ${["a", "b"]}
    ${[1, 2, 3, 4, 5, 6, 7, 8]}
  `("should not lose any elements", ({ array }) => {
    const originalArray = [...array];
    expect(shuffleInPlace(array)).toEqual(expect.arrayContaining(originalArray));
  });

  it("should not be the same after shuffling", () => {
    const array = range(0, 52);
    const copy = [...array];
    const shuffled = shuffleInPlace(array);
    expect(shuffled.some((element, index) => element !== copy[index])).toEqual(true);
  });

  it("should operate on the original array", () => {
    const array = range(0, 52);
    const copy = [...array];
    shuffleInPlace(array);
    expect(array.some((element, index) => element !== copy[index])).toEqual(true);
  });
});
