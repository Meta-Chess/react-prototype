import { Move } from "game";

export function doesCapture(move: Move): boolean {
  return !!move.capture;
}
