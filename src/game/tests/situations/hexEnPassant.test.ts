import { toLocation } from "utilities";
import { GameMaster } from "game/GameMaster";
import { mockRenderer } from "../helpers/mockRenderer";
import { PlayerName } from "game/types";
import { calculateGameOptions } from "game/variantAndRuleProcessing/calculateGameOptions";

describe("With the standard set of rules", () => {
  it("after a pawn does a double step, it should be vulnerable to interception attacks", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs(
        calculateGameOptions({}, ["hex"]),
        mockRenderer
      )
    );
    const board = gameMaster.game.board;

    // White pawn forwards
    gameMaster.onPress(toLocation({ rank: 7, file: 8 }));
    gameMaster.onPress(toLocation({ rank: 11, file: 8 }));
    expect(board.getPiecesAt(toLocation({ rank: 11, file: 8 })).length).toEqual(1);

    // Black pawn forwards
    gameMaster.onPress(toLocation({ rank: 14, file: 7 }));
    gameMaster.onPress(toLocation({ rank: 10, file: 7 }));
    expect(board.getPiecesAt(toLocation({ rank: 10, file: 7 })).length).toEqual(1);

    // Select white that moved
    gameMaster.onPress(toLocation({ rank: 11, file: 8 }));
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 12, file: 7 }) }),
        expect.objectContaining({ location: toLocation({ rank: 13, file: 8 }) }),
      ])
    );

    // White pawn to D7, taking black pawn at D5 en passant
    gameMaster.onPress(toLocation({ rank: 12, file: 7 }));
    expect(board.getPiecesAt(toLocation({ rank: 12, file: 7 })).length).toEqual(1);
    expect(board.getPiecesAt(toLocation({ rank: 12, file: 7 }))[0].owner).toEqual(
      PlayerName.White
    );
    expect(board.getPiecesAt(toLocation({ rank: 11, file: 7 })).length).toEqual(0);
  });
});
