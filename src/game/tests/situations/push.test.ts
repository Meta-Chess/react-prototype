import { toLocation } from "utilities";
import { GameMaster } from "game/GameMaster";
import { calculateGameOptions } from "game/variantAndRuleProcessing/calculateGameOptions";
import { PieceName } from "game/types";

describe("In push chess", () => {
  let gameMaster: GameMaster;
  beforeEach(() => {
    gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({
        gameOptions: calculateGameOptions(
          {
            checkEnabled: false,
          },
          ["push"]
        ),
      })
    );
  });
  it("Given a standard starting position, a white king can push each adjacent pawn", () => {
    // Select white king at E1
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 5 }));

    // Expecting an allowable move with location at each adjacent pawn
    expect(gameMaster.allowableMoves.length).toEqual(3);
    expect.arrayContaining([
      expect.objectContaining({ location: toLocation({ rank: 2, file: 4 }) }),
      expect.objectContaining({ location: toLocation({ rank: 2, file: 5 }) }),
      expect.objectContaining({ location: toLocation({ rank: 2, file: 6 }) }),
    ]);

    // Push the pawn at F2
    gameMaster.handleSquarePressed(toLocation({ rank: 2, file: 6 }));

    // There is now a king on F2 and a pawn on G3
    const piecesAtF2 = gameMaster.game.board.getPiecesAt(
      toLocation({ rank: 2, file: 6 })
    );
    const piecesAtG3 = gameMaster.game.board.getPiecesAt(
      toLocation({ rank: 3, file: 7 })
    );
    expect(piecesAtF2.length).toEqual(1);
    expect(piecesAtG3.length).toEqual(1);
    expect(piecesAtF2[0].name).toEqual(PieceName.King);
    expect(piecesAtG3[0].name).toEqual(PieceName.Pawn);
  });
  it("Given a standard starting position, a white bishop has exactly 5 moves", () => {
    // Select white bishop at F1
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 6 }));

    // Expecting 5 allowable moves, with specific locations
    expect(gameMaster.allowableMoves.length).toEqual(5);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 2, file: 7 }) }),
        expect.objectContaining({ location: toLocation({ rank: 2, file: 5 }) }),
        expect.objectContaining({ location: toLocation({ rank: 3, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 3 }) }),
        expect.objectContaining({ location: toLocation({ rank: 5, file: 2 }) }),
      ])
    );
  });
  it("A pawn from it's starting position, with a friendly piece in front, has 2 push moves", () => {
    // Select white bishop at F1
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 6 }));

    // Push move bishop to D3, expecting a bishop on D3
    gameMaster.handleSquarePressed(toLocation({ rank: 3, file: 4 }));
    const piecesAtD3 = gameMaster.game.board.getPiecesAt(
      toLocation({ rank: 3, file: 4 })
    );
    expect(piecesAtD3.length).toEqual(1);
    expect(piecesAtD3[0].name).toEqual(PieceName.Bishop);

    // Random pawn move for black
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 8 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 8 }));

    // Select white pawn at D2
    // Expecting 2 allowable moves, at D3 and D4
    gameMaster.handleSquarePressed(toLocation({ rank: 2, file: 4 }));
    expect(gameMaster.allowableMoves.length).toEqual(2);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 3, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 4 }) }),
      ])
    );
  });
  it("Multiple pieces can be pushed", () => {
    // Move white bishop F1 to D3
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 6 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 3, file: 4 }));

    // Random pawn move for black
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 8 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 8 }));

    // Select white queen on D1, the pawn and bishop are in front of the queen
    // Expecting push moves with location at D2, D3, and D4
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 4 }));
    expect(gameMaster.allowableMoves.length).toEqual(10);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        // Pushing the pawn and bishop
        expect.objectContaining({ location: toLocation({ rank: 2, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 3, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 4 }) }),

        // Pushing the pawn on C2
        expect.objectContaining({ location: toLocation({ rank: 2, file: 3 }) }),
        expect.objectContaining({ location: toLocation({ rank: 3, file: 2 }) }),

        // Pushing the king on E1
        expect.objectContaining({ location: toLocation({ rank: 1, file: 5 }) }),

        // Queen diagonal with no push moves
        expect.objectContaining({ location: toLocation({ rank: 2, file: 5 }) }),
        expect.objectContaining({ location: toLocation({ rank: 3, file: 6 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 7 }) }),
        expect.objectContaining({ location: toLocation({ rank: 5, file: 8 }) }),
      ])
    );
  });
  it("A piece cannot be pushed off of the board", () => {
    // Select white rook on H1
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 8 }));

    // The rook can only push forward, and not horizontally push pieces off the board
    expect(gameMaster.allowableMoves.length).toEqual(4);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 2, file: 8 }) }),
        expect.objectContaining({ location: toLocation({ rank: 3, file: 8 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 8 }) }),
        expect.objectContaining({ location: toLocation({ rank: 5, file: 8 }) }),
      ])
    );
  });
  it("A piece cannot be pushed into an enemy piece", () => {
    // Move the white rook from H1 to H5, which will push the H2 pawn to H6
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 8 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 8 }));
    const piecesAtH5 = gameMaster.game.board.getPiecesAt(
      toLocation({ rank: 5, file: 8 })
    );
    const piecesAtH6 = gameMaster.game.board.getPiecesAt(
      toLocation({ rank: 6, file: 8 })
    );
    expect(piecesAtH5.length).toEqual(1);
    expect(piecesAtH6.length).toEqual(1);
    expect(piecesAtH5[0].name).toEqual(PieceName.Rook);
    expect(piecesAtH6[0].name).toEqual(PieceName.Pawn);

    // Select the black rook on H8
    gameMaster.handleSquarePressed(toLocation({ rank: 8, file: 8 }));

    // There should be no allowable moves, as the white pawn blocks the forward push
    expect(gameMaster.allowableMoves.length).toEqual(0);
  });
});

