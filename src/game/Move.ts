import { Piece } from "game/Board";
import { Path } from "game/Pather/Path";
import { PieceName, PlayerName } from "game/types";
import { isEqual } from "lodash";

export interface MoveData {
  interceptable?: boolean;
  interceptionCondition?: (piece: Piece) => boolean;
  interceptableAtStart?: boolean;
}

export interface Move {
  pieceId: string;
  location: string;
  pieceDeltas: PieceDelta[];
  playerName: PlayerName;
  data?: MoveData;
}

export interface PieceDelta {
  pieceId: string;
  path: Path;
  promoteTo?: PieceName;
}

export function movesAreEqual(m1: Move, m2: Move): boolean {
  return (
    m1.pieceId === m2.pieceId &&
    m1.location === m2.location &&
    m1.playerName === m2.playerName &&
    isEqual(m1.data, m2.data) &&
    m1.pieceDeltas.length === m2.pieceDeltas.length &&
    m1.pieceDeltas.reduce<boolean>(
      (acc, delta, index) =>
        acc &&
        delta.promoteTo === m2.pieceDeltas[index].promoteTo &&
        delta.pieceId === m2.pieceDeltas[index].pieceId &&
        delta.path.getEnd() === m2.pieceDeltas[index].path.getEnd(),
      true
    )
  );
}