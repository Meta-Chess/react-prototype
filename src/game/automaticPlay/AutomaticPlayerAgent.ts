import { PlayerAction } from "../PlayerAction";
import { PlayerActionInterface } from "../PlayerAgent";
import { AutomaticPlayer } from "./AutomaticPlayer";

class AutomaticPlayerAgent implements PlayerActionInterface {
  constructor(private player: AutomaticPlayer) {}

  doPlayerAction({ playerAction }: { playerAction: PlayerAction }): void {
    this.player.doPlayerAction(playerAction);
    if (this.player.player === this.player.gameMaster.currentPlayer) {
      this.onPlayerAction(this.player.getNextMove());
    }
  }
  private onPlayerAction: (playerAction: PlayerAction) => void;

  setOnPlayerAction(onPlayerAction: (playerAction: PlayerAction) => void): void {
    this.onPlayerAction = onPlayerAction;
  }
}
