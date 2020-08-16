import { objectMatches } from "../objectMatches";

describe("objectMatches", () => {
  it("should return true if the object contains the correct values", () => {
    const pattern = {
      a: 1,
      b: "hello",
    };
    const testObject = {
      a: 1,
      b: "hello",
      c: "what?",
    };
    expect(objectMatches(pattern)(testObject)).toBe(true);
  });

  it("should return false if the object is missing a key", () => {
    const pattern = {
      a: 1,
      b: "hello",
    };
    const testObject = {
      a: 1,
      c: "what?",
    };
    expect(objectMatches(pattern)(testObject)).toBe(false);
  });

  it("should return false if the object has a different value for a key", () => {
    const pattern = {
      a: 1,
      b: "hello",
    };
    const testObject = {
      a: 1,
      b: "hi",
      c: "what?",
    };
    expect(objectMatches(pattern)(testObject)).toBe(false);
  });
});
