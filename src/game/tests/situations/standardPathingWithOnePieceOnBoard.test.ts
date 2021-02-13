import { createPiece } from "game/rules/utilities";
import { PieceName, PlayerName } from "game/types";
import { toLocation } from "utilities";
import { GameMaster } from "../../GameMaster";

describe("In standard chess", () => {
  const gameMaster = new GameMaster(...GameMaster.processConstructorInputs({}));
  const board = gameMaster.game.board;
  beforeEach(() => {
    board
      .getLocations()
      .forEach((location) => board.killPiecesAt({ piecesLocation: location }));
    gameMaster.unselectAllPieces();
  });

  it("A queen in the middle of the board should be able to move to lots of squares", () => {
    const location = toLocation({ rank: 4, file: 4 });
    board.addPiece({
      piece: createPiece({ owner: PlayerName.White, name: PieceName.Queen }),
      location,
    });
    gameMaster.onPress(location);
    const locationsToMoveTo = gameMaster.allowableMoves.map((move) => move.location);
    expect(locationsToMoveTo).toEqual([
      ...["R5F4", "R6F4", "R7F4", "R8F4"],
      ...["R4F5", "R4F6", "R4F7", "R4F8"],
      ...["R3F4", "R2F4", "R1F4"],
      ...["R4F3", "R4F2", "R4F1"],
      ...["R5F5", "R6F6", "R7F7", "R8F8"],
      ...["R3F5", "R2F6", "R1F7"],
      ...["R3F3", "R2F2", "R1F1"],
      ...["R5F3", "R6F2", "R7F1"],
    ]);
  });

  it("A king in the middle of the board should be able to move to eight squares", () => {
    const location = toLocation({ rank: 4, file: 4 });
    board.addPiece({
      piece: createPiece({ owner: PlayerName.White, name: PieceName.King }),
      location,
    });
    gameMaster.onPress(location);
    const locationsToMoveTo = gameMaster.allowableMoves.map((move) => move.location);
    expect(locationsToMoveTo).toEqual([
      "R5F4",
      "R5F5",
      "R4F5",
      "R3F5",
      "R3F4",
      "R3F3",
      "R4F3",
      "R5F3",
    ]);
  });

  it("A knight in the middle of the board should be able to move to eight squares in one way each", () => {
    const location = toLocation({ rank: 4, file: 4 });
    board.addPiece({
      piece: createPiece({ owner: PlayerName.White, name: PieceName.Knight }),
      location,
    });
    gameMaster.onPress(location);
    const locationsToMoveTo = gameMaster.allowableMoves.map((move) => move.location);
    expect(locationsToMoveTo).toEqual(
      expect.arrayContaining([
        "R6F5",
        "R6F3",
        "R3F6",
        "R5F6",
        "R2F5",
        "R2F3",
        "R3F2",
        "R5F2",
      ])
    );
  });

  it("A rook in the middle of the board should be able to move to fourteen squares", () => {
    const location = toLocation({ rank: 4, file: 4 });
    board.addPiece({
      piece: createPiece({ owner: PlayerName.White, name: PieceName.Rook }),
      location,
    });
    gameMaster.onPress(location);
    const locationsToMoveTo = gameMaster.allowableMoves.map((move) => move.location);
    expect(locationsToMoveTo).toEqual([
      ...["R5F4", "R6F4", "R7F4", "R8F4"],
      ...["R4F5", "R4F6", "R4F7", "R4F8"],
      ...["R3F4", "R2F4", "R1F4"],
      ...["R4F3", "R4F2", "R4F1"],
    ]);
  });

  it("A bishop in the middle of the board should be able to move to thirteen squares", () => {
    const location = toLocation({ rank: 4, file: 4 });
    board.addPiece({
      piece: createPiece({ owner: PlayerName.White, name: PieceName.Bishop }),
      location,
    });
    gameMaster.onPress(location);
    const locationsToMoveTo = gameMaster.allowableMoves.map((move) => move.location);
    expect(locationsToMoveTo).toEqual([
      ...["R5F5", "R6F6", "R7F7", "R8F8"],
      ...["R3F5", "R2F6", "R1F7"],
      ...["R3F3", "R2F2", "R1F1"],
      ...["R5F3", "R6F2", "R7F1"],
    ]);
  });
});
