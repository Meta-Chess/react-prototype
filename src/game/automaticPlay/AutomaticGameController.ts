import { GameMaster } from "game/GameMaster";
import { PlayerName } from "game/types";
import { Move } from "game/Move";
import { AutomaticPlayer } from "./AutomaticPlayer";
import autoBind from "auto-bind";
import { doAsync } from "utilities";
import { SlightlyImprovedRandomMovePlayer } from "./SlightlyImprovedRandomMovePlayer";

interface AutomaticGameControllerOptions {
  selectDelayMillis: number;
  moveDelayMillis: number;
  resetDelayMillis: number;
}

export class AutomaticGameController {
  private automaticPlayers: { [name in PlayerName]?: AutomaticPlayer } = {};
  private nextMove?: Move;
  private timer?: ReturnType<typeof setTimeout>;

  constructor(
    private gameMaster: GameMaster,
    private onEndGame: () => void,
    private options: AutomaticGameControllerOptions = {
      selectDelayMillis: 100,
      moveDelayMillis: 600,
      resetDelayMillis: 5000,
    }
  ) {
    autoBind(this);
    gameMaster.game.getPlayers().forEach((player) => {
      this.automaticPlayers[player.name] = new SlightlyImprovedRandomMovePlayer(
        gameMaster,
        player
      );
    });
  }

  public start(): void {
    this.selectNextPiece();
  }

  public stop(): void {
    if (this.timer) clearTimeout(this.timer);
  }

  private async selectNextPiece(): Promise<void> {
    if (this.gameMaster.gameOver) {
      this.timer = setTimeout(this.onEndGame, this.options.resetDelayMillis);
      return;
    }

    const currentPlayer = this.gameMaster.game.getCurrentPlayer();
    this.nextMove = await doAsync(
      this.automaticPlayers[currentPlayer.name]?.getNextMove
    )();
    if (this.nextMove !== undefined) {
      const piece = this.gameMaster.game.board.getPiece(this.nextMove?.pieceId);
      if (piece) await this.gameMaster.onSquarePress(piece.location, piece.id);
      this.timer = setTimeout(this.executeNextMove, this.options.moveDelayMillis);
    }
  }

  private executeNextMove(): void {
    if (this.nextMove !== undefined) {
      this.gameMaster.onSquarePress(this.nextMove.location);
      this.timer = setTimeout(this.selectNextPiece, this.options.selectDelayMillis);
    }
  }
}
