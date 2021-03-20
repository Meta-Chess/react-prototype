import { Move } from "./Move";
import { PlayerName, TimestampMillis } from "./types";

export type PlayerAction = PlayerActionMove | PlayerActionResign | PlayerActionDraw;

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

export interface PlayerActionDraw {
  type: "draw";
  data: Draw;
  timestamp?: TimestampMillis;
}

export interface Resign {
  playerName: PlayerName;
}

export interface Draw {
  playerName: PlayerName;
}
