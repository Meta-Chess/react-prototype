import { Board } from "game/Board";
import { CompactRules, standard } from "game/Rules";
import { Direction } from "game/types";
import { toLocation } from "utilities";

describe("On the standard board", () => {
  const board = Board.createBoard(new CompactRules([standard]));

  describe("on a square in the middle of the board", () => {
    const square = board.squareAt(toLocation({ rank: 4, file: 4 }));
    if (!square) {
      throw new Error("Standard board should have a square at this location");
    }

    describe.each`
      direction       | directionLabel | endLocations
      ${Direction.N}  | ${"N"}         | ${[toLocation({ rank: 5, file: 4 })]}
      ${Direction.NE} | ${"NE"}        | ${[toLocation({ rank: 5, file: 5 })]}
      ${Direction.E}  | ${"E"}         | ${[toLocation({ rank: 4, file: 5 })]}
      ${Direction.SE} | ${"SE"}        | ${[toLocation({ rank: 3, file: 5 })]}
      ${Direction.S}  | ${"S"}         | ${[toLocation({ rank: 3, file: 4 })]}
      ${Direction.SW} | ${"SW"}        | ${[toLocation({ rank: 3, file: 3 })]}
      ${Direction.W}  | ${"W"}         | ${[toLocation({ rank: 4, file: 3 })]}
      ${Direction.NW} | ${"NW"}        | ${[toLocation({ rank: 5, file: 3 })]}
    `("going $directionLabel", ({ direction, endLocations }) => {
      it(`should arrive at squares with locations ${endLocations}`, () => {
        expect(square.go(direction)).toEqual(endLocations);
      });
    });
  });

  describe("on the bottom left square of the board", () => {
    const square = board.squareAt(toLocation({ rank: 1, file: 1 }));
    if (!square) {
      throw new Error("Standard board should have a square at this location");
    }

    describe.each`
      direction       | directionLabel | endLocations
      ${Direction.N}  | ${"N"}         | ${[toLocation({ rank: 2, file: 1 })]}
      ${Direction.NE} | ${"NE"}        | ${[toLocation({ rank: 2, file: 2 })]}
      ${Direction.E}  | ${"E"}         | ${[toLocation({ rank: 1, file: 2 })]}
      ${Direction.SE} | ${"SE"}        | ${[]}
      ${Direction.S}  | ${"S"}         | ${[]}
      ${Direction.SW} | ${"SW"}        | ${[]}
      ${Direction.W}  | ${"W"}         | ${[]}
      ${Direction.NW} | ${"NW"}        | ${[]}
    `("going $directionLabel", ({ direction, endLocations }) => {
      it(`should arrive at square with locations ${endLocations}`, () => {
        expect(square.go(direction)).toEqual(endLocations);
      });
    });
  });

  describe("on the bottom right square of the board", () => {
    const square = board.squareAt(toLocation({ rank: 1, file: 8 }));
    if (!square) {
      throw new Error("Standard board should have a square at this location");
    }

    describe.each`
      direction       | directionLabel | endLocations
      ${Direction.N}  | ${"N"}         | ${[toLocation({ rank: 2, file: 8 })]}
      ${Direction.NE} | ${"NE"}        | ${[]}
      ${Direction.E}  | ${"E"}         | ${[]}
      ${Direction.SE} | ${"SE"}        | ${[]}
      ${Direction.S}  | ${"S"}         | ${[]}
      ${Direction.SW} | ${"SW"}        | ${[]}
      ${Direction.W}  | ${"W"}         | ${[toLocation({ rank: 1, file: 7 })]}
      ${Direction.NW} | ${"NW"}        | ${[toLocation({ rank: 2, file: 7 })]}
    `("going $directionLabel", ({ direction, endLocations }) => {
      it(`should arrive at square with locations ${endLocations}`, () => {
        expect(square.go(direction)).toEqual(endLocations);
      });
    });
  });

  describe("on the top right square of the board", () => {
    const square = board.squareAt(toLocation({ rank: 8, file: 8 }));
    if (!square) {
      throw new Error("Standard board should have a square at this location");
    }

    describe.each`
      direction       | directionLabel | endLocations
      ${Direction.N}  | ${"N"}         | ${[]}
      ${Direction.NE} | ${"NE"}        | ${[]}
      ${Direction.E}  | ${"E"}         | ${[]}
      ${Direction.SE} | ${"SE"}        | ${[]}
      ${Direction.S}  | ${"S"}         | ${[toLocation({ rank: 7, file: 8 })]}
      ${Direction.SW} | ${"SW"}        | ${[toLocation({ rank: 7, file: 7 })]}
      ${Direction.W}  | ${"W"}         | ${[toLocation({ rank: 8, file: 7 })]}
      ${Direction.NW} | ${"NW"}        | ${[]}
    `("going $directionLabel", ({ direction, endLocations }) => {
      it(`should arrive at square with locations ${endLocations}`, () => {
        expect(square.go(direction)).toEqual(endLocations);
      });
    });
  });

  describe("on the top left square of the board", () => {
    const square = board.squareAt(toLocation({ rank: 8, file: 1 }));
    if (!square) {
      throw new Error("Standard board should have a square at this location");
    }

    describe.each`
      direction       | directionLabel | endLocations
      ${Direction.N}  | ${"N"}         | ${[]}
      ${Direction.NE} | ${"NE"}        | ${[]}
      ${Direction.E}  | ${"E"}         | ${[toLocation({ rank: 8, file: 2 })]}
      ${Direction.SE} | ${"SE"}        | ${[toLocation({ rank: 7, file: 2 })]}
      ${Direction.S}  | ${"S"}         | ${[toLocation({ rank: 7, file: 1 })]}
      ${Direction.SW} | ${"SW"}        | ${[]}
      ${Direction.W}  | ${"W"}         | ${[]}
      ${Direction.NW} | ${"NW"}        | ${[]}
    `("going $directionLabel", ({ direction, endLocations }) => {
      it(`should arrive at square with locations ${endLocations}`, () => {
        expect(square.go(direction)).toEqual(endLocations);
      });
    });
  });
});
