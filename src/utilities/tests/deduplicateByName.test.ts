import { deduplicateByName } from "../deduplicateByName";
import { Rule } from "game";

describe("deduplicateByName", () => {
  it("should remove one of each rule with the same name", () => {
    expect(
      deduplicateByName([
        { name: "alice" },
        { name: "bob" },
        { name: "alice", value: 2 },
        { name: "anne" },
      ] as Rule[])
    ).toEqual([{ name: "alice" }, { name: "bob" }, { name: "anne" }]);
  });
});
