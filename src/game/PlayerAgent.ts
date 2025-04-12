import { PlayerAction } from ".";

export interface PlayerActionConduit {
  receivePlayerAction: (playerAction: PlayerAction) => void;
  setSendPlayerAction: (sendPlayerAction: (playerAction: PlayerAction) => void) => void;
}

export abstract class PlayerAgent implements PlayerActionConduit {
  protected sendPlayerAction?: (playerAction: PlayerAction) => void;

  public setSendPlayerAction(
    sendPlayerAction: (playerAction: PlayerAction) => void,
  ): void {
    this.sendPlayerAction = sendPlayerAction;
  }

  public receivePlayerAction(playerAction: PlayerAction): void {
    this.doPlayerAction(playerAction);

    if (this.sendPlayerAction && this.isItMyTurn()) {
      const newPlayerAction = this.comeUpWithPlayerAction();
      this.doPlayerAction(newPlayerAction);
      this.sendPlayerAction(newPlayerAction);
    }
  }

  protected abstract isItMyTurn(): boolean;

  protected abstract doPlayerAction(playerAction: PlayerAction): void;

  protected abstract comeUpWithPlayerAction(): PlayerAction;
}
