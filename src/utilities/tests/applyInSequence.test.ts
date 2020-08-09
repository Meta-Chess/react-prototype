import { applyInSequence } from "utilities/applyInSequence";

describe("applyInSequence", () => {
  it("should successfully apply no functions to the given input when asked", () => {
    expect(applyInSequence([], 5)).toEqual(5);
  });

  it("should successfully apply one function to the given input when asked", () => {
    expect(applyInSequence([(x): number => x + 1], 5)).toEqual(6);
  });

  it("should successfully apply multiple functions to the given input when asked", () => {
    expect(
      applyInSequence(
        [
          (x): number => x + 1,
          (x): number => x - 1,
          (x): number => x + 2,
          (x): number => x + 1,
        ],
        5
      )
    ).toEqual(8);
  });

  it("should work on objects", () => {
    const result = applyInSequence(
      [
        (x): { something: string; anotherThing: number } => ({
          something: x.something + "o",
          anotherThing: x.anotherThing * 2,
        }),
        (x): { something: string; anotherThing: number } => ({
          something: x.something + "o",
          anotherThing: x.anotherThing * 2,
        }),
        (x): { something: string; anotherThing: number } => ({
          something: x.something + "o",
          anotherThing: x.anotherThing * 2,
        }),
      ],
      { something: "hello", anotherThing: 7 }
    );
    const expected = { something: "helloooo", anotherThing: 56 };

    expect(result).toEqual(expected);
  });

  it("should ignore undefined and null values in functions", () => {
    expect(
      applyInSequence([(x): number => x + 1, undefined, null, (x): number => x + 1], 5)
    ).toEqual(7);
  });
});
