import { GameMaster, PlayerAction } from ".";
import { Player } from "./Player";
import autoBind from "auto-bind";

export interface PlayerActionCommunicator {
  receivePlayerAction: (playerAction: PlayerAction) => void;
  setSendPlayerAction: (sendPlayerAction: (playerAction: PlayerAction) => void) => void;
}

export abstract class PlayerAgent implements PlayerActionCommunicator {
  protected sendPlayerAction?: (playerAction: PlayerAction) => void;

  constructor(protected gameMaster: GameMaster, protected player: Player) {
    autoBind(this);
  }

  public setSendPlayerAction(
    sendPlayerAction: (playerAction: PlayerAction) => void
  ): void {
    this.sendPlayerAction = sendPlayerAction;
  }

  public receivePlayerAction(playerAction: PlayerAction): void {
    this.doPlayerAction(playerAction);

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
