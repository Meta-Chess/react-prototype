import { toLocation } from "utilities";
import { PieceName, PlayerName, TokenName } from "game/types";
import { GameMaster } from "game/GameMaster";
import { calculateGameOptions } from "game/variantAndRuleProcessing/calculateGameOptions";

describe("with crazyhouse", () => {
  it("a captured piece can be played to free squares on the board, pawn gaits become friendly", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs(
        calculateGameOptions({ checkEnabled: true }, ["crazyhouse"])
      )
    );
    const board = gameMaster.game.board;

    gameMaster.onPress(toLocation({ rank: 2, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 4, file: 5 })); // White pawn to E4
    expect(board.getPiecesAt("R4F5").length).toEqual(1);
    gameMaster.onPress(toLocation({ rank: 7, file: 4 }));
    gameMaster.onPress(toLocation({ rank: 5, file: 4 })); // Black pawn to D5
    expect(board.getPiecesAt("R5F4").length).toEqual(1);
    gameMaster.onPress(toLocation({ rank: 4, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 5, file: 4 })); // White pawn capture at D5
    expect(board.getPiecesAt("R5F4").length).toEqual(1);

    // Expecting pawn in white piece bank
    const whitePawnId = board.getPiecesAt("gpb0")[0].id;
    expect(board.getPiecesAt("gpb0").length).toEqual(1);
    expect(board.getPiecesAt("gpb0").map((piece) => piece.name)).toEqual(
      expect.arrayContaining([PieceName.Pawn])
    );
    // Expecting black piece bank empty
    expect(board.getPiecesAt("gpb1").length).toEqual(0);
    // Expecting graveyard empty
    expect(board.getPiecesAt("g").length).toEqual(0);

    gameMaster.onPress(toLocation({ rank: 8, file: 4 }));
    gameMaster.onPress(toLocation({ rank: 5, file: 4 })); // Black queen capture at D5

    // Still expecting pawn in white piece bank
    expect(board.getPiecesAt("gpb0").length).toEqual(1);
    expect(board.getPiecesAt("gpb0").map((piece) => piece.name)).toEqual(
      expect.arrayContaining([PieceName.Pawn])
    );
    // Expecting pawn in black piece bank
    const blackPawnId = board.getPiecesAt("gpb1")[0].id;
    expect(board.getPiecesAt("gpb1").length).toEqual(1);
    expect(board.getPiecesAt("gpb1").map((piece) => piece.name)).toEqual(
      expect.arrayContaining([PieceName.Pawn])
    );
    // Expecting graveyard still empty
    expect(board.getPiecesAt("g").length).toEqual(0);

    gameMaster.onPress("gpb0", whitePawnId); // Selecting white pawn
    // Expecting all non-occupied squares highlighted (except for the promotion square)
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 3, file: 1 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 1 }) }),
        expect.objectContaining({ location: toLocation({ rank: 5, file: 1 }) }),
        expect.objectContaining({ location: toLocation({ rank: 6, file: 1 }) }),
        expect.objectContaining({ location: toLocation({ rank: 3, file: 2 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 2 }) }),
        expect.objectContaining({ location: toLocation({ rank: 5, file: 2 }) }),
        expect.objectContaining({ location: toLocation({ rank: 6, file: 2 }) }),
        expect.objectContaining({ location: toLocation({ rank: 3, file: 3 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 3 }) }),
        expect.objectContaining({ location: toLocation({ rank: 5, file: 3 }) }),
        expect.objectContaining({ location: toLocation({ rank: 6, file: 3 }) }),
        expect.objectContaining({ location: toLocation({ rank: 3, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 6, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 7, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 2, file: 5 }) }),
        expect.objectContaining({ location: toLocation({ rank: 3, file: 5 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 5 }) }),
        expect.objectContaining({ location: toLocation({ rank: 5, file: 5 }) }),
        expect.objectContaining({ location: toLocation({ rank: 6, file: 5 }) }),
        expect.objectContaining({ location: toLocation({ rank: 3, file: 6 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 6 }) }),
        expect.objectContaining({ location: toLocation({ rank: 5, file: 6 }) }),
        expect.objectContaining({ location: toLocation({ rank: 6, file: 6 }) }),
        expect.objectContaining({ location: toLocation({ rank: 3, file: 7 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 7 }) }),
        expect.objectContaining({ location: toLocation({ rank: 5, file: 7 }) }),
        expect.objectContaining({ location: toLocation({ rank: 6, file: 7 }) }),
        expect.objectContaining({ location: toLocation({ rank: 3, file: 8 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 8 }) }),
        expect.objectContaining({ location: toLocation({ rank: 5, file: 8 }) }),
        expect.objectContaining({ location: toLocation({ rank: 6, file: 8 }) }),
      ])
    );
    expect(gameMaster.allowableMoves.length).toEqual(33);

    gameMaster.onPress(toLocation({ rank: 4, file: 2 })); // Place pawn B4
    gameMaster.onPress("gpb1", blackPawnId); // Selecting black pawn
    // Again expecting all non-occupied squares highlighted
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 3, file: 1 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 1 }) }),
        expect.objectContaining({ location: toLocation({ rank: 5, file: 1 }) }),
        expect.objectContaining({ location: toLocation({ rank: 6, file: 1 }) }),
        expect.objectContaining({ location: toLocation({ rank: 3, file: 2 }) }),
        expect.objectContaining({ location: toLocation({ rank: 5, file: 2 }) }),
        expect.objectContaining({ location: toLocation({ rank: 6, file: 2 }) }),
        expect.objectContaining({ location: toLocation({ rank: 3, file: 3 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 3 }) }),
        expect.objectContaining({ location: toLocation({ rank: 5, file: 3 }) }),
        expect.objectContaining({ location: toLocation({ rank: 6, file: 3 }) }),
        expect.objectContaining({ location: toLocation({ rank: 3, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 6, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 7, file: 4 }) }),
        expect.objectContaining({ location: toLocation({ rank: 2, file: 5 }) }),
        expect.objectContaining({ location: toLocation({ rank: 3, file: 5 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 5 }) }),
        expect.objectContaining({ location: toLocation({ rank: 5, file: 5 }) }),
        expect.objectContaining({ location: toLocation({ rank: 6, file: 5 }) }),
        expect.objectContaining({ location: toLocation({ rank: 3, file: 6 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 6 }) }),
        expect.objectContaining({ location: toLocation({ rank: 5, file: 6 }) }),
        expect.objectContaining({ location: toLocation({ rank: 6, file: 6 }) }),
        expect.objectContaining({ location: toLocation({ rank: 3, file: 7 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 7 }) }),
        expect.objectContaining({ location: toLocation({ rank: 5, file: 7 }) }),
        expect.objectContaining({ location: toLocation({ rank: 6, file: 7 }) }),
        expect.objectContaining({ location: toLocation({ rank: 3, file: 8 }) }),
        expect.objectContaining({ location: toLocation({ rank: 4, file: 8 }) }),
        expect.objectContaining({ location: toLocation({ rank: 5, file: 8 }) }),
        expect.objectContaining({ location: toLocation({ rank: 6, file: 8 }) }),
        expect.objectContaining({ location: toLocation({ rank: 8, file: 4 }) }),
      ])
    );
    expect(gameMaster.allowableMoves.length).toEqual(33);

    gameMaster.onPress(toLocation({ rank: 5, file: 7 })); // Place pawn G5
    gameMaster.onPress(toLocation({ rank: 4, file: 2 })); // Selecting white pawn
    // Expecting gaits are normal
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 5, file: 2 }) }),
      ])
    );
    gameMaster.onPress(toLocation({ rank: 5, file: 2 })); // Moving pawn B5
    gameMaster.onPress(toLocation({ rank: 5, file: 7 })); // Selecting black pawn
    // Expecting gaits are normal
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 4, file: 7 }) }),
      ])
    );
  });

  it("atomic only stores captured piece in piece bank and the rest in graveyard + checkmate with crazyhouse pawn", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs(
        calculateGameOptions({ checkEnabled: true }, [
          "crazyhouse",
          "atomic",
          "cylindrical",
        ])
      )
    );
    const board = gameMaster.game.board;

    gameMaster.onPress(toLocation({ rank: 2, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 4, file: 5 })); // White pawn to E4
    expect(board.getPiecesAt("R4F5").length).toEqual(1);
    gameMaster.onPress(toLocation({ rank: 7, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 5, file: 5 })); // Black pawn to E5
    expect(board.getPiecesAt("R5F5").length).toEqual(1);
    gameMaster.onPress(toLocation({ rank: 1, file: 6 }));
    gameMaster.onPress(toLocation({ rank: 7, file: 8 })); // White bishop capture at H7
    expect(board.getPiecesAt("R7F8").length).toEqual(0);

    // Expecting only single pawn in white piece bank
    const pawnId = board.getPiecesAt("gpb0")[0].id;
    expect(board.getPiecesAt("gpb0").length).toEqual(1);
    expect(board.getPiecesAt("gpb0").map((piece) => piece.name)).toEqual(
      expect.arrayContaining([PieceName.Pawn])
    );
    // Expecting black piece bank empty
    expect(board.getPiecesAt("gpb1").length).toEqual(0);

    // Expecting graveyard containing remaining 4 pieces
    expect(board.getPiecesAt("g").length).toEqual(4);

    gameMaster.onPress(toLocation({ rank: 8, file: 2 }));
    gameMaster.onPress(toLocation({ rank: 6, file: 3 })); // Black knight to C6
    gameMaster.onPress("gpb0", pawnId);
    gameMaster.onPress(toLocation({ rank: 7, file: 5 })); // White crazyhouse pawn to E7

    // Expecting piece at E7
    expect(board.getPiecesAt(toLocation({ rank: 7, file: 5 })).length).toEqual(1);

    // Expecting mate for white
    expect(gameMaster.gameOver).toEqual(true);
    expect(gameMaster.game.alivePlayers().length).toEqual(1);
    expect(gameMaster.game.alivePlayers()[0].name).toEqual(PlayerName.White);
    expect(
      gameMaster.game.players.find((p) => p.name === PlayerName.Black)?.endGameMessage
    ).toEqual("checkmated");
  });

  it("pawns can not capture a piece from the piece bank in passing.", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs(
        calculateGameOptions({ checkEnabled: false }, ["crazyhouse"])
      )
    );

    gameMaster.onPress(toLocation({ rank: 1, file: 7 }));
    gameMaster.onPress(toLocation({ rank: 3, file: 6 })); // nf3
    gameMaster.onPress(toLocation({ rank: 7, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 5, file: 5 })); // e5
    gameMaster.onPress(toLocation({ rank: 3, file: 6 }));
    gameMaster.onPress(toLocation({ rank: 5, file: 5 })); // nxe5
    gameMaster.onPress(toLocation({ rank: 7, file: 4 }));

    expect(gameMaster.allowableMoves.length).toEqual(2); // pawn has no capture move;
  });

  it("pawns can't be placed in promotion zone, but non-pawn can. both can't be played in the empty center", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs(
        calculateGameOptions({ checkEnabled: false }, [
          "crazyhouse",
          "emptyCenter",
          "cylindrical",
        ])
      )
    );
    const board = gameMaster.game.board;

    gameMaster.onPress(toLocation({ rank: 2, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 3, file: 5 })); // White pawn to E3
    expect(board.getPiecesAt("R3F5").length).toEqual(1);
    gameMaster.onPress(toLocation({ rank: 7, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 6, file: 5 })); // Black pawn to E6
    expect(board.getPiecesAt("R6F5").length).toEqual(1);
    gameMaster.onPress(toLocation({ rank: 1, file: 6 }));
    gameMaster.onPress(toLocation({ rank: 7, file: 8 })); // White bishop capture at H7
    expect(board.getPiecesAt("R7F8").length).toEqual(1);
    gameMaster.onPress(toLocation({ rank: 8, file: 8 }));
    gameMaster.onPress(toLocation({ rank: 7, file: 8 })); // Black rook capture at H7
    expect(board.getPiecesAt("R7F8").length).toEqual(1);

    // Expecting a pawn in white piece bank
    const pawnId = board.getPiecesAt("gpb0")[0].id;
    expect(board.getPiecesAt("gpb0").length).toEqual(1);
    expect(board.getPiecesAt("gpb0").map((piece) => piece.name)).toEqual(
      expect.arrayContaining([PieceName.Pawn])
    );
    // Expecting a bishop in black piece bank
    const bishopId = board.getPiecesAt("gpb1")[0].id;
    expect(board.getPiecesAt("gpb1").length).toEqual(1);
    expect(board.getPiecesAt("gpb1").map((piece) => piece.name)).toEqual(
      expect.arrayContaining([PieceName.Bishop])
    );

    // Expecting no pieces in the graveyard
    expect(board.getPiecesAt("g").length).toEqual(0);

    // Expecting white pawn can be placed in any non occupied square except for the center/promotion zone.
    gameMaster.onPress("gpb0", pawnId);

    const centerLocations = [
      toLocation({ rank: 4, file: 4 }),
      toLocation({ rank: 4, file: 5 }),
      toLocation({ rank: 5, file: 4 }),
      toLocation({ rank: 5, file: 5 }),
    ];
    const promotionLocations = [toLocation({ rank: 8, file: 8 })];

    expect(gameMaster.allowableMoves.length).toEqual(29);
    expect(
      gameMaster.allowableMoves.every(
        (move) => board.squareAt(move.location)?.pieces.length === 0
      )
    ).toEqual(true);
    expect(
      gameMaster.allowableMoves.some(
        (move) =>
          centerLocations.includes(move.location) ||
          promotionLocations.includes(move.location)
      )
    ).toEqual(false);

    gameMaster.onPress(toLocation({ rank: 6, file: 1 })); // Play pawn at A6
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 1 })).length).toEqual(1); // Expecting piece at A6

    // Expecting bishop can be placed in any empty square except the center.
    gameMaster.onPress("gpb1", bishopId);
    expect(gameMaster.allowableMoves.length).toEqual(29);
    expect(
      gameMaster.allowableMoves.every(
        (move) => board.squareAt(move.location)?.pieces.length === 0
      )
    ).toEqual(true);
    expect(
      gameMaster.allowableMoves.some((move) => centerLocations.includes(move.location))
    ).toEqual(false);
  });

  it("captured backwards toroidal pawns have their gaits changed, double step tokens are cleared on capture, a played piece will start fatigued", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs(
        calculateGameOptions({ checkEnabled: false }, [
          "crazyhouse",
          "fatigue",
          "toroidal",
        ])
      )
    );
    const board = gameMaster.game.board;

    gameMaster.onPress(toLocation({ rank: 3, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 1, file: 5 })); // Doublestep backward white king pawn
    expect(board.getPiecesAt("R1F5").length).toEqual(1);
    gameMaster.onPress(toLocation({ rank: 12, file: 5 }));
    gameMaster.onPress(toLocation({ rank: 14, file: 5 })); // Doublestep backward black king pawn
    expect(board.getPiecesAt("R14F5").length).toEqual(1);
    gameMaster.onPress(toLocation({ rank: 4, file: 6 }));
    gameMaster.onPress(toLocation({ rank: 12, file: 8 })); // White bishop capture rook backwards pawn
    expect(board.getPiecesAt("R12F8").length).toEqual(1);

    // Expecting a pawn in white piece bank
    const pawnId = board.getPiecesAt("gpb0")[0].id;
    expect(board.getPiecesAt("gpb0").length).toEqual(1);
    expect(board.getPiecesAt("gpb0").map((piece) => piece.name)).toEqual(
      expect.arrayContaining([PieceName.Pawn])
    );
    // Pawn does not have tokens
    expect(board.pieces[pawnId].tokens.length).toEqual(0);

    gameMaster.onPress(toLocation({ rank: 11, file: 8 }));
    gameMaster.onPress(toLocation({ rank: 12, file: 8 })); // Rook captures bishop
    expect(board.getPiecesAt("R12F8").length).toEqual(1);

    // Expecting a bishop in black piece bank
    const bishopId = board.getPiecesAt("gpb1")[0].id;
    expect(board.getPiecesAt("gpb1").length).toEqual(1);
    expect(board.getPiecesAt("gpb1").map((piece) => piece.name)).toEqual(
      expect.arrayContaining([PieceName.Bishop])
    );
    // Bishop does not have tokens
    expect(board.pieces[bishopId].tokens.length).toEqual(0);

    gameMaster.onPress("gpb0", pawnId);
    gameMaster.onPress(toLocation({ rank: 8, file: 4 })); // Play backwards pawn in center of board
    // Expecting piece at square
    expect(board.getPiecesAt(toLocation({ rank: 8, file: 4 })).length).toEqual(1);
    // Expect a single fatigue token on the played pawn
    expect(board.pieces[pawnId].tokens.length).toEqual(1);
    expect(
      board.pieces[pawnId].tokens.every((token) => token.name === TokenName.Fatigue)
    ).toEqual(true);

    // Dummy moves timing out fatigue
    gameMaster.onPress(toLocation({ rank: 10, file: 1 }));
    gameMaster.onPress(toLocation({ rank: 9, file: 1 }));
    expect(board.getPiecesAt("R9F1").length).toEqual(1);
    gameMaster.onPress(toLocation({ rank: 5, file: 1 }));
    gameMaster.onPress(toLocation({ rank: 6, file: 1 }));
    expect(board.getPiecesAt("R6F1").length).toEqual(1);
    gameMaster.onPress(toLocation({ rank: 10, file: 8 }));
    gameMaster.onPress(toLocation({ rank: 9, file: 8 }));
    expect(board.getPiecesAt("R9F8").length).toEqual(1);

    gameMaster.onPress(toLocation({ rank: 8, file: 4 })); // Select crazyhouse played pawn

    // Expect a single move backwards
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 7, file: 4 }) }),
      ])
    );
  });
});
