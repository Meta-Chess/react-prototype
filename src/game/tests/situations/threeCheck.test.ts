import { toLocation } from "utilities";
import { GameMaster } from "game/GameMaster";
import { mockRenderer } from "../helpers/mockRenderer";
import { PlayerName } from "game/types";
import { calculateGameOptions } from "game/variantAndRuleProcessing/calculateGameOptions";

const mockCheckConsequence = jest.fn();

describe("With three check enabled", () => {
  it("checking three times should end the game", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs(
        calculateGameOptions({ checkEnabled: true }, ["threeCheck"]),
        mockRenderer
      )
    );
    const board = gameMaster.game.board;

    gameMaster.game.events.subscribe({
      name: "check",
      consequence: mockCheckConsequence,
    });

    // White pawn to E3
    gameMaster.onPress(toLocation({ rank: 2, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 3, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 3, file: 5 })).length).toEqual(1);

    // Black pawn to D6
    gameMaster.onPress(toLocation({ rank: 7, file: 4 }));
    gameMaster.onPress(toLocation({ rank: 6, file: 4 }));
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 4 })).length).toEqual(1);

    // White bishop to B5 - check 1
    gameMaster.onPress(toLocation({ rank: 1, file: 6 }));
    gameMaster.onPress(toLocation({ rank: 5, file: 2 }));
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 2 })).length).toEqual(1);
    expect(mockCheckConsequence).toHaveBeenCalledTimes(1);

    // Black pawn to C6
    gameMaster.onPress(toLocation({ rank: 7, file: 3 }));
    gameMaster.onPress(toLocation({ rank: 6, file: 3 }));
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 3 })).length).toEqual(1);

    // White bishop to C6 - check 2
    gameMaster.onPress(toLocation({ rank: 5, file: 2 }));
    gameMaster.onPress(toLocation({ rank: 6, file: 3 }));
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 3 })).length).toEqual(1);
    expect(mockCheckConsequence).toHaveBeenCalledTimes(2);

    // Black queen to D2
    gameMaster.onPress(toLocation({ rank: 8, file: 4 }));
    gameMaster.onPress(toLocation({ rank: 7, file: 4 }));
    expect(board.getPiecesAt(toLocation({ rank: 7, file: 4 })).length).toEqual(1);

    // White bishop to D2 - check 3
    gameMaster.onPress(toLocation({ rank: 6, file: 3 }));
    gameMaster.onPress(toLocation({ rank: 7, file: 4 }));
    expect(board.getPiecesAt(toLocation({ rank: 7, file: 4 })).length).toEqual(1);
    expect(mockCheckConsequence).toHaveBeenCalledTimes(3);

    // Should be game over
    expect(gameMaster.gameOver).toEqual(true);
    expect(gameMaster.game.alivePlayers().length).toEqual(1);
    expect(gameMaster.game.alivePlayers()[0].name).toEqual(PlayerName.White);
    expect(
      gameMaster.game.players.find((p) => p.name === PlayerName.Black)?.endGameMessage
    ).toEqual("has been checked 3 times");
  });
});