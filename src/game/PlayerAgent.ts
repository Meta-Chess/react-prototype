import { PlayerAction } from ".";

export interface PlayerAgent {
  doPlayerAction: (input: { playerAction: PlayerAction; received: boolean }) => void;
  setOnPlayerAction: (onPlayerAction: (playerAction: PlayerAction) => void) => void;
}
