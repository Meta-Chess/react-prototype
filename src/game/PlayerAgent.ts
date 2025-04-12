import { PlayerAction } from ".";

export interface PlayerActionInterface {
  doPlayerAction: (input: { playerAction: PlayerAction; received: boolean }) => void;
  setOnPlayerAction: (onPlayerAction: (playerAction: PlayerAction) => void) => void;
}

export abstract class PlayerAgent implements PlayerActionInterface {
  protected onPlayerAction?: (playerAction: PlayerAction) => void;

  public setOnPlayerAction(onPlayerAction: (playerAction: PlayerAction) => void): void {
    this.onPlayerAction = onPlayerAction;
  }

  public doPlayerAction({
    playerAction,
  }: {
    playerAction: PlayerAction;
    received: boolean;
  }): void {
    this.doPlayerActionLocally(playerAction);

    if (this.isItMyTurn()) {
      const newPlayerAction = this.comeUpWithPlayerAction();
      this.onPlayerAction?.(newPlayerAction);
    }
  }

  protected abstract isItMyTurn(): boolean;

  protected abstract doPlayerActionLocally(playerAction: PlayerAction): void;

  protected abstract comeUpWithPlayerAction(): PlayerAction;
}
