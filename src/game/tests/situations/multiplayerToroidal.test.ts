import { GameMaster, calculateGameOptions } from "game";
import { mockRenderer } from "../helpers/mockRenderer";

describe("On a klein bottle with 3 players", () => {
  it("the following moves should checkmate black", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs(
        calculateGameOptions({ checkEnabled: true, numberOfPlayers: 3 }, ["kleinBottle"]),
        mockRenderer
      )
    );
    const board = gameMaster.game.board;

    // Move ... ???
    gameMaster.onPress("R4F2");
    // Expect allowable moves to be ... ???
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: "R6F3" }),
        expect.objectContaining({ location: "R6F1" }),
        expect.objectContaining({ location: "R2F3" }),
        expect.objectContaining({ location: "R2F1" }),
        expect.objectContaining({ location: "R13F7" }),
      ])
    );
    gameMaster.onPress("R6F3");
    expect(board.getPiecesAt("R6F3").length).toEqual(1);

    // Move ... ???
    gameMaster.onPress("R10F2");
    // Expect allowable moves to be ... ???
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: "R12F3" }),
        expect.objectContaining({ location: "R12F1" }),
        expect.objectContaining({ location: "R8F3" }),
        expect.objectContaining({ location: "R8F1" }),
        expect.objectContaining({ location: "R1F7" }),
      ])
    );
    gameMaster.onPress("R8F3");
    expect(board.getPiecesAt("R8F3").length).toEqual(1);

    // Move ... ???
    gameMaster.onPress("R16F2");
    // Expect allowable moves to be ... ???
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: "R18F3" }),
        expect.objectContaining({ location: "R18F1" }),
        expect.objectContaining({ location: "R14F3" }),
        expect.objectContaining({ location: "R14F1" }),
        expect.objectContaining({ location: "R7F7" }),
      ])
    );
    gameMaster.onPress("R14F3");
    expect(board.getPiecesAt("R14F3").length).toEqual(1);

    // Move ... ???
    gameMaster.onPress("R3F5");
    // Expect allowable moves to be ... ???
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: "R2F5" }),
        expect.objectContaining({ location: "R1F5" }),
        expect.objectContaining({ location: "R12F4" }),
      ])
    );
    gameMaster.onPress("R2F5");
    expect(board.getPiecesAt("R2F5").length).toEqual(1);

    // Move ... ???
    gameMaster.onPress("R10F7");
    // Expect allowable moves to be ... ???
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: "R12F8" }),
        expect.objectContaining({ location: "R12F6" }),
        expect.objectContaining({ location: "R8F8" }),
        expect.objectContaining({ location: "R8F6" }),
        expect.objectContaining({ location: "R1F2" }),
      ])
    );
    gameMaster.onPress("R12F6");
    expect(board.getPiecesAt("R12F6").length).toEqual(1);

    // Move ... ???
    gameMaster.onPress("R14F3");
    // Expect allowable moves to be ... ???
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: "R16F2" }),
        expect.objectContaining({ location: "R13F5" }),
        expect.objectContaining({ location: "R12F4" }),
        expect.objectContaining({ location: "R12F2" }),
        expect.objectContaining({ location: "R13F1" }),
      ])
    );
    gameMaster.onPress("R12F4");
    expect(board.getPiecesAt("R12F4").length).toEqual(1);

    // Move ... ???
    gameMaster.onPress("R6F3");
    // Expect allowable moves to be ... ???
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: "R8F4" }),
        expect.objectContaining({ location: "R8F2" }),
        expect.objectContaining({ location: "R7F5" }),
        expect.objectContaining({ location: "R4F2" }),
        expect.objectContaining({ location: "R7F1" }),
      ])
    );
    gameMaster.onPress("R8F4");
    expect(board.getPiecesAt("R8F4").length).toEqual(1);

    expect(gameMaster.game.alivePlayers().length).toEqual(2);
    expect(gameMaster.game.players[1].alive).toEqual(false);
    expect(gameMaster.gameOver).toEqual(false);
    expect(gameMaster.game.currentPlayerIndex).toEqual(2);
  });
  it("should be a win for white if", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs(
        calculateGameOptions({ checkEnabled: true, numberOfPlayers: 3 }, [
          "kleinBottle",
          "threeCheck",
          "atomic",
        ]),
        mockRenderer
      )
    );
    const board = gameMaster.game.board;

    // Move ... ???
    gameMaster.onPress("R4F4");
    // Expect allowable moves to be ... ???
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([expect.objectContaining({ location: "R13F5" })])
    );
    gameMaster.onPress("R13F5");
    expect(board.getPiecesAt("R13F5").length).toEqual(1);

    // Move ... ???
    gameMaster.onPress("R11F5");
    // Expect allowable moves to be ... ???
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([expect.objectContaining({ location: "R12F5" })])
    );
    gameMaster.onPress("R12F5");
    expect(board.getPiecesAt("R12F5").length).toEqual(1);

    // Move ... ???
    gameMaster.onPress("R15F5");
    // Expect allowable moves to be ... ???
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([expect.objectContaining({ location: "R14F5" })])
    );
    gameMaster.onPress("R14F5");
    expect(board.getPiecesAt("R14F5").length).toEqual(1);

    // Move ... ???
    gameMaster.onPress("R13F5");
    // Expect allowable moves to be ... ???
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: "R14F5" }),
        expect.objectContaining({ location: "R13F6" }),
        expect.objectContaining({ location: "R13F7" }),
        expect.objectContaining({ location: "R13F8" }),
        expect.objectContaining({ location: "R13F1" }),
        expect.objectContaining({ location: "R13F2" }),
        expect.objectContaining({ location: "R13F3" }),
        expect.objectContaining({ location: "R12F5" }),
        expect.objectContaining({ location: "R13F3" }),
        expect.objectContaining({ location: "R13F2" }),
        expect.objectContaining({ location: "R13F1" }),
        expect.objectContaining({ location: "R13F8" }),
        expect.objectContaining({ location: "R13F7" }),
        expect.objectContaining({ location: "R13F6" }),
        expect.objectContaining({ location: "R14F6" }),
        expect.objectContaining({ location: "R15F7" }),
        expect.objectContaining({ location: "R12F6" }),
        expect.objectContaining({ location: "R11F7" }),
        expect.objectContaining({ location: "R12F4" }),
        expect.objectContaining({ location: "R11F3" }),
        expect.objectContaining({ location: "R14F4" }),
        expect.objectContaining({ location: "R15F3" }),
        expect.objectContaining({ location: "R4F4" }),
      ])
    );
    gameMaster.onPress("R13F8");
    expect(board.getPiecesAt("R13F8").length).toEqual(1);

    // Move ... ???
    gameMaster.onPress("R11F7");
    // Expect allowable moves to be ... ???
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([expect.objectContaining({ location: "R12F7" })])
    );
    gameMaster.onPress("R12F7");
    expect(board.getPiecesAt("R12F7").length).toEqual(1);

    // Move ... ???
    gameMaster.onPress("R15F7");
    // Expect allowable moves to be ... ???
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([expect.objectContaining({ location: "R14F7" })])
    );
    gameMaster.onPress("R14F7");
    expect(board.getPiecesAt("R14F7").length).toEqual(1);

    // Move ... ???
    gameMaster.onPress("R13F8");
    // Expect allowable moves to be ... ???
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: "R14F8" }),
        expect.objectContaining({ location: "R15F8" }),
        expect.objectContaining({ location: "R13F1" }),
        expect.objectContaining({ location: "R13F2" }),
        expect.objectContaining({ location: "R13F3" }),
        expect.objectContaining({ location: "R13F5" }),
        expect.objectContaining({ location: "R13F6" }),
        expect.objectContaining({ location: "R13F7" }),
        expect.objectContaining({ location: "R12F8" }),
        expect.objectContaining({ location: "R11F8" }),
        expect.objectContaining({ location: "R13F7" }),
        expect.objectContaining({ location: "R13F6" }),
        expect.objectContaining({ location: "R13F5" }),
        expect.objectContaining({ location: "R13F3" }),
        expect.objectContaining({ location: "R13F2" }),
        expect.objectContaining({ location: "R13F1" }),
        expect.objectContaining({ location: "R14F1" }),
        expect.objectContaining({ location: "R15F2" }),
        expect.objectContaining({ location: "R12F1" }),
        expect.objectContaining({ location: "R11F2" }),
        expect.objectContaining({ location: "R12F7" }),
        expect.objectContaining({ location: "R14F7" }),
      ])
    );
    gameMaster.onPress("R13F2");
    expect(board.getPiecesAt("R13F2").length).toEqual(1);

    expect(gameMaster.gameOver).toEqual(true);
    expect(gameMaster.game.alivePlayers().length).toEqual(1);
    expect(gameMaster.game.players[1].endGameMessage).toEqual("has been checked 3 times");
    expect(gameMaster.game.players[2].endGameMessage).toEqual("has been checked 3 times");
    expect(gameMaster.result).toEqual("White won!");
  });
});
