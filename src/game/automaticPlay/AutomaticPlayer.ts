import { Move } from "game/Move";

export interface AutomaticPlayer {
  getNextMove: () => Move;
}
