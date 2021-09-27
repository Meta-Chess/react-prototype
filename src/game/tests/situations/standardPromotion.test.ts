import { GameMaster } from "game/GameMaster";
import { calculateGameOptions, PieceName } from "game";

describe("In standard chess, when a piece gets to the end of the board", () => {
  it("should be able to promote", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({
        gameOptions: calculateGameOptions({ checkEnabled: false }, []),
      })
    );
    const board = gameMaster.game.board;

    // White pawn G4
    gameMaster.handleSquarePressed("R2F7");
    gameMaster.handleSquarePressed("R4F7");
    expect(board.getPiecesAt("R4F7").length).toEqual(1);

    // Black pawn F5
    gameMaster.handleSquarePressed("R7F6");
    gameMaster.handleSquarePressed("R5F6");
    expect(board.getPiecesAt("R5F6").length).toEqual(1);

    // White pawn takes F5
    gameMaster.handleSquarePressed("R4F7");
    gameMaster.handleSquarePressed("R5F6");
    expect(board.getPiecesAt("R5F6").length).toEqual(1);

    // Black pawn G6
    gameMaster.handleSquarePressed("R7F7");
    gameMaster.handleSquarePressed("R6F7");
    expect(board.getPiecesAt("R6F7").length).toEqual(1);

    // White pawn takes G6
    gameMaster.handleSquarePressed("R5F6");
    gameMaster.handleSquarePressed("R6F7");
    expect(board.getPiecesAt("R6F7").length).toEqual(1);

    // Black knight F6
    gameMaster.handleSquarePressed("R8F7");
    gameMaster.handleSquarePressed("R6F6");
    expect(board.getPiecesAt("R6F6").length).toEqual(1);

    // White pawn takes H7
    gameMaster.handleSquarePressed("R6F7");
    gameMaster.handleSquarePressed("R7F8");
    expect(board.getPiecesAt("R7F8").length).toEqual(1);

    // Black knight G8
    gameMaster.handleSquarePressed("R6F6");
    gameMaster.handleSquarePressed("R8F7");
    expect(board.getPiecesAt("R8F7").length).toEqual(1);

    // Select white pawn at H7
    gameMaster.handleSquarePressed("R7F8");

    // Expect allowable moves to be the four promotion options
    expect(gameMaster.allowableMoves.length).toEqual(4);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          location: "R8F7",
          pieceDeltas: [expect.objectContaining({ promoteTo: PieceName.Queen })],
        }),
        expect.objectContaining({
          location: "R8F7",
          pieceDeltas: [expect.objectContaining({ promoteTo: PieceName.Rook })],
        }),
        expect.objectContaining({
          location: "R8F7",
          pieceDeltas: [expect.objectContaining({ promoteTo: PieceName.Bishop })],
        }),
        expect.objectContaining({
          location: "R8F7",
          pieceDeltas: [expect.objectContaining({ promoteTo: PieceName.Knight })],
        }),
      ])
    );

    // White pawn takes G8, promoting to Rook
    gameMaster.filterAllowableMoves((move): boolean =>
      move.pieceDeltas.some((delta) => delta.promoteTo === PieceName.Rook)
    );
    expect(board.getPiecesAt("R8F7")).toEqual([
      expect.objectContaining({ name: PieceName.Rook }),
    ]);
  });
});
