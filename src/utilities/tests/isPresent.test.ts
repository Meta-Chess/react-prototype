import { isPresent } from "../isPresent";

describe("isPresent", () => {
  it("should return false for null", () => {
    expect(isPresent(null)).toBe(false);
  });

  it("should return false for undefined", () => {
    expect(isPresent(undefined)).toBe(false);
  });

  it("should return true for things that are not null or undefined", () => {
    expect(isPresent(5)).toBe(true);
    expect(isPresent("hello")).toBe(true);
    expect(isPresent({ apple: 5, banana: "hello" })).toBe(true);
  });
});
