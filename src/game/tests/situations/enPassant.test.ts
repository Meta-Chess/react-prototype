import { toLocation } from "utilities";
import { GameMaster } from "game/GameMaster";

import { PlayerName } from "game/types";
import { calculateGameOptions } from "game/variantAndRuleProcessing/calculateGameOptions";

describe("With the standard set of rules", () => {
  it("after a pawn does a double step, it should be vulnerable to interception attacks", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({
        gameOptions: calculateGameOptions({ checkEnabled: false }, []),
      })
    );
    const board = gameMaster.game.board;

    // White pawn to E4
    gameMaster.handleSquarePressed(toLocation({ rank: 2, file: 5 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 5 })).length).toEqual(1);

    // Black pawn to E6
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 5 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 5 })).length).toEqual(1);

    // White pawn to E5
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 5 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 5 })).length).toEqual(1);

    // Black pawn to D5
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 4 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 4 }));
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 4 })).length).toEqual(1);

    // Select white pawn at E5
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 5 }));
    expect(gameMaster.allowableMoves).toEqual([
      expect.objectContaining({ location: toLocation({ rank: 6, file: 4 }) }),
    ]);

    // White pawn to D7, taking black pawn at D5 en passant
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 4 }));
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 4 })).length).toEqual(1);
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 4 }))[0].owner).toEqual(
      PlayerName.White
    );
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 4 })).length).toEqual(0);
  });
});
