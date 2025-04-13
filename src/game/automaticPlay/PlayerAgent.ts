import { GameMaster } from "game/GameMaster";
import { PlayerAction } from "game/PlayerAction";
import { Player } from "game/Player";
import autoBind from "auto-bind";

export interface PlayerActionCommunicator {
  receivePlayerAction: (playerAction: PlayerAction) => void;
  setSendPlayerAction: (sendPlayerAction: (playerAction: PlayerAction) => void) => void;
}

export abstract class PlayerAgent implements PlayerActionCommunicator {
  protected sendPlayerAction?: (playerAction: PlayerAction) => void;

  constructor(protected gameMaster: GameMaster, protected player: Player) {
    autoBind(this);
    setTimeout(() => this.maybeTakeTurns(), 1000);
  }

  public setSendPlayerAction(
    sendPlayerAction: (playerAction: PlayerAction) => void
  ): void {
    this.sendPlayerAction = sendPlayerAction;
  }

  public receivePlayerAction(playerAction: PlayerAction): void {
    this.doPlayerAction(playerAction);
    this.maybeTakeTurns();
  }

  private maybeTakeTurns(): void {
    while (this.sendPlayerAction && this.isItMyTurn()) {
      const newPlayerAction = this.comeUpWithPlayerAction();
      this.doPlayerAction(newPlayerAction);
      this.sendPlayerAction(newPlayerAction);
    }
  }

  protected isItMyTurn(): boolean {
    return (
      !this.gameMaster.gameOver &&
      this.player.name === this.gameMaster.game.getCurrentPlayerName()
    );
  }

  protected doPlayerAction(playerAction: PlayerAction): void {
    this.gameMaster.receivePlayerAction(playerAction);
  }

  protected abstract comeUpWithPlayerAction(): PlayerAction;
}
