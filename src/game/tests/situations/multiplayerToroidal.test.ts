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
    gameMaster.onPress("R4F2");
    gameMaster.onPress("R6F3");
    expect(board.getPiecesAt("R6F3").length).toEqual(1);

    // Move b10 -> c8
    gameMaster.onPress("R10F2");
    gameMaster.onPress("R8F3");
    expect(board.getPiecesAt("R8F3").length).toEqual(1);

    // Move b16 -> c14
    gameMaster.onPress("R16F2");
    gameMaster.onPress("R14F3");
    expect(board.getPiecesAt("R14F3").length).toEqual(1);

    // Move e3 -> e2
    gameMaster.onPress("R3F5");
    gameMaster.onPress("R2F5");
    expect(board.getPiecesAt("R2F5").length).toEqual(1);

    // More moves ...
    gameMaster.onPress("R10F7");
    gameMaster.onPress("R12F6");
    expect(board.getPiecesAt("R12F6").length).toEqual(1);

    // Move
    gameMaster.onPress("R14F3");
    gameMaster.onPress("R12F4");
    expect(board.getPiecesAt("R12F4").length).toEqual(1);

    // Move
    gameMaster.onPress("R6F3");
    gameMaster.onPress("R8F4");
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
    gameMaster.onPress("R4F4");
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([expect.objectContaining({ location: "R13F5" })])
    );
    gameMaster.onPress("R13F5");
    expect(board.getPiecesAt("R13F5").length).toEqual(1);

    // black move
    gameMaster.onPress("R11F5");
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([expect.objectContaining({ location: "R12F5" })])
    );
    gameMaster.onPress("R12F5");
    expect(board.getPiecesAt("R12F5").length).toEqual(1);

    // silver move
    gameMaster.onPress("R15F5");
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([expect.objectContaining({ location: "R14F5" })])
    );
    gameMaster.onPress("R14F5");
    expect(board.getPiecesAt("R14F5").length).toEqual(1);

    // white move
    gameMaster.onPress("R13F5");
    gameMaster.onPress("R13F8");
    expect(board.getPiecesAt("R13F8").length).toEqual(1);

    // black move
    gameMaster.onPress("R11F7");
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([expect.objectContaining({ location: "R12F7" })])
    );
    gameMaster.onPress("R12F7");
    expect(board.getPiecesAt("R12F7").length).toEqual(1);

    // silver move
    gameMaster.onPress("R15F7");
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([expect.objectContaining({ location: "R14F7" })])
    );
    gameMaster.onPress("R14F7");
    expect(board.getPiecesAt("R14F7").length).toEqual(1);

    // white move
    gameMaster.onPress("R13F8");
    gameMaster.onPress("R13F2");
    expect(board.getPiecesAt("R13F2").length).toEqual(1);

    // Game over
    expect(gameMaster.gameOver).toEqual(true);
    expect(gameMaster.game.alivePlayers().length).toEqual(1);
    expect(gameMaster.game.players[1].endGameMessage).toEqual("has been checked 3 times");
    expect(gameMaster.game.players[2].endGameMessage).toEqual("has been checked 3 times");
    expect(gameMaster.result).toEqual("White won!");
  });
});
