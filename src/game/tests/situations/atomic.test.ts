import { toLocation } from "utilities";
import { GameMaster } from "game/GameMaster";
import { calculateGameOptions } from "game/variantAndRuleProcessing/calculateGameOptions";
import { Board } from "game/Board";
import { AnimationType, PieceName, TokenName } from "game/types";

const mockCaptureConsequence = jest.fn();

describe("With atomic enabled", () => {
  it("pieces should blow up on capture", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({
        gameOptions: calculateGameOptions(
          {
            checkEnabled: false,
            ruleNamesWithParams: {
              atomic: { BOOM: 2, ["Immune Pieces"]: [[PieceName.Pawn]] },
            },
          },
          ["atomic", "cylindrical"]
        ),
      })
    );
    const board = gameMaster.game.board;

    gameMaster.game.events.subscribe({
      name: "capture",
      consequence: mockCaptureConsequence,
    });

    // White pawn to E3
    gameMaster.handleSquarePressed(toLocation({ rank: 2, file: 5 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 3, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 3, file: 5 })).length).toEqual(1);

    // Black pawn to D6
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 4 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 4 }));
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 4 })).length).toEqual(1);

    // White queen to B7 - explosion
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 4 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 2 }));
    expect(mockCaptureConsequence).toHaveBeenCalledTimes(1);

    // Pieces (other than pawns) should have died in the explosion radius
    expect(board.getPiecesAt(toLocation({ rank: 8, file: 1 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 8, file: 2 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 8, file: 3 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 7, file: 1 })).length).toEqual(1);
    expect(board.getPiecesAt(toLocation({ rank: 7, file: 2 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 7, file: 3 })).length).toEqual(1);
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 1 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 2 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 3 })).length).toEqual(0);

    // Visual tokens should have been placed in the explosion area, and not elsewhere
    expectExplosionVisualAt({ rank: 8, file: 1 }, board);
    expectExplosionVisualAt({ rank: 8, file: 2 }, board);
    expectExplosionVisualAt({ rank: 8, file: 3 }, board);
    // expectExplosionVisualAt({ rank: 7, file: 1 }, board); Pawn here
    expectExplosionVisualAt({ rank: 7, file: 2 }, board);
    // expectExplosionVisualAt({ rank: 7, file: 3 }, board); Pawn here
    expectExplosionVisualAt({ rank: 6, file: 1 }, board);
    expectExplosionVisualAt({ rank: 6, file: 2 }, board);
    expectExplosionVisualAt({ rank: 6, file: 3 }, board);
  });
});

function expectExplosionVisualAt(
  { rank, file }: { rank: number; file: number },
  board: Board
): void {
  expect(
    board.squareAt(toLocation({ rank, file }))?.tokensWithName(TokenName.AnimationToken)
  ).toEqual([
    expect.objectContaining({
      data: expect.objectContaining({ type: AnimationType.explosion }),
    }),
  ]);
}
