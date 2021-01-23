import { toLocation } from "utilities";
import { GameMaster } from "game/GameMaster";
import { mockRenderer } from "../helpers/mockRenderer";
import { calculateGameOptions } from "game/variantAndRuleProcessing/calculateGameOptions";

describe("With fatigue enabled", () => {
  it("pieces shouldn't be able to move two turns in a row", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs(
        calculateGameOptions({ checkEnabled: true }, ["hex", "cylinder"]),
        mockRenderer
      )
    );
    const board = gameMaster.game.board;

    // White middle bishop forwards far right
    gameMaster.onPress(toLocation({ rank: 3, file: 6 }));
    gameMaster.onPress(toLocation({ rank: 15, file: 10 }));
    expect(board.getPiecesAt(toLocation({ rank: 15, file: 10 })).length).toEqual(1);

    // Black pawn forwards
    gameMaster.onPress(toLocation({ rank: 14, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 10, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 10, file: 5 })).length).toEqual(1);

    // Select the white bishop we just moved
    gameMaster.onPress(toLocation({ rank: 15, file: 10 }));
    expect(gameMaster.allowableMoves.length).toEqual(10);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 12, file: 11 }) }),
        expect.objectContaining({ location: toLocation({ rank: 6, file: 1 }) }),
        expect.objectContaining({ location: toLocation({ rank: 12, file: 9 }) }),
        expect.objectContaining({ location: toLocation({ rank: 9, file: 8 }) }),
        expect.objectContaining({ location: toLocation({ rank: 6, file: 7 }) }),
        expect.objectContaining({ location: toLocation({ rank: 3, file: 6 }) }),
        expect.objectContaining({ location: toLocation({ rank: 15, file: 2 }) }),
        expect.objectContaining({ location: toLocation({ rank: 15, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 15, file: 8 }) }),
        expect.objectContaining({ location: toLocation({ rank: 18, file: 9 }) }),
      ])
    );

    // White pawn forwards
    gameMaster.onPress(toLocation({ rank: 7, file: 8 }));
    gameMaster.onPress(toLocation({ rank: 9, file: 8 }));
    expect(board.getPiecesAt(toLocation({ rank: 9, file: 8 })).length).toEqual(1);

    // Select free black rook
    gameMaster.onPress(toLocation({ rank: 18, file: 9 }));
    expect(gameMaster.allowableMoves.length).toEqual(11);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 17, file: 8 }) }),
        expect.objectContaining({ location: toLocation({ rank: 16, file: 7 }) }),
        expect.objectContaining({ location: toLocation({ rank: 15, file: 6 }) }),
        expect.objectContaining({ location: toLocation({ rank: 14, file: 5 }) }),
        expect.objectContaining({ location: toLocation({ rank: 13, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 12, file: 3 }) }),
        expect.objectContaining({ location: toLocation({ rank: 11, file: 2 }) }),
        expect.objectContaining({ location: toLocation({ rank: 10, file: 1 }) }),
        expect.objectContaining({ location: toLocation({ rank: 8, file: 11 }) }),
        expect.objectContaining({ location: toLocation({ rank: 7, file: 10 }) }),
        expect.objectContaining({ location: toLocation({ rank: 6, file: 9 }) }),
      ])
    );
  });
});
