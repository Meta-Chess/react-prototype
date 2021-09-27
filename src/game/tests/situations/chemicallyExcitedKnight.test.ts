import { toLocation } from "utilities";
import { GameMaster } from "game/GameMaster";
import { calculateGameOptions } from "game/variantAndRuleProcessing/calculateGameOptions";
import { Board } from "game/Board";
import { AnimationType, PieceAnimationType, TokenName } from "game/types";

describe("With chemically excited knights", () => {
  it("explosions kill all pieces (and create some animations)", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({
        gameOptions: calculateGameOptions({ checkEnabled: false }, [
          "chemicallyExcitedKnight",
        ]),
      })
    );
    const board = gameMaster.game.board;

    // Move white knight to F3
    gameMaster.handleSquarePressed("R1F7");
    gameMaster.handleSquarePressed("R3F6");
    expect(board.getPiecesAt("R3F6").length).toEqual(1);

    // Move black pawn to E6
    gameMaster.handleSquarePressed("R7F5");
    gameMaster.handleSquarePressed("R6F5");
    expect(board.getPiecesAt("R6F5").length).toEqual(1);

    // Move white pawn to A3
    gameMaster.handleSquarePressed("R2F1");
    gameMaster.handleSquarePressed("R3F1");
    expect(board.getPiecesAt("R3F1").length).toEqual(1);

    // Move black bishop to D6
    gameMaster.handleSquarePressed("R8F6");
    gameMaster.handleSquarePressed("R6F4");
    expect(board.getPiecesAt("R6F4").length).toEqual(1);

    // Move white pawn to A4
    gameMaster.handleSquarePressed("R3F1");
    gameMaster.handleSquarePressed("R4F1");
    expect(board.getPiecesAt("R4F1").length).toEqual(1);

    // Move black pawn to C6
    gameMaster.handleSquarePressed("R7F3");
    gameMaster.handleSquarePressed("R6F3");
    expect(board.getPiecesAt("R6F3").length).toEqual(1);

    // Move white knight to E5
    // This will trigger the knight
    gameMaster.handleSquarePressed("R3F6");
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: "R5F7" }),
        expect.objectContaining({ location: "R5F5" }),
        expect.objectContaining({ location: "R4F8" }),
        expect.objectContaining({ location: "R1F7" }),
        expect.objectContaining({ location: "R4F4" }),
      ])
    );
    expect(gameMaster.allowableMoves.length).toEqual(5);
    gameMaster.handleSquarePressed("R5F5");

    expect(board.getPiecesAt(toLocation({ rank: 5, file: 5 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 5 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 4 })).length).toEqual(0);
    expectTokensAt({ rank: 5, file: 5 }, board, [animationToken, pieceVisualToken]);
    expectTokensAt({ rank: 6, file: 5 }, board, [animationToken, pieceVisualToken]);
    expectTokensAt({ rank: 6, file: 4 }, board, [animationToken, pieceVisualToken]);
    expectTokensAt({ rank: 6, file: 6 }, board, [animationToken]);
    expectTokensAt({ rank: 4, file: 4 }, board, [animationToken]);
    expectTokensAt({ rank: 4, file: 5 }, board, [animationToken]);
    expectTokensAt({ rank: 4, file: 6 }, board, [animationToken]);
    expectTokensAt({ rank: 5, file: 4 }, board, [animationToken]);
    expectTokensAt({ rank: 5, file: 6 }, board, [animationToken]);
  });

  it("multiple knights can be triggered at the same time (and create overlapping animations)", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({
        gameOptions: calculateGameOptions({ checkEnabled: false }, [
          "chemicallyExcitedKnight",
        ]),
      })
    );
    const board = gameMaster.game.board;

    // Move white knight to F3
    gameMaster.handleSquarePressed("R1F7");
    gameMaster.handleSquarePressed("R3F6");
    expect(board.getPiecesAt("R3F6").length).toEqual(1);

    // Move black pawn to E5
    gameMaster.handleSquarePressed("R7F5");
    gameMaster.handleSquarePressed("R5F5");
    expect(board.getPiecesAt("R5F5").length).toEqual(1);

    // Move white knight to C3
    gameMaster.handleSquarePressed("R1F2");
    gameMaster.handleSquarePressed("R3F3");
    expect(board.getPiecesAt("R3F3").length).toEqual(1);

    // Move black pawn to D5
    gameMaster.handleSquarePressed("R7F4");
    gameMaster.handleSquarePressed("R5F4");
    expect(board.getPiecesAt("R5F4").length).toEqual(1);

    // Move white knight to E4
    gameMaster.handleSquarePressed("R3F3");
    gameMaster.handleSquarePressed("R4F5");
    expect(board.getPiecesAt("R4F5").length).toEqual(1);

    // Move black pawn to D4
    gameMaster.handleSquarePressed("R5F4");
    gameMaster.handleSquarePressed("R4F4");
    expect(board.getPiecesAt("R4F4").length).toEqual(1);

    // Move white pawn to A3
    gameMaster.handleSquarePressed("R2F1");
    gameMaster.handleSquarePressed("R3F1");
    expect(board.getPiecesAt("R3F1").length).toEqual(1);

    // Move black pawn to C5
    gameMaster.handleSquarePressed("R7F3");
    gameMaster.handleSquarePressed("R5F3");
    expect(board.getPiecesAt("R5F3").length).toEqual(1);

    // Move white pawn to A4
    gameMaster.handleSquarePressed("R3F1");
    gameMaster.handleSquarePressed("R4F1");
    expect(board.getPiecesAt("R4F1").length).toEqual(1);

    // Move black queen to D6
    gameMaster.handleSquarePressed("R8F4");
    gameMaster.handleSquarePressed("R6F4");
    expect(board.getPiecesAt("R6F4").length).toEqual(1);

    // Move white pawn to A5
    gameMaster.handleSquarePressed("R4F1");
    gameMaster.handleSquarePressed("R5F1");
    expect(board.getPiecesAt("R5F1").length).toEqual(1);

    // Move black bishop to G4
    gameMaster.handleSquarePressed("R8F3");
    gameMaster.handleSquarePressed("R4F7");
    expect(board.getPiecesAt("R4F7").length).toEqual(1);

    // Move white pawn to A6
    gameMaster.handleSquarePressed("R5F1");
    gameMaster.handleSquarePressed("R6F1");
    expect(board.getPiecesAt("R6F1").length).toEqual(1);

    // The knights have not yet been triggered, attacking 2 pieces each
    expect(board.getPiecesAt("R4F5").length).toEqual(1);
    expect(board.getPiecesAt("R3F6").length).toEqual(1);

    // Move black pawn to G5
    // This will trigger both white knights
    gameMaster.handleSquarePressed("R7F7");
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: "R6F7" }),
        expect.objectContaining({ location: "R5F7" }),
      ])
    );
    expect(gameMaster.allowableMoves.length).toEqual(2);
    gameMaster.handleSquarePressed("R5F7");
    expect(board.getPiecesAt("R5F7").length).toEqual(1);

    // All pieces in range are destroyed
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 5 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 4 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 5 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 7 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 3, file: 6 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 2, file: 5 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 2, file: 6 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 2, file: 7 })).length).toEqual(0);
    // Overlapping range should have 2 animation tokens
    expectTokensAt({ rank: 5, file: 4 }, board, [animationToken]);
    expectTokensAt({ rank: 5, file: 5 }, board, [animationToken, pieceVisualToken]);
    expectTokensAt({ rank: 5, file: 6 }, board, [animationToken]);
    expectTokensAt({ rank: 4, file: 4 }, board, [animationToken, pieceVisualToken]);
    expectTokensAt({ rank: 4, file: 5 }, board, [
      animationToken,
      animationToken,
      pieceVisualToken,
    ]);
    expectTokensAt({ rank: 4, file: 6 }, board, [animationToken, animationToken]);
    expectTokensAt({ rank: 4, file: 7 }, board, [animationToken, pieceVisualToken]);
    expectTokensAt({ rank: 3, file: 4 }, board, [animationToken]);
    expectTokensAt({ rank: 3, file: 5 }, board, [animationToken, animationToken]);
    expectTokensAt({ rank: 3, file: 6 }, board, [
      animationToken,
      animationToken,
      pieceVisualToken,
    ]);
    expectTokensAt({ rank: 3, file: 7 }, board, [animationToken]);
    expectTokensAt({ rank: 2, file: 5 }, board, [animationToken, pieceVisualToken]);
    expectTokensAt({ rank: 2, file: 6 }, board, [animationToken, pieceVisualToken]);
    expectTokensAt({ rank: 2, file: 7 }, board, [animationToken, pieceVisualToken]);
  });
});

const animationToken = expect.objectContaining({
  data: expect.objectContaining({
    type: AnimationType.explosion,
  }),
});

const pieceVisualToken = expect.objectContaining({
  data: expect.objectContaining({
    pieceVisualData: expect.objectContaining({
      pieceAnimationType: PieceAnimationType.chemicallyExcited,
    }),
  }),
});

function expectTokensAt(
  { rank, file }: { rank: number; file: number },
  board: Board,
  tokenConditions: jest.Expect[]
): void {
  expect(
    board.squareAt(toLocation({ rank, file }))?.tokensWithName(TokenName.AnimationToken)
  ).toEqual(expect.arrayContaining(tokenConditions));
  expect(
    board.squareAt(toLocation({ rank, file }))?.tokensWithName(TokenName.AnimationToken)
      .length
  ).toEqual(tokenConditions.length);
}