describe("In push chess, given a cylindrical board", () => {
  let gameMaster: GameMaster;
  beforeEach(() => {
    gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({
        gameOptions: calculateGameOptions(
          {
            checkEnabled: false,
          },
          ["push", "cylindrical"]
        ),
      })
    );
  });

  it("A white rook can initially only push forwards and not horizontally", () => {
    // Select white rook on H1
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 8 }));

    // The rook can only push forward, and not horizontally despite the cylindrical board
    expect(gameMaster.allowableMoves.length).toEqual(4);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 2, file: 8 }) }),
        expect.objectContaining({ location: toLocation({ rank: 3, file: 8 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 8 }) }),
        expect.objectContaining({ location: toLocation({ rank: 5, file: 8 }) }),
      ])
    );
  });
  it("A white rook can push horizontally in both directions if the king moves away from the first row", () => {
    // Move the king to the second rank
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 5 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 2, file: 5 }));

    // Pawn move for black
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 1 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 1 }));

    // Select white rook on H1
    // The rook can now push horizontally on either side thanks to cylindrical
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 8 }));
    expect(gameMaster.allowableMoves.length).toEqual(6);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        // Forward pushing moves
        expect.objectContaining({ location: toLocation({ rank: 2, file: 8 }) }),
        expect.objectContaining({ location: toLocation({ rank: 3, file: 8 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 8 }) }),
        expect.objectContaining({ location: toLocation({ rank: 5, file: 8 }) }),

        // Horizontal pushing moves
        expect.objectContaining({ location: toLocation({ rank: 1, file: 7 }) }),
        expect.objectContaining({ location: toLocation({ rank: 1, file: 1 }) }),
      ])
    );
  });
});

