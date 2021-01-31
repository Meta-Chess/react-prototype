import { getKeys, getValues } from "../enum";

enum TestEnum {
  Foo,
  Bar,
  Baz,
}

describe("get keys", () => {
  it("should return the keys of an enum", () => {
    expect(getKeys(TestEnum)).toEqual(["Foo", "Bar", "Baz"]);
  });
});

describe("get values", () => {
  it("should return the values of an enum", () => {
    expect(getValues(TestEnum)).toEqual([0, 1, 2]);
  });
});
