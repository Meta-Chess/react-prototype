import { toLocation } from "utilities";
import { GameMaster } from "game/GameMaster";
import { calculateGameOptions } from "game/variantAndRuleProcessing/calculateGameOptions";
import { PieceName, PlayerName } from "game/types";

describe("Given interception", () => {
  let gameMaster: GameMaster;
  beforeEach(() => {
    gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({
        gameOptions: calculateGameOptions(
          {
            checkEnabled: false,
          },
          []
        ),
      })
    );
  });
  it("A king castling through an opposing bishop attack with no-check can be optionally intercepted", () => {
    // White pawn to E4
    gameMaster.handleSquarePressed(toLocation({ rank: 2, file: 5 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 5 }));

    // Black pawn to B6
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 2 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 2 }));

    // White bishop to A6
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 6 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 1 }));

    // Black bishop captures on A6, is now attacking the castling path at F1
    gameMaster.handleSquarePressed(toLocation({ rank: 8, file: 3 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 1 }));

    // White knight to F3, white now free to castle
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 7 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 3, file: 6 }));

    // Black passing move pawn to H6
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 8 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 8 }));

    // White castles kingside
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 5 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 7 }));
    // Verify rook at F1
    expect(
      gameMaster.game.board.getPiecesAt(toLocation({ rank: 1, file: 6 })).length
    ).toEqual(1);
    const whiteRook = gameMaster.game.board.getPiecesAt(
      toLocation({ rank: 1, file: 6 })
    )[0];
    expect(whiteRook.name).toEqual(PieceName.Rook);
    // Verify king at G1
    expect(
      gameMaster.game.board.getPiecesAt(toLocation({ rank: 1, file: 7 })).length
    ).toEqual(1);
    const whiteKing = gameMaster.game.board.getPiecesAt(
      toLocation({ rank: 1, file: 7 })
    )[0];
    expect(whiteKing.name).toEqual(PieceName.King);

    // Black bishop can capture either just the rook, or the rook and the king
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 1 }));
    const captureMoves = gameMaster.allowableMoves.filter(
      (move) => (move?.captures?.length || 0) > 0
    );
    expect(captureMoves.length).toEqual(2);
    const rookCapture = captureMoves.filter(
      (move) => (move?.captures?.length || 0) === 1
    )[0];
    expect(rookCapture.captures?.[0]?.pieceIds[0]).toEqual(whiteRook.id);

    const rookAndKingCapture = captureMoves.filter(
      (move) => (move?.captures?.length || 0) === 2
    )[0];
    expect(rookAndKingCapture.captures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ at: "R1F6", pieceIds: [whiteRook.id] }),
        expect.objectContaining({ at: "R1F6", pieceIds: [whiteKing.id] }),
      ])
    );

    // Capturing the rook and the king
    gameMaster.unselectAllPieces();
    gameMaster.game.doMove(rookAndKingCapture);
    // Bishop should now be at F1
    const piecesAtF1 = gameMaster.game.board.getPiecesAt(
      toLocation({ rank: 1, file: 6 })
    );
    expect(piecesAtF1.length).toEqual(1);
    expect(piecesAtF1[0].name).toEqual(PieceName.Bishop);
    expect(piecesAtF1[0].owner).toEqual(PlayerName.Black);
    // No king on G1
    const piecesAtG1 = gameMaster.game.board.getPiecesAt(
      toLocation({ rank: 1, file: 7 })
    );
    expect(piecesAtG1.length).toEqual(0);
  });
});
