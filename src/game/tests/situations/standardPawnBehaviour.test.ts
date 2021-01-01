import { PieceName, PlayerName } from "game/types";
import { toLocation } from "utilities";
import { GameMaster } from "game/GameMaster";
import { mockRenderer } from "../helpers/mockRenderer";

describe("In standard chess", () => {
  it("A white pawn should have allowable moves one or two squares forwards from its starting position", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({ variant: "Chess" }, mockRenderer)
    );

    // Select white pawn at E2
    gameMaster.onPress(toLocation({ rank: 2, file: 5 }));

    expect(gameMaster.allowableMoves.length).toEqual(2);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 3, file: 5 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 5 }) }),
      ])
    );
  });

  it("A black pawn should have allowable moves one or two squares forwards from its starting position", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({ variant: "Chess" }, mockRenderer)
    );

    // Select black pawn at E7
    gameMaster.onPress(toLocation({ rank: 7, file: 5 }));

    expect(gameMaster.allowableMoves.length).toEqual(2);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 6, file: 5 }) }),
        expect.objectContaining({ location: toLocation({ rank: 5, file: 5 }) }),
      ])
    );
  });

  it("A pawn should be able to move two squares forwards from its starting position", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({ variant: "Chess" }, mockRenderer)
    );
    const board = gameMaster.game.board;

    // White pawn to E4
    gameMaster.onPress(toLocation({ rank: 2, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 4, file: 5 }));

    // There should be a white pawn at the end square
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 5 })).length).toEqual(1);
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 5 }))[0]).toEqual(
      expect.objectContaining({ name: PieceName.Pawn, owner: PlayerName.White })
    );

    // There start square should be empty
    expect(board.getPiecesAt(toLocation({ rank: 2, file: 5 })).length).toEqual(0);
  });

  it("A pawn should be able to move one square forwards from its starting position", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({ variant: "Chess" }, mockRenderer)
    );
    const board = gameMaster.game.board;

    // White pawn to E4
    gameMaster.onPress(toLocation({ rank: 2, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 3, file: 5 }));

    // There should be a white pawn at the end square
    expect(board.getPiecesAt(toLocation({ rank: 3, file: 5 })).length).toEqual(1);
    expect(board.getPiecesAt(toLocation({ rank: 3, file: 5 }))[0]).toEqual(
      expect.objectContaining({ name: PieceName.Pawn, owner: PlayerName.White })
    );

    // There start square should be empty
    expect(board.getPiecesAt(toLocation({ rank: 2, file: 5 })).length).toEqual(0);
  });

  it("After moving one square, a pawn should only have one allowable move", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({ variant: "Chess" }, mockRenderer)
    );

    // White pawn to E3
    gameMaster.onPress(toLocation({ rank: 2, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 3, file: 5 }));

    // Black pawn to D5
    gameMaster.onPress(toLocation({ rank: 7, file: 4 }));
    gameMaster.onPress(toLocation({ rank: 5, file: 4 }));

    // Select white pawn at E3
    gameMaster.onPress(toLocation({ rank: 3, file: 5 }));

    expect(gameMaster.allowableMoves.length).toEqual(1);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 4, file: 5 }) }),
      ])
    );
  });

  it("After moving two squares, a pawn should only have one allowable move", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({ variant: "Chess" }, mockRenderer)
    );

    // White pawn to E3
    gameMaster.onPress(toLocation({ rank: 2, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 3, file: 5 }));

    // Black pawn to D5
    gameMaster.onPress(toLocation({ rank: 7, file: 4 }));
    gameMaster.onPress(toLocation({ rank: 5, file: 4 }));

    // White queen to H5
    gameMaster.onPress(toLocation({ rank: 1, file: 4 }));
    gameMaster.onPress(toLocation({ rank: 5, file: 8 }));

    // Select black pawn at D5
    gameMaster.onPress(toLocation({ rank: 5, file: 4 }));

    expect(gameMaster.allowableMoves.length).toEqual(1);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 4, file: 4 }) }),
      ])
    );
  });

  it("Pawns can take diagonally but not forwards", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({ variant: "Chess" }, mockRenderer)
    );
    const board = gameMaster.game.board;

    // White pawn to E4
    gameMaster.onPress(toLocation({ rank: 2, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 4, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 5 })).length).toEqual(1);

    // Black pawn to D5
    gameMaster.onPress(toLocation({ rank: 7, file: 4 }));
    gameMaster.onPress(toLocation({ rank: 5, file: 4 }));
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 4 })).length).toEqual(1);

    // White queen to H5 - unimportant
    gameMaster.onPress(toLocation({ rank: 1, file: 4 }));
    gameMaster.onPress(toLocation({ rank: 5, file: 8 }));
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 8 })).length).toEqual(1);

    // Black pawn to E5
    gameMaster.onPress(toLocation({ rank: 7, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 5, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 5 })).length).toEqual(1);

    // White pawn to A3 - unimportant
    gameMaster.onPress(toLocation({ rank: 2, file: 1 }));
    gameMaster.onPress(toLocation({ rank: 3, file: 1 }));
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 5 })).length).toEqual(1);

    // Black pawn to F5
    gameMaster.onPress(toLocation({ rank: 7, file: 6 }));
    gameMaster.onPress(toLocation({ rank: 5, file: 6 }));
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 6 })).length).toEqual(1);

    // Select white pawn at E4
    gameMaster.onPress(toLocation({ rank: 4, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(2);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 5, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 5, file: 6 }) }),
      ])
    );

    // Instead select black pawn at E5
    gameMaster.onPress(toLocation({ rank: 5, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);

    // Instead select black pawn at D5
    gameMaster.onPress(toLocation({ rank: 5, file: 4 }));
    expect(gameMaster.allowableMoves.length).toEqual(2);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 4, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 5 }) }),
      ])
    );
  });
});
