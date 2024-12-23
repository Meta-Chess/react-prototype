import { Path } from "game/Pather/Path";
import { PieceName, PlayerName, TimestampMillis } from "game/types";
import { isEqual } from "lodash";
import { Direction } from "game/types";
import type { GaitData } from "game/types";
import {
  InterceptionConditionType,
  InterceptionConditionBuilderParams,
} from "game/types/InterceptionCondition";

export interface MoveData extends GaitData {
  interceptable?: boolean;
  interceptionConditionType?: InterceptionConditionType;
  interceptionConditionBuilderParams?: InterceptionConditionBuilderParams;
  interceptableAtStart?: boolean;
  linearMoverDirection?: Direction;
}

export interface CaptureData {
  at: string;
  pieceIds: string[];
  capturer: PlayerName;
}

// NOTE: the Move type and hence any attributes like MoveData, must remain JSON serializable/parsable (for online play). e.g. no functions
export interface Move {
  pieceId: string;
  location: string;
  pieceDeltas: PieceDelta[];
  playerName: PlayerName;
  nextPlayerName?: PlayerName;
  captures?: CaptureData[];
  data?: MoveData;
  timestamp?: TimestampMillis;
  interesting?: boolean;
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
    ) &&
    moveCapturesAreEqual(m1.captures, m2.captures)
  );
}

function moveCapturesAreEqual(
  m1captures: CaptureData[] | undefined,
  m2captures: CaptureData[] | undefined
): boolean {
  if (!m1captures && !m2captures) {
    return true;
  }

  if (!m1captures || !m2captures) {
    return false;
  }

  return (
    m1captures.length === m2captures.length &&
    m1captures.reduce<boolean>(
      (acc, capture, index) =>
        acc &&
        capture.at === m2captures[index].at &&
        capture.capturer === m2captures[index].capturer &&
        isEqual(capture.pieceIds, m2captures[index].pieceIds),
      true
    )
  );
}
