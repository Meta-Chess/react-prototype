import { GameMaster } from "game/GameMaster";
import { mockRenderer } from "../helpers/mockRenderer";
import { Gait } from "game/types";

describe("In standard chess", () => {
  it("It should be a draw by stalemate if a player has no legal moves", () => {
    // Setup standard board
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs(
        { variant: "chess", checkEnabled: true },
        mockRenderer
      )
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
  });
});
