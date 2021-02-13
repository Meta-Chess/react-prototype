import { GameMaster } from "game/GameMaster";

import { calculateGameOptions } from "game/variantAndRuleProcessing/calculateGameOptions";

describe("With no fork enabled", () => {
  it("knight cannot fork and pieces cannot allow knight to fork", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs(calculateGameOptions({}, ["noFork"]))
    );
    const board = gameMaster.game.board;

    // Move white knight F6
    gameMaster.onPress("R1F7");
    gameMaster.onPress("R3F6");
    expect(board.getPiecesAt("R3F6").length).toEqual(1);

    // Move black pawn to A6
    gameMaster.onPress("R7F1");
    gameMaster.onPress("R6F1");
    expect(board.getPiecesAt("R6F1").length).toEqual(1);

    // Select white knight
    gameMaster.onPress("R3F6");
    // Expect allowable moves to be restricted
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: "R4F8" }),
        expect.objectContaining({ location: "R1F7" }),
        expect.objectContaining({ location: "R4F4" }),
      ])
    );
    expect(gameMaster.allowableMoves.length).toEqual(3);

    // Move white pawn to E4
    gameMaster.onPress("R2F5");
    gameMaster.onPress("R4F5");
    expect(board.getPiecesAt("R4F5").length).toEqual(1);

    // Move black pawn to E5
    gameMaster.onPress("R7F5");
    gameMaster.onPress("R5F5");
    expect(board.getPiecesAt("R5F5").length).toEqual(1);

    // Move white pawn to D4
    gameMaster.onPress("R2F4");
    gameMaster.onPress("R4F4");
    expect(board.getPiecesAt("R4F4").length).toEqual(1);

    // Select black pawn on G7
    gameMaster.onPress("R7F7");
    // Expect restricted double step
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([expect.objectContaining({ location: "R6F7" })])
    );
    expect(gameMaster.allowableMoves.length).toEqual(1);

    // Select black queen
    gameMaster.onPress("R8F4");
    // Expect moves to be restricted
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: "R7F5" }),
        expect.objectContaining({ location: "R6F6" }),
      ])
    );
    expect(gameMaster.allowableMoves.length).toEqual(2);
  });

  it("it is not check if the king destination would allow the knight to hit 2 enemy pieces", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs(
        calculateGameOptions({ checkEnabled: true }, ["noFork"])
      )
    );
    const board = gameMaster.game.board;

    // Move white knight C3
    gameMaster.onPress("R1F2");
    gameMaster.onPress("R3F3");
    expect(board.getPiecesAt("R3F3").length).toEqual(1);

    // Move black pawn A5
    gameMaster.onPress("R7F1");
    gameMaster.onPress("R5F1");
    expect(board.getPiecesAt("R5F1").length).toEqual(1);

    // Move white knight B5
    gameMaster.onPress("R3F3");
    // Expect allowable moves to be restricted
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: "R5F2" }),
        expect.objectContaining({ location: "R4F5" }),
        expect.objectContaining({ location: "R1F2" }),
        expect.objectContaining({ location: "R4F1" }),
      ])
    );
    // Expect number of allowable moves to be 4
    expect(gameMaster.allowableMoves.length).toEqual(4);
    gameMaster.onPress("R5F2");
    expect(board.getPiecesAt("R5F2").length).toEqual(1);

    // Move black pawn to B6
    gameMaster.onPress("R7F2");
    gameMaster.onPress("R6F2");
    expect(board.getPiecesAt("R6F2").length).toEqual(1);

    // Move white pawn E4
    gameMaster.onPress("R2F5");
    gameMaster.onPress("R4F5");
    expect(board.getPiecesAt("R4F5").length).toEqual(1);

    // Move black pawn F6
    gameMaster.onPress("R7F6");
    gameMaster.onPress("R6F6");
    expect(board.getPiecesAt("R6F6").length).toEqual(1);

    // Move white pawn D3
    gameMaster.onPress("R2F4");
    gameMaster.onPress("R3F4");
    expect(board.getPiecesAt("R3F4").length).toEqual(1);

    // Move black bishop A6
    gameMaster.onPress("R8F3");
    gameMaster.onPress("R6F1");
    expect(board.getPiecesAt("R6F1").length).toEqual(1);

    // Move white knight to D6
    gameMaster.onPress("R5F2");
    // Expect allowable moves to be restricted (no pawn capture)
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: "R7F1" }),
        expect.objectContaining({ location: "R6F4" }),
        expect.objectContaining({ location: "R4F4" }),
        expect.objectContaining({ location: "R3F3" }),
        expect.objectContaining({ location: "R3F1" }),
      ])
    );
    // Expect number of allowable moves to be 5
    expect(gameMaster.allowableMoves.length).toEqual(5);
    gameMaster.onPress("R6F4");
    expect(board.getPiecesAt("R6F4").length).toEqual(1);

    // King is not in check and can move into other knight square
    gameMaster.onPress("R8F5");
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([expect.objectContaining({ location: "R7F6" })])
    );
    expect(gameMaster.allowableMoves.length).toEqual(1);

    // Bishop can only capture the pawn on D3
    gameMaster.onPress("R6F1");
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([expect.objectContaining({ location: "R3F4" })])
    );
    expect(gameMaster.allowableMoves.length).toEqual(1);

    // Pawn on F6 cannot move
    gameMaster.onPress("R6F6");
    expect(gameMaster.allowableMoves.length).toEqual(0);

    // Pawn on G7 can move as normal (it is not check...)
    gameMaster.onPress("R7F7");
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: "R6F7" }),
        expect.objectContaining({ location: "R5F7" }),
      ])
    );
    expect(gameMaster.allowableMoves.length).toEqual(2);
  });

  it("fatigue makes it very easy to stalemate", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs(
        calculateGameOptions({ checkEnabled: true }, ["noFork", "fatigue"])
      )
    );
    const board = gameMaster.game.board;

    // Move white knight to F6
    gameMaster.onPress("R1F7");
    gameMaster.onPress("R3F6");
    expect(board.getPiecesAt("R3F6").length).toEqual(1);

    // Dummy moves
    // A6
    gameMaster.onPress("R7F1");
    gameMaster.onPress("R6F1");
    expect(board.getPiecesAt("R6F1").length).toEqual(1);

    // A3
    gameMaster.onPress("R2F1");
    gameMaster.onPress("R3F1");
    expect(board.getPiecesAt("R3F1").length).toEqual(1);

    // B6
    gameMaster.onPress("R7F2");
    gameMaster.onPress("R6F2");
    expect(board.getPiecesAt("R6F2").length).toEqual(1);

    // Move knight again so that it would attack 2 pawns, but is fatigued
    gameMaster.onPress("R3F6");
    expect(gameMaster.allowableMoves).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location: "R5F7" }),
        expect.objectContaining({ location: "R5F5" }),
        expect.objectContaining({ location: "R4F8" }),
        expect.objectContaining({ location: "R1F7" }),
        expect.objectContaining({ location: "R4F4" }),
      ])
    );
    expect(gameMaster.allowableMoves.length).toEqual(5);
    gameMaster.onPress("R5F5");
    expect(board.getPiecesAt("R5F5").length).toEqual(1);

    // H6
    gameMaster.onPress("R7F8");
    gameMaster.onPress("R6F8");
    expect(board.getPiecesAt("R6F8").length).toEqual(1);

    // Draw by stalemate
    expect(gameMaster.gameOver).toEqual(true);
    expect(gameMaster.game.alivePlayers().length).toEqual(0);
    expect(gameMaster.result).toEqual("Draw by stalemate!");
  });
});
