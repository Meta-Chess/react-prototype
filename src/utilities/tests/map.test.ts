import { Map } from "../Map";

describe("Map", () => {
  describe("get and push", () => {
    it("should return from get, a value that was pushed, by its key", () => {
      const map = new Map<string, string>().push({
        key: "hello",
        value: "world",
      });
      expect(map.get("hello")).toEqual("world");
    });

    it("should work with multiple key-value pairs", () => {
      const map = new Map<string, string>()
        .push({
          key: "hello",
          value: "world",
        })
        .push({ key: "foo", value: "bar" });
      expect(map.get("foo")).toEqual("bar");
      expect(map.get("hello")).toEqual("world");
    });

    it("should not remove a pushed value after getting it", () => {
      const map = new Map<string, string>()
        .push({
          key: "hello",
          value: "world",
        })
        .push({ key: "foo", value: "bar" });
      map.get("foo");
      expect(map.get("foo")).toEqual("bar");
    });
  });

  describe("keys", () => {
    it("should return the list keys in the map", () => {
      const map = new Map<string, string>()
        .push({
          key: "hello",
          value: "world",
        })
        .push({ key: "foo", value: "bar" });
      expect(map.keys()).toEqual(["hello", "foo"]);
    });
  });

  describe("pushAll", () => {
    it("should put all key value pairs into the map", () => {
      const map = new Map<string, string>().pushAll([
        { key: "tomato", value: "fruit" },
        { key: "banana", value: "herb" },
        { key: "pumpkin", value: "vegetable" },
      ]);
      expect(map.get("tomato")).toEqual("fruit");
      expect(map.get("banana")).toEqual("herb");
      expect(map.get("pumpkin")).toEqual("vegetable");
    });
  });

  describe("fromKeyArrayWithValueGenerator", () => {});
});
