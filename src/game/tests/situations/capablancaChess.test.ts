import { toLocation } from "utilities";
import { GameMaster } from "game/GameMaster";
import { PieceName } from "game/types";
import { calculateGameOptions } from "game/variantAndRuleProcessing/calculateGameOptions";

describe("In capablanca chess", () => {
  it("castling will move the king 3 spaces", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({
        gameOptions: calculateGameOptions({ checkEnabled: false }, ["capablancaChess"]),
      })
    );
    const board = gameMaster.game.board;

    // White pawn to F4
    gameMaster.handleSquarePressed(toLocation({ rank: 2, file: 6 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 6 }));
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 6 })).length).toEqual(1);

    // Passing moves for black, pawn to A6
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 1 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 1 }));
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 1 })).length).toEqual(1);

    // White bishop to F2
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 7 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 2, file: 6 }));
    expect(board.getPiecesAt(toLocation({ rank: 2, file: 6 })).length).toEqual(1);

    // Black pawn to A5
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 1 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 1 }));
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 1 })).length).toEqual(1);

    // White knight to H3
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 9 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 3, file: 8 }));
    expect(board.getPiecesAt(toLocation({ rank: 3, file: 8 })).length).toEqual(1);

    // Black pawn to A4
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 1 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 1 }));
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 1 })).length).toEqual(1);

    // White rookKnight to G3
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 8 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 3, file: 7 }));
    expect(board.getPiecesAt(toLocation({ rank: 3, file: 7 })).length).toEqual(1);

    // Black pawn to A3
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 1 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 3, file: 1 }));
    expect(board.getPiecesAt(toLocation({ rank: 3, file: 1 })).length).toEqual(1);

    // White castles king side 3 spaces
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 6 }));
    // Only has the king step and castling moves
    expect(gameMaster.allowableMoves.length).toEqual(2);
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 9 }));
    // King is on I1
    const piecesOnI1 = board.getPiecesAt(toLocation({ rank: 1, file: 9 }));
    expect(piecesOnI1.length).toEqual(1);
    expect(piecesOnI1[0].name).toEqual(PieceName.King);
    // Rook is on H1
    const piecesOnH1 = board.getPiecesAt(toLocation({ rank: 1, file: 8 }));
    expect(piecesOnH1.length).toEqual(1);
    expect(piecesOnH1[0].name).toEqual(PieceName.Rook);
  });
});
