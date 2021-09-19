import { Board, Square } from "game/Board";
import { PieceName, AnimationType, Direction } from "game/types";
import { uniq } from "lodash";
import { isPresent } from "utilities/isPresent";
import { ParameterRule, SubscribeToEvents } from "../CompactRules";
import { addAnimationTokenToSquare } from "../utilities";

export const atomic: ParameterRule<"atomic"> = ({
  BOOM,
  "Immune Pieces": immunePieces,
  "Deep Impact": deepImpact,
}) => ({
  title: "Atomic",
  description:
    "When a piece is captured, all pieces on adjacent squares are destroyed. Pawns shield their square from this effect. The capturing piece is also destroyed.",

  subscribeToEvents: ({ events }): SubscribeToEvents => {
    events.subscribe({
      name: "capture",
      consequence: ({ board, square }) => {
        atomicExplosion(board, square, BOOM, immunePieces)
          .map((s) => s.location)
          .forEach((location) => {
            board.killPiecesAt({ piecesLocation: location });

            addAnimationTokenToSquare({
              board: board,
              squareLocation: location,
              duration: ANIMATION_DURATION,
              delay: 0,
              animationType: AnimationType.explosion,
            });
          });

        if (deepImpact) board.destroySquare(square.getLocation());

        return { board, square };
      },
    });
    return { events };
  },
});

function atomicExplosion(
  board: Board,
  square: Square,
  BOOM: number,
  explosionImmunePieces: PieceName[][]
): Square[] {
  let explosionSquares = [square];

  const explosionType = (BOOM + 1) % NUMBER_OF_EXPLOSION_PATTERNS;
  const explosionRadius = BOOM / NUMBER_OF_EXPLOSION_PATTERNS;
  for (let radius = 0; radius < explosionRadius; radius++) {
    explosionSquares = incrementPattern(
      explosionType,
      explosionSquares,
      board,
      explosionImmunePieces.flatMap((x) => x)
    );
  }
  return explosionSquares;
}

const ODD_PATTERN = [
  Direction.N,
  Direction.W,
  Direction.E,
  Direction.S,
  Direction.H2,
  Direction.H4,
  Direction.H8,
  Direction.H10,
  Direction.Down,
];

const EVEN_PATTERN = [
  ...ODD_PATTERN,
  Direction.NE,
  Direction.NW,
  Direction.SE,
  Direction.SW,
  Direction.H12,
  Direction.H6,
];

const EXPLOSION_PATTERNS = [ODD_PATTERN, EVEN_PATTERN];

const NUMBER_OF_EXPLOSION_PATTERNS = EXPLOSION_PATTERNS.length;

function incrementPattern(
  explosionType: number,
  explosionSquares: Square[],
  board: Board,
  explosionImmunePieces: PieceName[]
): Square[] {
  const pattern = EXPLOSION_PATTERNS[explosionType];
  return uniq([
    ...explosionSquares
      .flatMap((square) => pattern.flatMap((direction) => square.go(direction)))
      .map((location) => board.squareAt(location))
      .filter(isPresent)
      .filter(squareVulnerable(board, explosionImmunePieces)),
    ...explosionSquares,
  ]);
}

const squareVulnerable =
  (board: Board, explosionImmunePieces: PieceName[]) =>
  (square: Square): boolean => {
    return !square.pieces
      .map((piece) => board.getPiece(piece)?.name)
      .filter(isPresent)
      .some((pieceName) => explosionImmunePieces.includes(pieceName));
  };

const ANIMATION_DURATION = 1000;
