import { GameMaster } from "game/GameMaster";
import { PlayerName } from "game/types";
import { Move } from "game/Move";
import { AutomaticPlayer } from "./AutomaticPlayer";
import autoBind from "auto-bind";
import { SlightlyImprovedRandomMovePlayer } from "./SlightlyImprovedRandomMovePlayer";

export class AutomaticGameController {
  private automaticPlayers: { [name in PlayerName]?: AutomaticPlayer } = {};
  private nextMove?: Move;
  private timer?: ReturnType<typeof setTimeout>;

  constructor(
    private gameMaster: GameMaster,
    private onEndGame: () => void,
    private options = {
      selectDelayMillis: 300,
      moveDelayMillis: 700,
      resetDelayMillis: 4000,
      endEarlyMinTurns: 40,
      endEarlyMaxPiecesPerPlayer: 1,
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
    if (this.gameMaster.gameOver || this.shouldEndEarly()) {
      this.timer = setTimeout(this.onEndGame, this.options.resetDelayMillis);
      return;
    }

    const currentPlayer = this.gameMaster.game.getCurrentPlayer();
    this.nextMove = this.automaticPlayers[currentPlayer.name]?.getNextMove();
    if (this.nextMove !== undefined) {
      const piece = this.gameMaster.game.board.getPiece(this.nextMove?.pieceId);
      if (piece) await this.gameMaster.onSquarePress(piece.location, piece.id);
      this.timer = setTimeout(this.executeNextMove, this.options.moveDelayMillis);
    }
  }

  private executeNextMove(): void {
    if (this.nextMove !== undefined) {
      this.gameMaster.doMove({ move: this.nextMove });
      this.timer = setTimeout(this.selectNextPiece, this.options.selectDelayMillis);
    }
  }

  private shouldEndEarly(): boolean {
    if (this.gameMaster.game.getCurrentTurn() < this.options.endEarlyMinTurns)
      return false;

    const piecePlayerRatio =
      this.gameMaster.game.board.getPieces().length / this.gameMaster.game.players.length;
    if (piecePlayerRatio > this.options.endEarlyMaxPiecesPerPlayer) return false;

    return true;
  }
}
