import { toLocation } from "utilities";
import { GameMaster } from "game/GameMaster";
import { mockRenderer } from "../helpers/mockRenderer";
import { PlayerName } from "game/types";

describe("In standard chess", () => {
  it("Fool's mate should end game", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs(
        { variant: "chess", checkEnabled: true },
        mockRenderer
      )
    );
    const board = gameMaster.game.board;

    // White pawn to F3
    gameMaster.onPress(toLocation({ rank: 2, file: 6 }));
    gameMaster.onPress(toLocation({ rank: 3, file: 6 }));
    expect(board.getPiecesAt(toLocation({ rank: 3, file: 6 })).length).toEqual(1);

    // Black pawn to E5
    gameMaster.onPress(toLocation({ rank: 7, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 5, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 5 })).length).toEqual(1);

    // White pawn to G4
    gameMaster.onPress(toLocation({ rank: 2, file: 7 }));
    gameMaster.onPress(toLocation({ rank: 4, file: 7 }));
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 7 })).length).toEqual(1);

    // Black queen to H4
    gameMaster.onPress(toLocation({ rank: 8, file: 4 }));
    gameMaster.onPress(toLocation({ rank: 4, file: 8 }));
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 8 })).length).toEqual(1);

    // Should be checkmate
    expect(gameMaster.gameOver).toEqual(true);
    expect(gameMaster.game.alivePlayers().length).toEqual(1);
    expect(gameMaster.game.alivePlayers()[0].name).toEqual(PlayerName.Black);
    expect(
      gameMaster.game.players.find((p) => p.name === PlayerName.White)?.endGameMessage
    ).toEqual("checkmated");
  });
});
