import { range, toLocation } from "utilities";
import { GameMaster } from "game/GameMaster";
import { calculateGameOptions } from "game/variantAndRuleProcessing/calculateGameOptions";
import { Board } from "../../Board";

describe("With the standard set of rules", () => {
  it("should be impossible to castle through check", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({
        gameOptions: calculateGameOptions({ checkEnabled: true }, []),
      })
    );
    const board = gameMaster.game.board;
    killMostPawnsKnightsBishopsAndWhiteQueen(board);

    // Select white king
    gameMaster.onPress(toLocation({ rank: 1, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(4);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 1, file: 6 }) }),
        expect.objectContaining({ location: toLocation({ rank: 1, file: 7 }) }),
        expect.objectContaining({ location: toLocation({ rank: 2, file: 5 }) }),
        expect.objectContaining({ location: toLocation({ rank: 2, file: 6 }) }),
      ])
    );
  });

  it("should be impossible to castle out of check", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({
        gameOptions: calculateGameOptions({ checkEnabled: true }, []),
      })
    );
    const board = gameMaster.game.board;
    killMostPawnsKnightsBishopsAndWhiteQueen(board);

    // White pawn to A3 - unimportant
    gameMaster.onPress(toLocation({ rank: 2, file: 1 }));
    gameMaster.onPress(toLocation({ rank: 3, file: 1 }));
    expect(board.getPiecesAt(toLocation({ rank: 3, file: 1 })).length).toEqual(1);

    // Black queen to E7 - check
    gameMaster.onPress(toLocation({ rank: 8, file: 4 }));
    gameMaster.onPress(toLocation({ rank: 7, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 7, file: 5 })).length).toEqual(1);

    // Select white king
    gameMaster.onPress(toLocation({ rank: 1, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(4);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 1, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 1, file: 6 }) }),
        expect.objectContaining({ location: toLocation({ rank: 2, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 2, file: 6 }) }),
      ])
    );
  });
});

function killMostPawnsKnightsBishopsAndWhiteQueen(board: Board): void {
  [2, 3, 6, 7]
    .map((file) => [
      { rank: 1, file },
      { rank: 8, file },
    ])
    .concat(
      range(2, 7).map((file) => [
        { rank: 2, file },
        { rank: 7, file },
      ])
    )
    .flat()
    .concat({ rank: 1, file: 4 })
    .map(toLocation)
    .forEach((location) => board.killPiecesAt({ piecesLocation: location }));
}
