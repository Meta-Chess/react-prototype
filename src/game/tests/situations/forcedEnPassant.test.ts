import { toLocation } from "utilities";
import { GameMaster } from "game/GameMaster";
import { calculateGameOptions } from "game/variantAndRuleProcessing/calculateGameOptions";
import { PlayerName } from "game/types";

describe("With forced en passant chess", () => {
  it("Capturing only the rook is not possible, when intercepting castling with no-check", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({
        gameOptions: calculateGameOptions({ checkEnabled: false }, ["forcedEnPassant"]),
      })
    );
    const board = gameMaster.game.board;

    // White pawn to E4
    gameMaster.handleSquarePressed(toLocation({ rank: 2, file: 5 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 5 })).length).toEqual(1);

    // Black pawn to B6
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 2 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 2 }));
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 2 })).length).toEqual(1);

    // White bishop to C4
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 6 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 3 }));
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 3 })).length).toEqual(1);

    // Black bishop to A6
    gameMaster.handleSquarePressed(toLocation({ rank: 8, file: 3 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 1 }));
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 1 })).length).toEqual(1);

    // White knight to F3
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 7 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 3, file: 6 }));
    expect(board.getPiecesAt(toLocation({ rank: 3, file: 6 })).length).toEqual(1);

    // Black bishop captures on C4, preparing to intercept castling
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 1 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 3 }));
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 3 })).length).toEqual(1);

    // White castles short
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 5 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 7 }));
    expect(board.getPiecesAt(toLocation({ rank: 1, file: 7 })).length).toEqual(1);
    expect(board.getPiecesAt(toLocation({ rank: 1, file: 6 })).length).toEqual(1);

    // Black bishop will only have one move, to intercept castling
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 3 }));
    // This move has 2 captures
    expect(gameMaster.allowableMoves.length).toEqual(1);
    expect(gameMaster.allowableMoves[0]?.captures?.length).toEqual(2);
    // Verify the move captures the king
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 6 }));
    expect(board.getPiecesAt(toLocation({ rank: 1, file: 6 })).length).toEqual(1);
    expect(board.getPiecesAt(toLocation({ rank: 1, file: 7 })).length).toEqual(0);
  });
  it("If the king is under attack, and there is an en passant move that does not prevent king loss, it will be checkmate", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({
        gameOptions: calculateGameOptions({ checkEnabled: true }, ["forcedEnPassant"]),
      })
    );

    // White pawn to F4, this pawn will be allowed to en passant
    gameMaster.handleSquarePressed(toLocation({ rank: 2, file: 6 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 6 }));

    // Black passing moves, pawn to A6
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 1 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 1 }));

    // White king to F2, king is moving into position to be attacked by black playing E5
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 5 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 2, file: 6 }));

    // Black pawn to A5
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 1 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 1 }));

    // White king to G3
    gameMaster.handleSquarePressed(toLocation({ rank: 2, file: 6 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 3, file: 7 }));

    // Black pawn to A4
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 1 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 1 }));

    // White king to H4, king is in position
    gameMaster.handleSquarePressed(toLocation({ rank: 3, file: 7 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 8 }));

    // Black pawn to B6
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 2 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 2 }));

    // White pawn to F5, this pawn will be able to en passant E5
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 6 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 6 }));

    // Black pawn to E5!
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 5 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 5 }));
    // This is checkmate!
    // as the white king is under attack, but white must en passant
    expect(gameMaster.gameOver).toEqual(true);
    expect(gameMaster.game.alivePlayers().length).toEqual(1);
    expect(gameMaster.game.alivePlayers()[0].name).toEqual(PlayerName.Black);
    expect(
      gameMaster.game.players.find((p) => p.name === PlayerName.White)?.endGameMessage
    ).toEqual("checkmated");
  });
});
