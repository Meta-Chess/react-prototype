import { Board } from "game/Board";
import { CompactRules } from "game/CompactRules";
import { Direction } from "game/types";
import { toLocation } from "utilities";
import { EventCenter } from "game/EventCenter";

describe("On the cylindrical board", () => {
  const board = Board.createBoard(new CompactRules(["hex"]), new EventCenter({}));

  describe("on the square in the middle of the board", () => {
    const square = board.squareAt(toLocation({ rank: 11, file: 6 }));
    if (!square) {
      throw new Error("Hex board should have a square at this location");
    }

    describe.each`
      direction        | directionLabel | endLocations
      ${Direction.H1}  | ${"H1"}        | ${[toLocation({ rank: 14, file: 7 })]}
      ${Direction.H2}  | ${"H2"}        | ${[toLocation({ rank: 12, file: 7 })]}
      ${Direction.H3}  | ${"H3"}        | ${[toLocation({ rank: 11, file: 8 })]}
      ${Direction.H4}  | ${"H4"}        | ${[toLocation({ rank: 10, file: 7 })]}
      ${Direction.H5}  | ${"H5"}        | ${[toLocation({ rank: 8, file: 7 })]}
      ${Direction.H6}  | ${"H6"}        | ${[toLocation({ rank: 9, file: 6 })]}
      ${Direction.H7}  | ${"H7"}        | ${[toLocation({ rank: 8, file: 5 })]}
      ${Direction.H8}  | ${"H8"}        | ${[toLocation({ rank: 10, file: 5 })]}
      ${Direction.H9}  | ${"H9"}        | ${[toLocation({ rank: 11, file: 4 })]}
      ${Direction.H10} | ${"H10"}       | ${[toLocation({ rank: 12, file: 5 })]}
      ${Direction.H11} | ${"H11"}       | ${[toLocation({ rank: 14, file: 5 })]}
      ${Direction.H12} | ${"H12"}       | ${[toLocation({ rank: 13, file: 6 })]}
    `("going $directionLabel", ({ direction, endLocations }) => {
      it(`should arrive at square with locations ${endLocations}`, () => {
        expect(square.go(direction)).toEqual(endLocations);
      });
    });
  });
});
