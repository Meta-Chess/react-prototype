import { Move } from "./Move";
import { PlayerName, TimestampMillis } from "./types";

export type PlayerAction = PlayerActionMove | PlayerActionResign;

export interface PlayerActionMove {
  type: "move";
  data: Move;
  timestamp?: TimestampMillis;
}

export interface PlayerActionResign {
  type: "resign";
  data: Resign;
  timestamp?: TimestampMillis;
}

export interface Resign {
  playerName: PlayerName;
}
