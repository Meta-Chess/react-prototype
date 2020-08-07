import { isPresent } from "utilities";
import { Piece, Square, Board } from "../Board";
import { MovePattern } from "../types";
import { Direction } from "../Direction";
import { flatMap } from "lodash";

interface HypotheticalDisplacement {
  piece: Piece;
  board: Board;
  square: Square;
}

const MAX_STEPS = 4; // TODO: find a good number or something

export class Pather {
  constructor() {
    // TODO: add variants
  }

  path({ piece, board }: { piece: Piece; board: Board }): string[] {
    return flatMap(piece.movePatterns, (movePattern) =>
      this.stepLoop({ piece, board, movePattern })
    ).map((square) => square.location);
  }

  stepLoop({
    piece,
    board,
    movePattern,
  }: {
    piece: Piece;
    board: Board;
    movePattern: MovePattern;
  }): Square[] {
    let currentSquares = [board.squareAt(piece.location)].filter(isPresent);
    let remainingMoves = movePattern.pattern;
    let allowableSquares: Square[] = [];
    let newAllowableSquares: Square[] = [];

    for (let i = 0; i < MAX_STEPS; i++) {
      if (currentSquares.length === 0 || remainingMoves.length === 0) break;

      // Take step, get new current squares, get new candidates for allowable squares
      ({ currentSquares, newAllowableSquares } = this.step({
        currentSquares,
        direction: remainingMoves[0],
        piece,
        board,
      }));
      remainingMoves = remainingMoves.slice(1);

      // Accept allowable square candidates at the end of the pattern, and control repetition
      if (remainingMoves.length === 0) {
        allowableSquares = allowableSquares.concat(newAllowableSquares);
        if (movePattern.repeats) remainingMoves = movePattern.pattern;
      }
    }
    return allowableSquares;
  }

  step({
    currentSquares,
    direction,
    piece,
    board,
  }: {
    currentSquares: Square[];
    direction: Direction;
    piece: Piece;
    board: Board;
  }): { currentSquares: Square[]; newAllowableSquares: Square[] } {
    const possibleLandingSquares = flatMap(currentSquares, (square) =>
      this.go({ from: square, direction, board })
    );
    const landingSquares = possibleLandingSquares.filter((square) =>
      this.canLand({ piece, board, square })
    );
    const stayingSquares = landingSquares.filter((square) =>
      this.canStay({ piece, board, square })
    );
    const continuingSquares = landingSquares.filter((square) =>
      this.canContinue({ piece, board, square })
    );
    return {
      currentSquares: continuingSquares,
      newAllowableSquares: stayingSquares,
    };
  }

  canLand(displacement: HypotheticalDisplacement): boolean {
    // TODO: Check for valid key once keys exist
    // TODO: Check if there's a piece here and check movement rights
    return !!displacement.square;
  }

  canStay(_displacement: HypotheticalDisplacement): boolean {
    return true;
  }

  canContinue(_displacement: HypotheticalDisplacement): boolean {
    return true;
  }

  go({
    from,
    direction,
    board,
  }: {
    from: Square;
    direction: Direction;
    board: Board;
  }): Square[] {
    return (
      from.adjacencies[direction]
        ?.map((location) => board.squareAt(location))
        .filter(isPresent) || []
    );
  }
}
