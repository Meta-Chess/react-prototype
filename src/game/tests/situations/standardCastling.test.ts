import { PieceName, Player } from "game/types";
import { toLocation } from "utilities";
import { GameMaster } from "game/GameMaster";
import { mockRenderer } from "../helpers/mockRenderer";
import { Board } from "game";

describe("In standard chess", () => {
  it("There should be four possible castling moves", () => {
    const gameMaster = new GameMaster({ variant: "Chess" }, mockRenderer);
    killBishopsKnightsAndQueens(gameMaster.game.board);

    // White king should have four available moves
    gameMaster.onPress(toLocation({ rank: 1, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(4);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 1, file: 3 }) }),
        expect.objectContaining({ location: toLocation({ rank: 1, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 1, file: 6 }) }),
        expect.objectContaining({ location: toLocation({ rank: 1, file: 7 }) }),
      ])
    );

    // Black king should have four available moves
    gameMaster.onPress(toLocation({ rank: 8, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(4);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 8, file: 3 }) }),
        expect.objectContaining({ location: toLocation({ rank: 8, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 8, file: 6 }) }),
        expect.objectContaining({ location: toLocation({ rank: 8, file: 7 }) }),
      ])
    );
  });

  it("After moving the king, it should be unable to castle", () => {
    const gameMaster = new GameMaster({ variant: "Chess" }, mockRenderer);
    killBishopsKnightsAndQueens(gameMaster.game.board);

    // Move white king
    gameMaster.onPress(toLocation({ rank: 1, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 1, file: 6 }));

    // White king should only have two available moves
    gameMaster.onPress(toLocation({ rank: 1, file: 6 }));
    expect(gameMaster.allowableMoves.length).toEqual(2);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 1, file: 5 }) }),
        expect.objectContaining({ location: toLocation({ rank: 1, file: 7 }) }),
      ])
    );
  });

  it("Moving queen-side rook should stop queen-side castling", () => {
    const gameMaster = new GameMaster({ variant: "Chess" }, mockRenderer);
    killBishopsKnightsAndQueens(gameMaster.game.board);

    // Move white rook
    gameMaster.onPress(toLocation({ rank: 1, file: 1 }));
    gameMaster.onPress(toLocation({ rank: 1, file: 2 }));

    // White king should have four available moves
    gameMaster.onPress(toLocation({ rank: 1, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(3);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 1, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 1, file: 6 }) }),
        expect.objectContaining({ location: toLocation({ rank: 1, file: 7 }) }),
      ])
    );
  });

  it("Moving king-side rook should stop king-side castling", () => {
    const gameMaster = new GameMaster({ variant: "Chess" }, mockRenderer);
    killBishopsKnightsAndQueens(gameMaster.game.board);

    // Move white rook
    gameMaster.onPress(toLocation({ rank: 1, file: 8 }));
    gameMaster.onPress(toLocation({ rank: 1, file: 7 }));

    // White king should have four available moves
    gameMaster.onPress(toLocation({ rank: 1, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(3);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 1, file: 3 }) }),
        expect.objectContaining({ location: toLocation({ rank: 1, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 1, file: 6 }) }),
      ])
    );
  });

  it("Castling queen-side should have correct end position", () => {
    const gameMaster = new GameMaster({ variant: "Chess" }, mockRenderer);
    const board = gameMaster.game.board;
    killBishopsKnightsAndQueens(board);

    // Castle queen-side
    gameMaster.onPress(toLocation({ rank: 1, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 1, file: 3 }));

    // King and rook should be in correct places
    expect(board.getPiecesAt(toLocation({ rank: 1, file: 3 })).length).toEqual(1);
    expect(board.getPiecesAt(toLocation({ rank: 1, file: 3 }))[0]).toEqual(
      expect.objectContaining({ name: PieceName.King, owner: Player.White })
    );
    expect(board.getPiecesAt(toLocation({ rank: 1, file: 4 })).length).toEqual(1);
    expect(board.getPiecesAt(toLocation({ rank: 1, file: 4 }))[0]).toEqual(
      expect.objectContaining({ name: PieceName.Rook, owner: Player.White })
    );
  });
});

function killBishopsKnightsAndQueens(board: Board): void {
  [2, 3, 4, 6, 7]
    .map((file) => [
      { rank: 1, file },
      { rank: 8, file },
    ])
    .flat()
    .map(toLocation)
    .forEach((location) => board.killPiecesAt(location));
}
