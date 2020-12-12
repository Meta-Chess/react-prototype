import { titleUppercase } from "../titleUppercase";
import { Rule } from "game";

describe("titleUppercase", () => {
  it("should remove one of each rule with the same name", () => {
    expect(titleUppercase("hello My NAME iS aNgUS")).toEqual("Hello My Name Is Angus");
  });
});
