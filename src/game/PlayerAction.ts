import { Move } from "./Move";
import { PlayerName, TimestampMillis } from "./types";

export type PlayerAction = (PlayerActionMove | PlayerActionResign | PlayerActionDraw) & {
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

export interface PlayerActionDraw {
  type: "draw";
  data: Draw;
}

export interface Resignation {
  playerName: PlayerName;
}

export interface Draw {
  playerName: PlayerName;
}
