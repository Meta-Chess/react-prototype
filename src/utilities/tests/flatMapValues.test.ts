import { flatMapValues, concatenateValues } from "../flatMapValues";

describe("flatMapValues", () => {
  it("should return an object with concatenated lists as its values", () => {
    const result = flatMapValues([1, 2, 3], () => ({
      hi: ["a", "b"],
      bye: [6, 5, 4],
    }));
    const expected = {
      hi: ["a", "b", "a", "b", "a", "b"],
      bye: [6, 5, 4, 6, 5, 4, 6, 5, 4],
    };
    expect(result).toEqual(expected);
  });
});

describe("concatenateValues", () => {
  it("should concatenate the lists that are the values on the keys of the passed objects", () => {
    const result = concatenateValues(
      {
        hi: ["a", "bc"],
        bye: [6, 5, 4],
      },
      {
        hi: ["de", "f"],
        bye: [3, 2, 0],
      }
    );
    const expected = {
      hi: ["a", "bc", "de", "f"],
      bye: [6, 5, 4, 3, 2, 0],
    };
    expect(result).toEqual(expected);
  });
});
