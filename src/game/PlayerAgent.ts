import { PlayerAction } from ".";

export interface PlayerAgent {
  doPlayerAction: (playerAction: PlayerAction) => void;
  setOnPlayerAction: (onPlayerAction: (playerAction: PlayerAction) => void) => void;
}
