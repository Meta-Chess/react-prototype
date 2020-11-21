import { toLocation } from "utilities";
import { GameMaster } from "game/GameMaster";
import { mockRenderer } from "../helpers/mockRenderer";
import { createPiece } from "game/Rules/utilities";
import { PieceName, Player } from "game/types";

describe("In standard chess", () => {
  it("Players should not be able to move into check on mostly empty board", () => {
    // Setup standard empty board
    const gameMaster = new GameMaster(
      { variant: "Chess", checkEnabled: true },
      mockRenderer
    );
    const board = gameMaster.game.board;
    board.getLocations().forEach((location) => board.killPiecesAt(location));

    // Place a king and a rook
    board.addPiece({
      piece: createPiece({ owner: Player.Black, name: PieceName.King }),
      location: toLocation({ rank: 5, file: 5 }),
    });
    board.addPiece({
      piece: createPiece({ owner: Player.White, name: PieceName.Rook }),
      location: toLocation({ rank: 4, file: 4 }),
    });

    // King should not be able to move into path of rook
    gameMaster.onPress(toLocation({ rank: 5, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(4);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 5, file: 6 }) }),
        expect.objectContaining({ location: toLocation({ rank: 6, file: 6 }) }),
        expect.objectContaining({ location: toLocation({ rank: 6, file: 5 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 4 }) }),
      ])
    );
  });

  it("Players should not be able to move into check in standard chess situation", () => {
    const gameMaster = new GameMaster(
      { variant: "Chess", checkEnabled: true },
      mockRenderer
    );
    const board = gameMaster.game.board;

    // White pawn to E4
    gameMaster.onPress(toLocation({ rank: 2, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 4, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 5 })).length).toEqual(1);

    // Black pawn to E5 - unimportant
    gameMaster.onPress(toLocation({ rank: 7, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 5, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 5 })).length).toEqual(1);

    // White queen to H5
    gameMaster.onPress(toLocation({ rank: 1, file: 4 }));
    gameMaster.onPress(toLocation({ rank: 5, file: 8 }));
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 8 })).length).toEqual(1);

    // Select black pawn at F7
    gameMaster.onPress(toLocation({ rank: 7, file: 6 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);
  });

  it("Players in check must move out of check", () => {
    const gameMaster = new GameMaster(
      { variant: "Chess", checkEnabled: true },
      mockRenderer
    );
    const board = gameMaster.game.board;

    // White pawn to E4
    gameMaster.onPress(toLocation({ rank: 2, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 4, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 5 })).length).toEqual(1);

    // Black knight to C6
    gameMaster.onPress(toLocation({ rank: 8, file: 2 }));
    gameMaster.onPress(toLocation({ rank: 6, file: 3 }));
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 3 })).length).toEqual(1);

    // White queen to H5
    gameMaster.onPress(toLocation({ rank: 1, file: 4 }));
    gameMaster.onPress(toLocation({ rank: 5, file: 8 }));
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 8 })).length).toEqual(1);

    // Black knight to E5
    gameMaster.onPress(toLocation({ rank: 6, file: 3 }));
    gameMaster.onPress(toLocation({ rank: 5, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 5 })).length).toEqual(1);

    // White queen to F7 - Check!
    gameMaster.onPress(toLocation({ rank: 5, file: 8 }));
    gameMaster.onPress(toLocation({ rank: 7, file: 6 }));
    expect(board.getPiecesAt(toLocation({ rank: 7, file: 6 })).length).toEqual(1);

    // King should have one allowable move: take the queen
    gameMaster.onPress(toLocation({ rank: 8, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    expect(gameMaster.allowableMoves).toEqual([
      expect.objectContaining({ location: toLocation({ rank: 7, file: 6 }) }),
    ]);

    // Knight should have two allowable moves: take the queen with either L-shaped path
    gameMaster.onPress(toLocation({ rank: 5, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(2);
    expect(gameMaster.allowableMoves).toEqual([
      expect.objectContaining({ location: toLocation({ rank: 7, file: 6 }) }),
      expect.objectContaining({ location: toLocation({ rank: 7, file: 6 }) }),
    ]);

    // Other pieces should have no allowable moves
    gameMaster.onPress(toLocation({ rank: 8, file: 1 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);
    gameMaster.onPress(toLocation({ rank: 8, file: 7 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);
    gameMaster.onPress(toLocation({ rank: 7, file: 1 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);
    gameMaster.onPress(toLocation({ rank: 7, file: 2 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);
    gameMaster.onPress(toLocation({ rank: 7, file: 3 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);
    gameMaster.onPress(toLocation({ rank: 7, file: 4 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);
    gameMaster.onPress(toLocation({ rank: 7, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);
    gameMaster.onPress(toLocation({ rank: 7, file: 7 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);
    gameMaster.onPress(toLocation({ rank: 7, file: 8 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);
  });
});
