import { GameMaster, calculateGameOptions } from "game";

describe("On a klein bottle with 3 players", () => {
  it("the following moves should checkmate black", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({
        gameOptions: calculateGameOptions({ checkEnabled: true, numberOfPlayers: 3 }, [
          "kleinBottle",
        ]),
      })
    );
    const board = gameMaster.game.board;

    // Move b4 -> c6
    gameMaster.handleSquarePressed("R4F2");
    gameMaster.handleSquarePressed("R6F3");
    expect(board.getPiecesAt("R6F3").length).toEqual(1);

    // Move b10 -> c8
    gameMaster.handleSquarePressed("R10F2");
    gameMaster.handleSquarePressed("R8F3");
    expect(board.getPiecesAt("R8F3").length).toEqual(1);

    // Move b16 -> c14
    gameMaster.handleSquarePressed("R16F2");
    gameMaster.handleSquarePressed("R14F3");
    expect(board.getPiecesAt("R14F3").length).toEqual(1);

    // Move e3 -> e2
    gameMaster.handleSquarePressed("R3F5");
    gameMaster.handleSquarePressed("R2F5");
    expect(board.getPiecesAt("R2F5").length).toEqual(1);

    // More moves ...
    gameMaster.handleSquarePressed("R10F7");
    gameMaster.handleSquarePressed("R12F6");
    expect(board.getPiecesAt("R12F6").length).toEqual(1);

    // Move
    gameMaster.handleSquarePressed("R14F3");
    gameMaster.handleSquarePressed("R12F4");
    expect(board.getPiecesAt("R12F4").length).toEqual(1);

    // Move
    gameMaster.handleSquarePressed("R6F3");
    gameMaster.handleSquarePressed("R8F4");
    expect(board.getPiecesAt("R8F4").length).toEqual(1);

    // Black is dead.
    expect(gameMaster.game.alivePlayers().length).toEqual(2);
    expect(gameMaster.game.players[1].alive).toEqual(false);
    expect(gameMaster.gameOver).toEqual(false);
    expect(gameMaster.game.currentPlayerIndex).toEqual(2);
  });
  it("should be a win for white if they check the other two players 3 times", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs({
        gameOptions: calculateGameOptions({ checkEnabled: true, numberOfPlayers: 3 }, [
          "kleinBottle",
          "threeCheck",
          "atomic",
        ]),
      })
    );
    const board = gameMaster.game.board;

    // White moves their queen through the board to check the other two players, then moves it two more times
    // checking both players 3 times and killing them.

    // white move
    gameMaster.handleSquarePressed("R4F4");
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([expect.objectContaining({ location: "R13F5" })])
    );
    gameMaster.handleSquarePressed("R13F5");
    expect(board.getPiecesAt("R13F5").length).toEqual(1);

    // black move
    gameMaster.handleSquarePressed("R11F5");
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([expect.objectContaining({ location: "R12F5" })])
    );
    gameMaster.handleSquarePressed("R12F5");
    expect(board.getPiecesAt("R12F5").length).toEqual(1);

    // silver move
    gameMaster.handleSquarePressed("R15F5");
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([expect.objectContaining({ location: "R14F5" })])
    );
    gameMaster.handleSquarePressed("R14F5");
    expect(board.getPiecesAt("R14F5").length).toEqual(1);

    // white move
    gameMaster.handleSquarePressed("R13F5");
    gameMaster.handleSquarePressed("R13F8");
    expect(board.getPiecesAt("R13F8").length).toEqual(1);

    // black move
    gameMaster.handleSquarePressed("R11F7");
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([expect.objectContaining({ location: "R12F7" })])
    );
    gameMaster.handleSquarePressed("R12F7");
    expect(board.getPiecesAt("R12F7").length).toEqual(1);

    // silver move
    gameMaster.handleSquarePressed("R15F7");
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([expect.objectContaining({ location: "R14F7" })])
    );
    gameMaster.handleSquarePressed("R14F7");
    expect(board.getPiecesAt("R14F7").length).toEqual(1);

    // white move
    gameMaster.handleSquarePressed("R13F8");
    gameMaster.handleSquarePressed("R13F2");
    expect(board.getPiecesAt("R13F2").length).toEqual(1);

    // Game over
    expect(gameMaster.gameOver).toEqual(true);
    expect(gameMaster.game.alivePlayers().length).toEqual(1);
    expect(gameMaster.game.players[1].endGameMessage).toEqual("has been checked 3 times");
    expect(gameMaster.game.players[2].endGameMessage).toEqual("has been checked 3 times");
    expect(gameMaster.result).toEqual("White won!");
  });
});
