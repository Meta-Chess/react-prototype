import { toLocation } from "utilities";
import { GameMaster } from "game/GameMaster";

import { createPiece } from "game/CompactRules/utilities";
import { PieceName, PlayerName } from "game/types";
import { calculateGameOptions } from "game/variantAndRuleProcessing";

describe("In standard chess", () => {
  it("Players should not be able to move into check on mostly empty board", () => {
    // Setup standard empty board
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({
        gameOptions: calculateGameOptions({ checkEnabled: true }, []),
      })
    );
    const board = gameMaster.game.board;
    board
      .getLocations()
      .forEach((location) => board.killPiecesAt({ piecesLocation: location }));

    // Place a king and a rook
    board.addPiece({
      piece: createPiece({ owner: PlayerName.Black, name: PieceName.King }),
      location: toLocation({ rank: 5, file: 5 }),
    });
    board.addPiece({
      piece: createPiece({ owner: PlayerName.White, name: PieceName.Rook }),
      location: toLocation({ rank: 4, file: 4 }),
    });

    // King should not be able to move into path of rook
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 5 }));
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
      ...GameMaster.processConstructorInputs({
        gameOptions: calculateGameOptions({ checkEnabled: true }, []),
      })
    );
    const board = gameMaster.game.board;

    // White pawn to E4
    gameMaster.handleSquarePressed(toLocation({ rank: 2, file: 5 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 5 })).length).toEqual(1);

    // Black pawn to E5 - unimportant
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 5 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 5 })).length).toEqual(1);

    // White queen to H5
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 4 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 8 }));
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 8 })).length).toEqual(1);

    // Select black pawn at F7
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 6 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);
  });

  it("Players in check (not mate) can and must move out of check", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({
        gameOptions: calculateGameOptions({ checkEnabled: true }, []),
      })
    );
    const board = gameMaster.game.board;

    // White pawn to E4
    gameMaster.handleSquarePressed(toLocation({ rank: 2, file: 5 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 5 })).length).toEqual(1);

    // Black knight to C6
    gameMaster.handleSquarePressed(toLocation({ rank: 8, file: 2 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 3 }));
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 3 })).length).toEqual(1);

    // White queen to H5
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 4 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 8 }));
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 8 })).length).toEqual(1);

    // Black knight to E5
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 3 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 5 })).length).toEqual(1);

    // White queen to F7 - Check!
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 8 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 6 }));
    expect(board.getPiecesAt(toLocation({ rank: 7, file: 6 })).length).toEqual(1);

    // Game should not have ended
    expect(gameMaster.gameOver).toEqual(false);
    expect(gameMaster.game.alivePlayers().length).toEqual(2);

    // King should have one allowable move: take the queen
    gameMaster.handleSquarePressed(toLocation({ rank: 8, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    expect(gameMaster.allowableMoves).toEqual([
      expect.objectContaining({ location: toLocation({ rank: 7, file: 6 }) }),
    ]);

    // Knight should have one allowable move: take the queen.
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    expect(gameMaster.allowableMoves).toEqual([
      expect.objectContaining({ location: toLocation({ rank: 7, file: 6 }) }),
    ]);

    // Other pieces should have no allowable moves
    gameMaster.handleSquarePressed(toLocation({ rank: 8, file: 1 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);
    gameMaster.handleSquarePressed(toLocation({ rank: 8, file: 7 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 1 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 2 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 3 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 4 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 7 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 8 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);
  });
});
