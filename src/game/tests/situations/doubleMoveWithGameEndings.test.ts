import { toLocation } from "utilities";
import { GameMaster } from "game/GameMaster";
import type { Board } from "game/Board";
import { calculateGameOptions } from "game/variantAndRuleProcessing/calculateGameOptions";
import { createPiece } from "game/CompactRules/utilities";
import { PieceName, PlayerName } from "game/types";
import { Path } from "game/Pather";
import { FutureVariantName } from "game/variants";

function initGameMasterAndBoard(variants: FutureVariantName[]): {
  gameMaster: GameMaster;
  board: Board;
} {
  const gameMaster = new GameMaster(
    ...GameMaster.processConstructorInputs({
      gameOptions: calculateGameOptions({ checkEnabled: false }, variants),
    })
  );
  return {
    gameMaster,
    board: gameMaster.game.board,
  };
}

describe("In double turn chess", () => {
  let { gameMaster, board } = initGameMasterAndBoard(["doubleMove"]);
  beforeEach(() => {
    ({ gameMaster, board } = initGameMasterAndBoard(["doubleMove"]));
  });

  it("White moves twice, then black moves twice, then white moves twice again", () => {
    // White move 1 - E4
    gameMaster.handleSquarePressed(toLocation({ rank: 2, file: 5 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 2, file: 5 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 5 })).length).toEqual(1);

    // White move 2 - E5
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 5 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 5 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 5 })).length).toEqual(1);

    // Black move 1 - D6
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 4 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 4 }));
    expect(board.getPiecesAt(toLocation({ rank: 7, file: 4 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 4 })).length).toEqual(1);

    // Black move 2 - xE5
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 4 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 4 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 5 })).length).toEqual(1);

    // White move 3 - A4
    gameMaster.handleSquarePressed(toLocation({ rank: 2, file: 1 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 1 }));
    expect(board.getPiecesAt(toLocation({ rank: 2, file: 1 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 1 })).length).toEqual(1);

    // White move 4 - H4
    gameMaster.handleSquarePressed(toLocation({ rank: 2, file: 8 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 8 }));
    expect(board.getPiecesAt(toLocation({ rank: 2, file: 8 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 8 })).length).toEqual(1);
  });

  it("En-passant is only possible on the next turn, and not possible via a double turn", () => {
    // White move 1 - E4
    gameMaster.handleSquarePressed(toLocation({ rank: 2, file: 5 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 2, file: 5 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 5 })).length).toEqual(1);

    // White move 2 - E5
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 5 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 5 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 5 })).length).toEqual(1);

    // Black wastes moves - A6, A5
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 1 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 1 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 1 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 1 }));

    // White prepares the C pawn - C4
    gameMaster.handleSquarePressed(toLocation({ rank: 2, file: 3 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 3 }));
    expect(board.getPiecesAt(toLocation({ rank: 2, file: 3 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 3 })).length).toEqual(1);

    // White wastes a move -  A3
    gameMaster.handleSquarePressed(toLocation({ rank: 2, file: 1 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 3, file: 1 }));

    // Black move 1 - F5 would be vulnerable to en-passant, but will expire before white's first move
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 6 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 6 }));
    expect(board.getPiecesAt(toLocation({ rank: 7, file: 6 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 6 })).length).toEqual(1);

    // Black move 2 - D5 vulnerable to en-passant
    gameMaster.handleSquarePressed(toLocation({ rank: 7, file: 4 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 4 }));
    expect(board.getPiecesAt(toLocation({ rank: 7, file: 4 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 4 })).length).toEqual(1);

    // Select white pawn at E5, can only en-passant the D pawn
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(2);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 6, file: 5 }) }), // moving forwards
        expect.objectContaining({ location: toLocation({ rank: 6, file: 4 }) }), // en-passant D pawn
      ])
    );

    // White moves the C pawn again
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 3 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 3 }));
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 3 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 3 })).length).toEqual(1);

    // Now no en-passant is possible with the pawn at E5
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 6, file: 5 }) }), // moving forwards
      ])
    );

    // Also no en-passant is possible with the C pawn (it could capture the capture token if it were there)
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 3 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: toLocation({ rank: 6, file: 3 }) }), // moving forwards
      ])
    );
  });
});