describe("In push chess, given the inclusion of pull", () => {
  let gameMaster: GameMaster;
  beforeEach(() => {
    gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({
        gameOptions: calculateGameOptions(
          {
            checkEnabled: false,
          },
          ["push", "pull"]
        ),
      })
    );
  });
  it("It is possible to make moves which push and pull simultaneously", () => {
    // Moving the white queen from D1 to D3 via push
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 4 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 3, file: 4 }));

    // Non-consequential move for black (rook push from H8 to H7)
    gameMaster.handleSquarePressed(toLocation({ rank: 8, file: 8 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 8 }));

    // Moving the white pawn from C2 to C4 while pulling the bishop,
    // so that the bishop is in a chain with 4 diagonally adjacent pieces
    gameMaster.handleSquarePressed(toLocation({ rank: 2, file: 3 }));
    const pullMove = gameMaster.allowableMoves.find(
      (move) => move.location === "R4F3" && move.pieceDeltas.length === 2
    );
    gameMaster.unselectAllPieces();
    gameMaster.game.doMove(pullMove);
    // Bishop should now be at C3
    const pieces = gameMaster.game.board.getPiecesAt(toLocation({ rank: 3, file: 3 }));
    expect(pieces.length).toEqual(1);
    expect(pieces[0].name).toEqual(PieceName.Bishop);

    // Non-consequential move for black (bishop push from C8 to D7)
    gameMaster.handleSquarePressed(toLocation({ rank: 8, file: 3 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 4 }));

    // Selecting the bishop on C3
    gameMaster.handleSquarePressed(toLocation({ rank: 3, file: 3 }));
    // Splitting up moves by how many pieces are moving
    const movingJustBishop = gameMaster.allowableMoves.filter(
      (move) => move.pieceDeltas.length === 1
    );
    expect(movingJustBishop.length).toEqual(3);
    expect(movingJustBishop).toEqual(
      expect.arrayContaining([
        // NW Direction
        expect.objectContaining({ location: toLocation({ rank: 5, file: 1 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 2 }) }),
        // SE Direction
        expect.objectContaining({ location: toLocation({ rank: 2, file: 4 }) }),
      ])
    );

    const moving2Pieces = gameMaster.allowableMoves.filter(
      (move) => move.pieceDeltas.length === 2
    );
    expect(moving2Pieces.length).toEqual(2);
    expect(moving2Pieces).toEqual(
      expect.arrayContaining([
        // NE Direction
        expect.objectContaining({ location: toLocation({ rank: 4, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 5, file: 5 }) }),
      ])
    );

    const moving3Pieces = gameMaster.allowableMoves.filter(
      (move) => move.pieceDeltas.length === 3
    );
    expect(moving3Pieces.length).toEqual(2);
    expect(moving3Pieces).toEqual(
      expect.arrayContaining([
        // NE Direction
        expect.objectContaining({ location: toLocation({ rank: 4, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 5, file: 5 }) }),
      ])
    );

    const moving4Pieces = gameMaster.allowableMoves.filter(
      (move) => move.pieceDeltas.length === 4
    );
    expect(moving4Pieces.length).toEqual(2);
    expect(moving4Pieces).toEqual(
      expect.arrayContaining([
        // NE Direction
        expect.objectContaining({ location: toLocation({ rank: 4, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 5, file: 5 }) }),
      ])
    );

    // Moving the most pieces the furthest distance
    const bigMove = moving4Pieces.filter((move) => move.location === "R5F5")[0];
    gameMaster.unselectAllPieces();
    gameMaster.game.doMove(bigMove);
    // Pieces have moved
    const piecesAtA1 = gameMaster.game.board.getPiecesAt(
      toLocation({ rank: 1, file: 1 })
    );
    expect(piecesAtA1.length).toEqual(0);
    const piecesAtB2 = gameMaster.game.board.getPiecesAt(
      toLocation({ rank: 2, file: 2 })
    );
    expect(piecesAtB2.length).toEqual(0);

    const piecesAtC3 = gameMaster.game.board.getPiecesAt(
      toLocation({ rank: 3, file: 3 })
    );
    expect(piecesAtC3.length).toEqual(1);
    expect(piecesAtC3[0].name).toEqual(PieceName.Rook);

    const piecesAtD4 = gameMaster.game.board.getPiecesAt(
      toLocation({ rank: 4, file: 4 })
    );
    expect(piecesAtD4.length).toEqual(1);
    expect(piecesAtD4[0].name).toEqual(PieceName.Pawn);

    const piecesAtE5 = gameMaster.game.board.getPiecesAt(
      toLocation({ rank: 5, file: 5 })
    );
    expect(piecesAtE5.length).toEqual(1);
    expect(piecesAtE5[0].name).toEqual(PieceName.Bishop);

    const piecesAtF6 = gameMaster.game.board.getPiecesAt(
      toLocation({ rank: 4, file: 4 })
    );
    expect(piecesAtF6.length).toEqual(1);
    expect(piecesAtF6[0].name).toEqual(PieceName.Pawn);
  });
});

describe("In push chess, given an empty center", () => {
  let gameMaster: GameMaster;
  beforeEach(() => {
    gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({
        gameOptions: calculateGameOptions(
          {
            checkEnabled: false,
          },
          ["push", "emptyCenter"]
        ),
      })
    );
  });
  it("Pieces cannot be pushed over, but not into the center", () => {
    // Moving the white bishop from F1 to G2, onto the long diagonal
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 6 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 2, file: 7 }));

    // Passing move for black
    gameMaster.handleSquarePressed(toLocation({ rank: 8, file: 8 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 8 }));

    // Moving the white pawn from F2 to F3, so that it can be pushed by the bishop
    gameMaster.handleSquarePressed(toLocation({ rank: 2, file: 6 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 3, file: 6 }));

    // Moving a pawn so that there is more space on the other side of the long diagonal
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 2 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 2 }));

    // Selecting the bishop on G2
    gameMaster.handleSquarePressed(toLocation({ rank: 2, file: 7 }));
    // There are no moves that push the pawn on F3 into the center
    expect(gameMaster.allowableMoves.length).toEqual(2);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        // Moving the bishop back to its original position
        expect.objectContaining({ location: toLocation({ rank: 1, file: 6 }) }),
        // Pushing the pawn over the center
        expect.objectContaining({ location: toLocation({ rank: 6, file: 3 }) }),
      ])
    );
  });
});
