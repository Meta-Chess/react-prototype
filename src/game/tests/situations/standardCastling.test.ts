import { PieceName, PlayerName } from "game/types";
import { toLocation } from "utilities";
import { GameMaster } from "game/GameMaster";
import { mockRenderer } from "../helpers/mockRenderer";
import { Board, calculateGameOptions } from "game";

describe("In standard chess", () => {
  it("There should be four possible castling moves", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({ variant: "chess" }, mockRenderer)
    );
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
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({ variant: "chess" }, mockRenderer)
    );
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
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({ variant: "chess" }, mockRenderer)
    );
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
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({ variant: "chess" }, mockRenderer)
    );
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
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({ variant: "chess" }, mockRenderer)
    );
    const board = gameMaster.game.board;
    killBishopsKnightsAndQueens(board);

    // Castle queen-side
    gameMaster.onPress(toLocation({ rank: 1, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 1, file: 3 }));

    // King and rook should be in correct places
    expect(board.getPiecesAt(toLocation({ rank: 1, file: 3 })).length).toEqual(1);
    expect(board.getPiecesAt(toLocation({ rank: 1, file: 3 }))[0]).toEqual(
      expect.objectContaining({ name: PieceName.King, owner: PlayerName.White })
    );
    expect(board.getPiecesAt(toLocation({ rank: 1, file: 4 })).length).toEqual(1);
    expect(board.getPiecesAt(toLocation({ rank: 1, file: 4 }))[0]).toEqual(
      expect.objectContaining({ name: PieceName.Rook, owner: PlayerName.White })
    );
  });

  it("We should be unable to castle through enemy pieces", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs(calculateGameOptions({}, []), mockRenderer)
    );
    const board = gameMaster.game.board;

    // White pawn E4
    gameMaster.onPress("R2F5");
    gameMaster.onPress("R4F5");
    expect(board.getPiecesAt("R4F5").length).toEqual(1);

    // Black pawn B6
    gameMaster.onPress("R7F2");
    gameMaster.onPress("R6F2");
    expect(board.getPiecesAt("R6F2").length).toEqual(1);

    // White bishop A6
    gameMaster.onPress("R1F6");
    gameMaster.onPress("R6F1");
    expect(board.getPiecesAt("R6F1").length).toEqual(1);

    // Black bishop takes A6
    gameMaster.onPress("R8F3");
    gameMaster.onPress("R6F1");
    expect(board.getPiecesAt("R6F1").length).toEqual(1);

    // White knight F3
    gameMaster.onPress("R1F7");
    gameMaster.onPress("R3F6");
    expect(board.getPiecesAt("R3F6").length).toEqual(1);

    // Black bishop F1
    gameMaster.onPress("R6F1");
    gameMaster.onPress("R1F6");
    expect(board.getPiecesAt("R1F6").length).toEqual(1);

    // Select white king
    gameMaster.onPress("R1F5");
    // It should not be able to castle
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: "R2F5" }),
        expect.objectContaining({ location: "R1F6" }),
      ])
    );
    expect(gameMaster.allowableMoves.length).toEqual(2);

    // White pawn D3
    gameMaster.onPress("R2F4");
    gameMaster.onPress("R3F4");
    expect(board.getPiecesAt("R3F4").length).toEqual(1);

    // Black bishop takes D3
    gameMaster.onPress("R1F6");
    gameMaster.onPress("R3F4");
    expect(board.getPiecesAt("R3F4").length).toEqual(1);

    // Select white king
    gameMaster.onPress("R1F5");
    // It should be able to castle
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: "R2F5" }),
        expect.objectContaining({ location: "R1F6" }),
        expect.objectContaining({ location: "R2F4" }),
        expect.objectContaining({ location: "R1F7" }),
      ])
    );
    expect(gameMaster.allowableMoves.length).toEqual(4);
    // It castles
    gameMaster.onPress("R1F7");
    expect(board.getPiecesAt("R1F5").length).toEqual(0);
    expect(board.getPiecesAt("R1F6").length).toEqual(1);
    expect(board.getPiecesAt("R1F7").length).toEqual(1);
    expect(board.getPiecesAt("R1F8").length).toEqual(0);
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
    .forEach((location) => board.killPiecesAt({ piecesLocation: location }));
}
