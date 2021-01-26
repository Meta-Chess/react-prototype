import { englishList } from "../englishList";

describe("englishList", () => {
  it("should return 'Nothing' for empty lists with no verb", () => {
    expect(englishList([])).toEqual("Nothing");
  });

  it("should return 'Nothing [singular]' for empty lists with a verb", () => {
    expect(englishList([], { connector: "and", singular: "does", plural: "do" })).toEqual(
      "Nothing does"
    );
  });

  it("should return 'Item' for a one item list with no verb", () => {
    expect(englishList(["Chess"])).toEqual("Chess");
  });

  it("should return 'Item [singular]' for a one item list with a verb", () => {
    expect(
      englishList(["Chess"], { connector: "and", singular: "has", plural: "have" })
    ).toEqual("Chess has");
  });

  it("should return 'Item [connector] item' for a two item list without a verb", () => {
    expect(englishList(["Chess", "Checkers"])).toEqual("Chess and Checkers");
  });

  it("should return 'Item [connector] item [plural]' for a two item list with a verb", () => {
    expect(
      englishList(["Chess", "Checkers"], {
        singular: "has",
        plural: "have",
      })
    ).toEqual("Chess and Checkers have");
  });

  it("should return 'Item [connector] item' for a two item list without a verb", () => {
    expect(englishList(["Chess", "Checkers", "Go"])).toEqual("Chess, Checkers, and Go");
  });

  it("should return 'Item [connector] item [plural]' for a three item list with a verb", () => {
    expect(
      englishList(["Chess", "Checkers", "Go"], {
        singular: "has",
        plural: "have",
      })
    ).toEqual("Chess, Checkers, and Go have");
  });

  it("should be possible to specify 'or' as a connector", () => {
    expect(englishList(["Chess", "Checkers", "Go"], { connector: "or" })).toEqual(
      "Chess, Checkers, or Go"
    );
  });

  it("should be possible to force the use of plural", () => {
    expect(englishList(["People"], { plural: "have" })).toEqual("People have");
  });

  it("should be possible to force the use of singular", () => {
    expect(
      englishList(["Chess", "Checkers", "Go"], { connector: "or", singular: "is" })
    ).toEqual("Chess, Checkers, or Go is");
  });
});
