import { Move } from "./Move";
import { PlayerName, TimestampMillis } from "./types";

export type PlayerAction = (PlayerActionMove | PlayerActionResign) & {
  timestamp?: TimestampMillis;
};

export interface PlayerActionMove {
  type: "move";
  data: Move | undefined;
}

export interface PlayerActionResign {
  type: "resign";
  data: Resignation;
}

export interface Resignation {
  playerName: PlayerName;
}
