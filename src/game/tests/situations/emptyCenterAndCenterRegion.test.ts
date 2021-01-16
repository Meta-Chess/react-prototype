import { toLocation } from "utilities";
import { GameMaster } from "game/GameMaster";
import { mockRenderer } from "../helpers/mockRenderer";
import { calculateGameOptions } from "components/RootStackNavigator/VariantSelectScreen/ScreenStateFunctions/calculateGameOptions";

describe("With empty center", () => {
  it("center pawns only have one allowable move on a standard board", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs(
        calculateGameOptions({}, ["emptyCenter"]),
        mockRenderer
      )
    );

    // White center pawns
    gameMaster.onPress(toLocation({ rank: 2, file: 4 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    expect(gameMaster.allowableMoves).toEqual([
      expect.objectContaining({ location: toLocation({ rank: 3, file: 4 }) }),
    ]);
    gameMaster.onPress(toLocation({ rank: 2, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    expect(gameMaster.allowableMoves).toEqual([
      expect.objectContaining({ location: toLocation({ rank: 3, file: 5 }) }),
    ]);

    // Black center pawns
    gameMaster.onPress(toLocation({ rank: 7, file: 4 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    expect(gameMaster.allowableMoves).toEqual([
      expect.objectContaining({ location: toLocation({ rank: 6, file: 4 }) }),
    ]);
    gameMaster.onPress(toLocation({ rank: 7, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    expect(gameMaster.allowableMoves).toEqual([
      expect.objectContaining({ location: toLocation({ rank: 6, file: 5 }) }),
    ]);
  });

  it("center pawn has no allowable move on a hex board", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs(
        calculateGameOptions({}, ["emptyCenter", "hex"]),
        mockRenderer
      )
    );

    // White center pawn
    gameMaster.onPress(toLocation({ rank: 9, file: 6 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);

    // Black center pawn
    gameMaster.onPress(toLocation({ rank: 13, file: 6 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);
  });

  it("center pawns only have one allowable move on a toroidal board", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs(
        calculateGameOptions({}, ["emptyCenter", "toroidal"]),
        mockRenderer
      )
    );

    // White center pawns
    gameMaster.onPress(toLocation({ rank: 3, file: 4 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    expect(gameMaster.allowableMoves).toEqual([
      expect.objectContaining({ location: toLocation({ rank: 2, file: 4 }) }),
    ]);
    gameMaster.onPress(toLocation({ rank: 3, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    expect(gameMaster.allowableMoves).toEqual([
      expect.objectContaining({ location: toLocation({ rank: 2, file: 5 }) }),
    ]);
    gameMaster.onPress(toLocation({ rank: 5, file: 4 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    expect(gameMaster.allowableMoves).toEqual([
      expect.objectContaining({ location: toLocation({ rank: 6, file: 4 }) }),
    ]);
    gameMaster.onPress(toLocation({ rank: 5, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    expect(gameMaster.allowableMoves).toEqual([
      expect.objectContaining({ location: toLocation({ rank: 6, file: 5 }) }),
    ]);

    // Black center pawns
    gameMaster.onPress(toLocation({ rank: 10, file: 4 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    expect(gameMaster.allowableMoves).toEqual([
      expect.objectContaining({ location: toLocation({ rank: 9, file: 4 }) }),
    ]);
    gameMaster.onPress(toLocation({ rank: 10, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    expect(gameMaster.allowableMoves).toEqual([
      expect.objectContaining({ location: toLocation({ rank: 9, file: 5 }) }),
    ]);
    gameMaster.onPress(toLocation({ rank: 12, file: 4 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    expect(gameMaster.allowableMoves).toEqual([
      expect.objectContaining({ location: toLocation({ rank: 13, file: 4 }) }),
    ]);
    gameMaster.onPress(toLocation({ rank: 12, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    expect(gameMaster.allowableMoves).toEqual([
      expect.objectContaining({ location: toLocation({ rank: 13, file: 5 }) }),
    ]);
  });

  it("bishops can move through, but not on, the center on a standard board", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs(
        calculateGameOptions({}, ["emptyCenter"]),
        mockRenderer
      )
    );

    const board = gameMaster.game.board;

    // White pawn G3
    gameMaster.onPress(toLocation({ rank: 2, file: 7 }));
    expect(board.getPiecesAt(toLocation({ rank: 2, file: 7 })).length).toEqual(1);
    gameMaster.onPress(toLocation({ rank: 3, file: 7 }));
    expect(board.getPiecesAt(toLocation({ rank: 3, file: 7 })).length).toEqual(1);

    // Black pawn E6
    gameMaster.onPress(toLocation({ rank: 7, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 7, file: 5 })).length).toEqual(1);
    gameMaster.onPress(toLocation({ rank: 6, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 5 })).length).toEqual(1);

    // White bishop G2
    gameMaster.onPress(toLocation({ rank: 1, file: 6 }));
    expect(board.getPiecesAt(toLocation({ rank: 1, file: 6 })).length).toEqual(1);
    gameMaster.onPress(toLocation({ rank: 2, file: 7 }));
    expect(board.getPiecesAt(toLocation({ rank: 2, file: 7 })).length).toEqual(1);

    // Inspect G2 bishop moves
    gameMaster.onPress(toLocation({ rank: 2, file: 7 }));
    expect(gameMaster.allowableMoves.length).toEqual(5);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 3, file: 6 }) }),
        expect.objectContaining({ location: toLocation({ rank: 6, file: 3 }) }),
        expect.objectContaining({ location: toLocation({ rank: 7, file: 2 }) }),
        expect.objectContaining({ location: toLocation({ rank: 1, file: 6 }) }),
        expect.objectContaining({ location: toLocation({ rank: 3, file: 8 }) }),
      ])
    );
  });
});
