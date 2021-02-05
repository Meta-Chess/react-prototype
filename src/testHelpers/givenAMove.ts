import { Move } from "game";
import { randomChoice, randomInt } from "utilities";
import { PieceDelta } from "game/Move";
import { givenARandomLocation } from "./givenARandomLocation";
import { givenAPath } from "./givenAPath";

export function givenAMove(
  details: Partial<Move> & {
    primaryPieceDelta?: PieceDelta;
    otherPieceDeltas?: PieceDelta[];
  } = {}
): Move {
  const pieceId = details.pieceId || randomInt(0, 64).toString(36);
  const location = details.location || givenARandomLocation();
  const pieceDeltas = details.pieceDeltas || [
    details.primaryPieceDelta || { pieceId, path: givenAPath({ end: location }) },
    ...(details.otherPieceDeltas || []),
  ];
  const playerName =
    details.playerName !== undefined
      ? details.playerName
      : randomChoice([0, 1, 2, 3, 4, 5]); // TODO: use player list from PR-52

  return { pieceId, location, pieceDeltas, playerName, data: details.data };
}
