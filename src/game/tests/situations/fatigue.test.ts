import { toLocation } from "utilities";
import { GameMaster } from "game/GameMaster";

import { TokenName } from "game/types";
import { calculateGameOptions } from "game/variantAndRuleProcessing/calculateGameOptions";

describe("With fatigue enabled", () => {
  it("pieces shouldn't be able to move two turns in a row", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({
        gameOptions: calculateGameOptions({ checkEnabled: true }, ["fatigue"]),
      })
    );
    const board = gameMaster.game.board;

    // White pawn to E3
    gameMaster.onPress(toLocation({ rank: 2, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 3, file: 5 }));
    const movedPieces = board.getPiecesAt(toLocation({ rank: 3, file: 5 }));
    expect(movedPieces.length).toEqual(1);
    expect(movedPieces[0]?.hasTokenWithName(TokenName.Fatigue)).toEqual(true);

    // Black pawn to D6
    gameMaster.onPress(toLocation({ rank: 7, file: 4 }));
    gameMaster.onPress(toLocation({ rank: 6, file: 4 }));
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 4 })).length).toEqual(1);

    // Select white pawn at E3
    gameMaster.onPress(toLocation({ rank: 2, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);

    // White pawn to D4
    gameMaster.onPress(toLocation({ rank: 2, file: 4 }));
    gameMaster.onPress(toLocation({ rank: 4, file: 4 }));
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 4 })).length).toEqual(1);

    // Pawn at E3 should no longer have a fatigue token
    expect(
      board
        .getPiecesAt(toLocation({ rank: 3, file: 5 }))[0]
        .hasTokenWithName(TokenName.Fatigue)
    ).toEqual(false);

    // Black knight to C6
    gameMaster.onPress(toLocation({ rank: 8, file: 2 }));
    gameMaster.onPress(toLocation({ rank: 6, file: 3 }));
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 3 })).length).toEqual(1);

    // White pawn to E4 - now it's no longer fatigued it should be able to move
    gameMaster.onPress(toLocation({ rank: 3, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 4, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 5 })).length).toEqual(1);
  });
});
