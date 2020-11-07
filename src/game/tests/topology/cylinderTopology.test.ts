import { Board } from "game/Board";
import { CompactRules, cylindrical, standard } from "game/Rules";
import { Direction } from "game/types";
import { toLocation } from "utilities";

describe("On the cylindrical board", () => {
  const board = Board.createBoard(new CompactRules([standard, cylindrical]));

  describe("on a square in the middle of the board", () => {
    const square = board.squareAt(toLocation({ rank: 4, file: 4 }));
    if (!square) {
      throw new Error("Standard board should have a square at this location");
    }

    it("should be possible to `go` N", () => {
      expect(square.go(Direction.N)).toEqual([toLocation({ rank: 5, file: 4 })]);
    });

    it("should be possible to `go` NE", () => {
      expect(square.go(Direction.NE)).toEqual([toLocation({ rank: 5, file: 5 })]);
    });

    it("should be possible to `go` E", () => {
      expect(square.go(Direction.E)).toEqual([toLocation({ rank: 4, file: 5 })]);
    });

    it("should be possible to `go` SE", () => {
      expect(square.go(Direction.SE)).toEqual([toLocation({ rank: 3, file: 5 })]);
    });

    it("should be possible to `go` S", () => {
      expect(square.go(Direction.S)).toEqual([toLocation({ rank: 3, file: 4 })]);
    });

    it("should be possible to `go` SW", () => {
      expect(square.go(Direction.SW)).toEqual([toLocation({ rank: 3, file: 3 })]);
    });

    it("should be possible to `go` W", () => {
      expect(square.go(Direction.W)).toEqual([toLocation({ rank: 4, file: 3 })]);
    });

    it("should be possible to `go` NW", () => {
      expect(square.go(Direction.NW)).toEqual([toLocation({ rank: 5, file: 3 })]);
    });
  });

  describe("on the bottom left square of the board", () => {
    const square = board.squareAt(toLocation({ rank: 1, file: 1 }));
    if (!square) {
      throw new Error("Standard board should have a square at this location");
    }

    it("should be possible to `go` N", () => {
      expect(square.go(Direction.N)).toEqual([toLocation({ rank: 2, file: 1 })]);
    });

    it("should be possible to `go` NE", () => {
      expect(square.go(Direction.NE)).toEqual([toLocation({ rank: 2, file: 2 })]);
    });

    it("should be possible to `go` E", () => {
      expect(square.go(Direction.E)).toEqual([toLocation({ rank: 1, file: 2 })]);
    });

    it("should be possible to `go` NW", () => {
      expect(square.go(Direction.NW)).toEqual([toLocation({ rank: 2, file: 8 })]);
    });

    it("should be possible to `go` W", () => {
      expect(square.go(Direction.W)).toEqual([toLocation({ rank: 1, file: 8 })]);
    });

    it("should be not be possible to `go` in the other directions", () => {
      [Direction.SE, Direction.SW, Direction.S].forEach((direction) => {
        expect(square.go(direction)).toEqual([]);
      });
    });
  });

  describe("on the bottom right square of the board", () => {
    const square = board.squareAt(toLocation({ rank: 1, file: 8 }));
    if (!square) {
      throw new Error("Standard board should have a square at this location");
    }

    it("should be possible to `go` N", () => {
      expect(square.go(Direction.N)).toEqual([toLocation({ rank: 2, file: 8 })]);
    });

    it("should be possible to `go` NW", () => {
      expect(square.go(Direction.NW)).toEqual([toLocation({ rank: 2, file: 7 })]);
    });

    it("should be possible to `go` W", () => {
      expect(square.go(Direction.W)).toEqual([toLocation({ rank: 1, file: 7 })]);
    });

    it("should be possible to `go` NE", () => {
      expect(square.go(Direction.NE)).toEqual([toLocation({ rank: 2, file: 1 })]);
    });

    it("should be possible to `go` E", () => {
      expect(square.go(Direction.E)).toEqual([toLocation({ rank: 1, file: 1 })]);
    });

    it("should be not be possible to `go` in the other directions", () => {
      [Direction.SE, Direction.SW, Direction.S].forEach((direction) => {
        expect(square.go(direction)).toEqual([]);
      });
    });
  });

  describe("on the top right square of the board", () => {
    const square = board.squareAt(toLocation({ rank: 8, file: 8 }));
    if (!square) {
      throw new Error("Standard board should have a square at this location");
    }

    it("should be possible to `go` S", () => {
      expect(square.go(Direction.S)).toEqual([toLocation({ rank: 7, file: 8 })]);
    });

    it("should be possible to `go` SW", () => {
      expect(square.go(Direction.SW)).toEqual([toLocation({ rank: 7, file: 7 })]);
    });

    it("should be possible to `go` W", () => {
      expect(square.go(Direction.W)).toEqual([toLocation({ rank: 8, file: 7 })]);
    });

    it("should be possible to `go` SE", () => {
      expect(square.go(Direction.SE)).toEqual([toLocation({ rank: 7, file: 1 })]);
    });

    it("should be possible to `go` E", () => {
      expect(square.go(Direction.E)).toEqual([toLocation({ rank: 8, file: 1 })]);
    });

    it("should be not be possible to `go` in the other directions", () => {
      [Direction.NW, Direction.N, Direction.NE].forEach((direction) => {
        expect(square.go(direction)).toEqual([]);
      });
    });
  });

  describe("on the top left square of the board", () => {
    const square = board.squareAt(toLocation({ rank: 8, file: 1 }));
    if (!square) {
      throw new Error("Standard board should have a square at this location");
    }

    it("should be possible to `go` S", () => {
      expect(square.go(Direction.S)).toEqual([toLocation({ rank: 7, file: 1 })]);
    });

    it("should be possible to `go` SE", () => {
      expect(square.go(Direction.SE)).toEqual([toLocation({ rank: 7, file: 2 })]);
    });

    it("should be possible to `go` E", () => {
      expect(square.go(Direction.E)).toEqual([toLocation({ rank: 8, file: 2 })]);
    });

    it("should be possible to `go` SW", () => {
      expect(square.go(Direction.SW)).toEqual([toLocation({ rank: 7, file: 8 })]);
    });

    it("should be possible to `go` W", () => {
      expect(square.go(Direction.W)).toEqual([toLocation({ rank: 8, file: 8 })]);
    });

    it("should be not be possible to `go` in the other directions", () => {
      [Direction.NW, Direction.N, Direction.NE].forEach((direction) => {
        expect(square.go(direction)).toEqual([]);
      });
    });
  });
});
