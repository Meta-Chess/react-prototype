import { toLocation } from "utilities";
import { GameMaster } from "game/GameMaster";
import { mockRenderer } from "../helpers/mockRenderer";
import { calculateGameOptions } from "game/variantAndRuleProcessing/calculateGameOptions";
import { PlayerName } from "game/types";

describe("With pathetic king", () => {
  it("fools mate with queen alone", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs(
        calculateGameOptions({ checkEnabled: true }, ["patheticKing"]),
        mockRenderer
      )
    );
    const board = gameMaster.game.board;

    // White pawn to E4
    gameMaster.onPress(toLocation({ rank: 2, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 4, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 5 })).length).toEqual(1);

    // Black pawn to E5
    gameMaster.onPress(toLocation({ rank: 7, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 5, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 5 })).length).toEqual(1);

    // White queen to F3
    gameMaster.onPress(toLocation({ rank: 1, file: 4 }));
    gameMaster.onPress(toLocation({ rank: 3, file: 6 }));
    expect(board.getPiecesAt(toLocation({ rank: 3, file: 6 })).length).toEqual(1);

    // Black knight to C6
    gameMaster.onPress(toLocation({ rank: 8, file: 2 }));
    gameMaster.onPress(toLocation({ rank: 6, file: 3 }));
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 3 })).length).toEqual(1);

    // White queen to F7
    gameMaster.onPress(toLocation({ rank: 3, file: 6 }));
    gameMaster.onPress(toLocation({ rank: 7, file: 6 }));
    expect(board.getPiecesAt(toLocation({ rank: 7, file: 6 })).length).toEqual(1);

    // Checkmate
    expect(gameMaster.gameOver).toEqual(true);
    expect(gameMaster.game.alivePlayers().length).toEqual(1);
    expect(gameMaster.game.alivePlayers()[0].name).toEqual(PlayerName.White);
    expect(
      gameMaster.game.players.find((p) => p.name === PlayerName.Black)?.endGameMessage
    ).toEqual("checkmated");
  });
});