describe("In double turn chess, when ending a game via king capture", () => {
  let { gameMaster, board } = initGameMasterAndBoard(["doubleMove"]);
  beforeEach(() => {
    ({ gameMaster, board } = initGameMasterAndBoard(["doubleMove"]));

    // Killing all pieces other than kings
    board
      .getLocations()
      .filter((location) => !["R1F5", "R8F5"].includes(location))
      .forEach((location) => board.killPiecesAt({ piecesLocation: location }));

    // This hasn't ended the game
    expect(gameMaster.gameOver).toEqual(false);

    // Displacing kings so they are at the center
    board.displace({
      // White king
      pieceId: board.getPiecesAt("R1F5")[0].id,
      path: new Path("R1F5", ["R4F4"]),
    });
    board.displace({
      // Black king
      pieceId: board.getPiecesAt("R8F5")[0].id,
      path: new Path("R8F5", ["R5F5"]),
    });
  });

  it("A win is recognized on a players first turn", () => {
    // White king captures black king immediately
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 4 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 4 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 5 })).length).toEqual(1);

    // Game is over
    expect(gameMaster.gameOver).toEqual(true);
    expect(gameMaster.game.alivePlayers().length).toEqual(1);
    expect(gameMaster.game.alivePlayers()[0].name).toEqual(PlayerName.White);
    expect(
      gameMaster.game.players.find((p) => p.name === PlayerName.Black)?.endGameMessage
    ).toEqual("lost their king");
  });

  it("A win is recognized on a players second turn", () => {
    // White king takes a step
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 4 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 4 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 5 })).length).toEqual(1);

    // White king captures black king on second move
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 5 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 5 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 5 })).length).toEqual(1);

    // Game is over
    expect(gameMaster.gameOver).toEqual(true);
    expect(gameMaster.game.alivePlayers().length).toEqual(1);
    expect(gameMaster.game.alivePlayers()[0].name).toEqual(PlayerName.White);
    expect(
      gameMaster.game.players.find((p) => p.name === PlayerName.Black)?.endGameMessage
    ).toEqual("lost their king");
  });
});

describe("In double turn chess, when ending a game via stalemate", () => {
  let { gameMaster, board } = initGameMasterAndBoard([
    "doubleMove",
    "brick",
    "chemicallyExcitedKnight",
  ]);
  beforeEach(() => {
    ({ gameMaster, board } = initGameMasterAndBoard([
      "doubleMove",
      "brick",
      "chemicallyExcitedKnight",
    ]));

    // Killing all pieces other than kings
    board
      .getLocations()
      .filter((location) => !["R1F5", "R8F5"].includes(location))
      .forEach((location) => board.killPiecesAt({ piecesLocation: location }));

    // Give white a chemically excited knight at R5F7
    // it can jump to R4F5 in one move; or to R4F6 in two moves, R6F5 > R4F6
    board.addPiece({
      piece: createPiece({ owner: PlayerName.White, name: PieceName.Knight }),
      location: toLocation({ rank: 5, file: 7 }),
    });

    // Surround white king with black brick rooks
    // add pawns that trigger the chem knight at R4F5 and R4F6
    // R5F3, R3F3, R3F7 for R4F5; R2F7, R3F4, R3F8 for R4F6
    ["R1F4", "R1F6", "R2F4", "R2F5", "R2F6"].map((location) => {
      board.addPiece({
        piece: createPiece({ owner: PlayerName.Black, name: PieceName.Rook }),
        location,
      });
    });
    ["R5F3", "R3F3", "R3F7", "R2F7", "R3F4", "R3F8"].map((location) => {
      board.addPiece({
        piece: createPiece({ owner: PlayerName.Black, name: PieceName.Pawn }),
        location,
      });
    });

    // This hasn't ended the game
    expect(gameMaster.gameOver).toEqual(false);
  });

  it("A draw is recognized on a players first turn", () => {
    // White knight at R5F7 moves to R4F5
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 7 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 7 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 5 })).length).toEqual(0); // knight has exploded

    // Game is over
    expect(gameMaster.gameOver).toEqual(true);
    expect(gameMaster.game.alivePlayers().length).toEqual(0);
    expect(
      gameMaster.game.players.find((p) => p.name === PlayerName.White)?.endGameMessage
    ).toEqual("had no legal moves");
    expect(
      gameMaster.game.players.find((p) => p.name === PlayerName.Black)?.endGameMessage
    ).toEqual("stalemated");
  });

  it("A draw is recognized on a players second turn", () => {
    // White knight at R5F7 moves to R6F5 then to R4F6
    gameMaster.handleSquarePressed(toLocation({ rank: 5, file: 7 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 5 }));
    expect(board.getPiecesAt(toLocation({ rank: 5, file: 7 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 5 })).length).toEqual(1);
    gameMaster.handleSquarePressed(toLocation({ rank: 6, file: 5 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 4, file: 6 }));
    expect(board.getPiecesAt(toLocation({ rank: 6, file: 5 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 4, file: 6 })).length).toEqual(0); // knight has exploded

    // Black now moves the rook back and forth
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 4 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 3 }));
    expect(board.getPiecesAt(toLocation({ rank: 1, file: 4 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 1, file: 3 })).length).toEqual(1);
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 3 }));
    gameMaster.handleSquarePressed(toLocation({ rank: 1, file: 4 }));
    expect(board.getPiecesAt(toLocation({ rank: 1, file: 3 })).length).toEqual(0);
    expect(board.getPiecesAt(toLocation({ rank: 1, file: 4 })).length).toEqual(1);

    // Game is over (recognized after blacks second sub-move)
    expect(gameMaster.gameOver).toEqual(true);
    expect(gameMaster.game.alivePlayers().length).toEqual(0);
    expect(
      gameMaster.game.players.find((p) => p.name === PlayerName.White)?.endGameMessage
    ).toEqual("had no legal moves");
    expect(
      gameMaster.game.players.find((p) => p.name === PlayerName.Black)?.endGameMessage
    ).toEqual("stalemated");
  });
});
