import { getPromotionDisambiguationOpportunities } from "./getPromotionDisambiguationOpportunities";
import { givenAMove, givenAPath, givenARandomLocation } from "testHelpers";
import { PieceName } from "game";
import { toLocation } from "utilities";

describe("getPromotionDisambiguationOpportunities", () => {
  describe("when none of the options are promotions", () => {
    const moves = [givenAMove(), givenAMove()];
    it("should return an empty list", () => {
      expect(getPromotionDisambiguationOpportunities(moves)).toEqual([]);
    });
  });

  describe("when there are two options promoting the same piece on the same square", () => {
    const location = givenARandomLocation();
    const pieceId = "a";
    const moves = [
      givenAMove({
        pieceDeltas: [
          { pieceId, path: givenAPath({ end: location }), promoteTo: PieceName.Queen },
        ],
      }),
      givenAMove({
        pieceDeltas: [
          { pieceId, path: givenAPath({ end: location }), promoteTo: PieceName.Rook },
        ],
      }),
    ];
    it("should return the relevant pieceId and location", () => {
      expect(getPromotionDisambiguationOpportunities(moves)).toEqual([
        { pieceId, location },
      ]);
    });
  });

  describe("when there are two options promoting the same piece on the different squares", () => {
    const location1 = toLocation({ rank: 1, file: 1 });
    const location2 = toLocation({ rank: 2, file: 2 });
    const pieceId = "a";
    const moves = [
      givenAMove({
        pieceDeltas: [
          { pieceId, path: givenAPath({ end: location1 }), promoteTo: PieceName.Queen },
        ],
      }),
      givenAMove({
        pieceDeltas: [
          { pieceId, path: givenAPath({ end: location2 }), promoteTo: PieceName.Rook },
        ],
      }),
    ];
    it("should return an empty list", () => {
      expect(getPromotionDisambiguationOpportunities(moves)).toEqual([]);
    });
  });

  describe("when there are two options promoting differentPieces piece on the same square", () => {
    const location = givenARandomLocation();
    const pieceId1 = "a";
    const pieceId2 = "b";
    const moves = [
      givenAMove({
        pieceDeltas: [
          {
            pieceId: pieceId1,
            path: givenAPath({ end: location }),
            promoteTo: PieceName.Queen,
          },
        ],
      }),
      givenAMove({
        pieceDeltas: [
          {
            pieceId: pieceId2,
            path: givenAPath({ end: location }),
            promoteTo: PieceName.Rook,
          },
        ],
      }),
    ];
    it("should return an empty list", () => {
      expect(getPromotionDisambiguationOpportunities(moves)).toEqual([]);
    });
  });

  describe("when there are multiple promotion choices, but not on the same moves", () => {
    const location1 = toLocation({ rank: 1, file: 1 });
    const location2 = toLocation({ rank: 2, file: 2 });
    const pieceId1 = "a";
    const pieceId2 = "b";
    const moves = [
      givenAMove({
        pieceDeltas: [
          {
            pieceId: pieceId1,
            path: givenAPath({ end: location1 }),
            promoteTo: PieceName.Queen,
          },
        ],
      }),
      givenAMove({
        pieceDeltas: [
          {
            pieceId: pieceId1,
            path: givenAPath({ end: location1 }),
            promoteTo: PieceName.Rook,
          },
        ],
      }),
      givenAMove({
        pieceDeltas: [
          {
            pieceId: pieceId2,
            path: givenAPath({ end: location2 }),
            promoteTo: PieceName.Queen,
          },
        ],
      }),
      givenAMove({
        pieceDeltas: [
          {
            pieceId: pieceId2,
            path: givenAPath({ end: location2 }),
            promoteTo: PieceName.Rook,
          },
        ],
      }),
    ];
    it("should return an empty list", () => {
      expect(getPromotionDisambiguationOpportunities(moves)).toEqual([]);
    });
  });

  describe("when there are multiple promotion choices that need to be made regardless of other choices", () => {
    const location1 = toLocation({ rank: 1, file: 1 });
    const location2 = toLocation({ rank: 2, file: 2 });
    const pieceId1 = "a";
    const pieceId2 = "b";
    const moves = [
      givenAMove({
        pieceDeltas: [
          {
            pieceId: pieceId1,
            path: givenAPath({ end: location1 }),
            promoteTo: PieceName.Queen,
          },
          {
            pieceId: pieceId2,
            path: givenAPath({ end: location2 }),
            promoteTo: PieceName.Queen,
          },
        ],
      }),
      givenAMove({
        pieceDeltas: [
          {
            pieceId: pieceId1,
            path: givenAPath({ end: location1 }),
            promoteTo: PieceName.Rook,
          },
          {
            pieceId: pieceId2,
            path: givenAPath({ end: location2 }),
            promoteTo: PieceName.Queen,
          },
        ],
      }),
      givenAMove({
        pieceDeltas: [
          {
            pieceId: pieceId1,
            path: givenAPath({ end: location1 }),
            promoteTo: PieceName.Rook,
          },
          {
            pieceId: pieceId2,
            path: givenAPath({ end: location2 }),
            promoteTo: PieceName.Queen,
          },
        ],
      }),
      givenAMove({
        pieceDeltas: [
          {
            pieceId: pieceId1,
            path: givenAPath({ end: location1 }),
            promoteTo: PieceName.Rook,
          },
          {
            pieceId: pieceId2,
            path: givenAPath({ end: location2 }),
            promoteTo: PieceName.Rook,
          },
        ],
      }),
    ];
    it("should return both pairs of pieceName and location", () => {
      expect(getPromotionDisambiguationOpportunities(moves)).toEqual([
        { pieceId: pieceId1, location: location1 },
        { pieceId: pieceId2, location: location2 },
      ]);
    });
  });

  describe("when there are other non-promotion piece deltas", () => {
    const location = givenARandomLocation();
    const pieceId = "a";
    const moves = [
      givenAMove({
        pieceDeltas: [
          { pieceId, path: givenAPath({ end: location }), promoteTo: PieceName.Queen },
          { pieceId: "b", path: givenAPath() },
          { pieceId: "c", path: givenAPath() },
        ],
      }),
      givenAMove({
        pieceDeltas: [
          { pieceId, path: givenAPath({ end: location }), promoteTo: PieceName.Rook },
          { pieceId: "d", path: givenAPath() },
          { pieceId: "e", path: givenAPath() },
        ],
      }),
    ];
    it("should return the relevant pieceId and location", () => {
      expect(getPromotionDisambiguationOpportunities(moves)).toEqual([
        { pieceId, location },
      ]);
    });
  });
});
