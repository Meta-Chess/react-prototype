import { GameMaster } from "game/GameMaster";

import { Gait, PlayerName } from "game/types";
import { toLocation } from "utilities";

describe("In standard chess", () => {
  it("It should be a draw by stalemate if a player has no legal moves", () => {
    // Setup standard board
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({ gameOptions: { checkEnabled: true } })
    );

    // Make all pieces unable to move
    const board = gameMaster.game.board;
    board.getPieces().forEach((p) => {
      p.generateGaits = (): Gait[] => [];
    });

    // Forget results of hasLegalMove()
    gameMaster.game.players.forEach((p) => (p.hasLegalMoves.turn = -1));

    // Game should be stalemate
    gameMaster.checkGameEndConditions();
    expect(gameMaster.result).toEqual("Draw by stalemate!");
    expect(gameMaster.gameOver).toEqual(true);
  });
  it("After moving... It should be a draw by stalemate if a player has no legal moves", () => {
    // Setup standard board
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({ gameOptions: { checkEnabled: true } })
    );

    // Make all black pieces unable to move
    const board = gameMaster.game.board;
    board
      .getPieces()
      .filter((p) => p.owner === PlayerName.Black)
      .forEach((p) => {
        p.generateGaits = (): Gait[] => [];
      });

    // Game should be stalemate
    gameMaster.doMove();
    expect(gameMaster.result).toEqual("Draw by stalemate!");
    expect(gameMaster.gameOver).toEqual(true);
  });
});

