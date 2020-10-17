import { IdGenerator } from "utilities/IdGenerator";

describe("IdGenerator", () => {
  it("should generate 1 as its first id", () => {
    const generator = new IdGenerator();
    expect(generator.getId()).toEqual(1);
  });

  it("should generate 3 as its third id", () => {
    const generator = new IdGenerator();
    generator.getId();
    generator.getId();
    expect(generator.getId()).toEqual(3);
  });
});
