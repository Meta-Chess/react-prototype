import { deduplicateByName } from "../deduplicateByName";

describe("deduplicateByName", () => {
  it("should remove one of each rule with the same name", () => {
    expect(
      deduplicateByName([
        { name: "alice" },
        { name: "bob" },
        { name: "alice", value: 2 },
        { name: "anne" },
      ])
    ).toEqual([{ name: "alice" }, { name: "bob" }, { name: "anne" }]);
  });
});