describe("In atomic chess", () => {
  it("The following sequence of moves is stalemate", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({
        gameOptions: {
          checkEnabled: true,
          baseVariants: ["atomic"],
        },
      })
    );
    const board = gameMaster.game.board;

    // e4
    gameMaster.onPress(toLocation({ file: 5, rank: 2 }));
    gameMaster.onPress(toLocation({ file: 5, rank: 4 }));
    expect(board.getPiecesAt(toLocation({ file: 5, rank: 4 })).length).toEqual(1);

    // f5
    gameMaster.onPress(toLocation({ file: 6, rank: 7 }));
    gameMaster.onPress(toLocation({ file: 6, rank: 5 }));
    expect(board.getPiecesAt(toLocation({ file: 6, rank: 5 })).length).toEqual(1);

    // ba6
    gameMaster.onPress(toLocation({ file: 6, rank: 1 }));
    gameMaster.onPress(toLocation({ file: 1, rank: 6 }));
    expect(board.getPiecesAt(toLocation({ file: 1, rank: 6 })).length).toEqual(1);

    // xe3
    gameMaster.onPress(toLocation({ file: 6, rank: 5 }));
    gameMaster.onPress(toLocation({ file: 5, rank: 4 }));
    expect(board.getPiecesAt(toLocation({ file: 5, rank: 4 })).length).toEqual(0);

    // bxb7
    gameMaster.onPress(toLocation({ file: 1, rank: 6 }));
    gameMaster.onPress(toLocation({ file: 2, rank: 7 }));
    expect(board.getPiecesAt(toLocation({ file: 2, rank: 7 })).length).toEqual(0);

    // e6
    gameMaster.onPress(toLocation({ file: 5, rank: 7 }));
    gameMaster.onPress(toLocation({ file: 5, rank: 6 }));
    expect(board.getPiecesAt(toLocation({ file: 5, rank: 6 })).length).toEqual(1);

    // d5
    gameMaster.onPress(toLocation({ file: 4, rank: 2 }));
    gameMaster.onPress(toLocation({ file: 4, rank: 4 }));
    expect(board.getPiecesAt(toLocation({ file: 4, rank: 4 })).length).toEqual(1);

    // a5
    gameMaster.onPress(toLocation({ file: 1, rank: 7 }));
    gameMaster.onPress(toLocation({ file: 1, rank: 5 }));
    expect(board.getPiecesAt(toLocation({ file: 1, rank: 5 })).length).toEqual(1);

    // bh6
    gameMaster.onPress(toLocation({ file: 3, rank: 1 }));
    gameMaster.onPress(toLocation({ file: 8, rank: 6 }));
    expect(board.getPiecesAt(toLocation({ file: 8, rank: 6 })).length).toEqual(1);

    //qf6
    gameMaster.onPress(toLocation({ file: 4, rank: 8 }));
    gameMaster.onPress(toLocation({ file: 6, rank: 6 }));
    expect(board.getPiecesAt(toLocation({ file: 6, rank: 6 })).length).toEqual(1);

    // bxg7
    gameMaster.onPress(toLocation({ file: 8, rank: 6 }));
    gameMaster.onPress(toLocation({ file: 7, rank: 7 }));
    expect(board.getPiecesAt(toLocation({ file: 7, rank: 7 })).length).toEqual(0);

    // c5
    gameMaster.onPress(toLocation({ file: 3, rank: 7 }));
    gameMaster.onPress(toLocation({ file: 3, rank: 5 }));
    expect(board.getPiecesAt(toLocation({ file: 3, rank: 5 })).length).toEqual(1);

    // xc5
    gameMaster.onPress(toLocation({ file: 4, rank: 4 }));
    gameMaster.onPress(toLocation({ file: 3, rank: 5 }));
    expect(board.getPiecesAt(toLocation({ file: 3, rank: 5 })).length).toEqual(0);

    // d5
    gameMaster.onPress(toLocation({ file: 4, rank: 7 }));
    gameMaster.onPress(toLocation({ file: 4, rank: 5 }));
    expect(board.getPiecesAt(toLocation({ file: 4, rank: 5 })).length).toEqual(1);

    // c4
    gameMaster.onPress(toLocation({ file: 3, rank: 2 }));
    gameMaster.onPress(toLocation({ file: 3, rank: 4 }));
    expect(board.getPiecesAt(toLocation({ file: 3, rank: 4 })).length).toEqual(1);

    // xc4
    gameMaster.onPress(toLocation({ file: 4, rank: 5 }));
    gameMaster.onPress(toLocation({ file: 3, rank: 4 }));
    expect(board.getPiecesAt(toLocation({ file: 3, rank: 4 })).length).toEqual(0);

    // b4
    gameMaster.onPress(toLocation({ file: 2, rank: 2 }));
    gameMaster.onPress(toLocation({ file: 2, rank: 4 }));
    expect(board.getPiecesAt(toLocation({ file: 2, rank: 4 })).length).toEqual(1);

    // xb4
    gameMaster.onPress(toLocation({ file: 1, rank: 5 }));
    gameMaster.onPress(toLocation({ file: 2, rank: 4 }));
    expect(board.getPiecesAt(toLocation({ file: 2, rank: 4 })).length).toEqual(0);

    // f4
    gameMaster.onPress(toLocation({ file: 6, rank: 2 }));
    gameMaster.onPress(toLocation({ file: 6, rank: 4 }));
    expect(board.getPiecesAt(toLocation({ file: 6, rank: 4 })).length).toEqual(1);

    // f4
    gameMaster.onPress(toLocation({ file: 6, rank: 2 }));
    gameMaster.onPress(toLocation({ file: 6, rank: 4 }));
    expect(board.getPiecesAt(toLocation({ file: 6, rank: 4 })).length).toEqual(1);

    // h5
    gameMaster.onPress(toLocation({ file: 8, rank: 7 }));
    gameMaster.onPress(toLocation({ file: 8, rank: 5 }));
    expect(board.getPiecesAt(toLocation({ file: 8, rank: 5 })).length).toEqual(1);

    // g4
    gameMaster.onPress(toLocation({ file: 7, rank: 2 }));
    gameMaster.onPress(toLocation({ file: 7, rank: 4 }));
    expect(board.getPiecesAt(toLocation({ file: 7, rank: 4 })).length).toEqual(1);

    // e5
    gameMaster.onPress(toLocation({ file: 5, rank: 6 }));
    gameMaster.onPress(toLocation({ file: 5, rank: 5 }));
    expect(board.getPiecesAt(toLocation({ file: 5, rank: 5 })).length).toEqual(1);

    // ne2
    gameMaster.onPress(toLocation({ file: 7, rank: 1 }));
    gameMaster.onPress(toLocation({ file: 5, rank: 2 }));
    expect(board.getPiecesAt(toLocation({ file: 5, rank: 2 })).length).toEqual(1);

    // xf4
    gameMaster.onPress(toLocation({ file: 5, rank: 5 }));
    gameMaster.onPress(toLocation({ file: 6, rank: 4 }));
    expect(board.getPiecesAt(toLocation({ file: 6, rank: 4 })).length).toEqual(0);

    // nd4
    gameMaster.onPress(toLocation({ file: 5, rank: 2 }));
    gameMaster.onPress(toLocation({ file: 4, rank: 4 }));
    expect(board.getPiecesAt(toLocation({ file: 4, rank: 4 })).length).toEqual(1);

    // xg4
    gameMaster.onPress(toLocation({ file: 8, rank: 5 }));
    gameMaster.onPress(toLocation({ file: 7, rank: 4 }));
    expect(board.getPiecesAt(toLocation({ file: 7, rank: 4 })).length).toEqual(0);

    // ne6
    gameMaster.onPress(toLocation({ file: 4, rank: 4 }));
    gameMaster.onPress(toLocation({ file: 5, rank: 6 }));
    expect(board.getPiecesAt(toLocation({ file: 5, rank: 6 })).length).toEqual(1);

    // ke7
    gameMaster.onPress(toLocation({ file: 5, rank: 8 }));
    gameMaster.onPress(toLocation({ file: 5, rank: 7 }));
    expect(board.getPiecesAt(toLocation({ file: 5, rank: 7 })).length).toEqual(1);

    //qd4
    gameMaster.onPress(toLocation({ file: 4, rank: 1 }));
    gameMaster.onPress(toLocation({ file: 4, rank: 4 }));
    expect(board.getPiecesAt(toLocation({ file: 4, rank: 4 })).length).toEqual(1);

    // ke8
    gameMaster.onPress(toLocation({ file: 5, rank: 7 }));
    gameMaster.onPress(toLocation({ file: 5, rank: 8 }));
    expect(board.getPiecesAt(toLocation({ file: 5, rank: 8 })).length).toEqual(1);

    //qd4
    gameMaster.onPress(toLocation({ file: 4, rank: 4 }));
    gameMaster.onPress(toLocation({ file: 7, rank: 7 }));
    expect(board.getPiecesAt(toLocation({ file: 7, rank: 7 })).length).toEqual(1);

    //draw by stalemate
    expect(gameMaster.gameOver).toEqual(true);
    expect(gameMaster.game.alivePlayers().length).toEqual(0);
    expect(gameMaster.result).toEqual("Draw by stalemate!");
  });
});
