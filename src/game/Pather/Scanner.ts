import { isPresent } from "utilities";
import { Board, Piece, Square } from "../Board";
import { Direction } from "../types";

const MAX_STEPS = 64; // TODO: find a good number or something

export class Scanner {
  constructor(private board: Board, private piece: Piece) {}

  scan(input: { pattern: Direction[]; pieceMatcher: (p: Piece) => boolean }): Piece[] {
    return this.recursiveScan(input);
  }

  recursiveScan({
    pattern,
    currentSquare = this.board.squareAt(this.piece.location),
    remainingSteps = pattern,
    stepAllowance = MAX_STEPS,
    pieceMatcher = (): boolean => true,
  }: {
    pattern: Direction[];
    currentSquare?: Square;
    remainingSteps?: Direction[];
    stepAllowance?: number;
    pieceMatcher: (p: Piece) => boolean;
  }): Piece[] {
    if (stepAllowance === 0 || remainingSteps.length === 0 || !currentSquare) {
      return [];
    }

    const matchingPieces = currentSquare.findPiecesByRule(pieceMatcher);
    if (matchingPieces.length !== 0) {
      return matchingPieces; // We terminate the scan when we find a matching piece - this can be changed
    }

    const continuingSquares = this.go({
      from: currentSquare,
      direction: remainingSteps[0],
    });
    remainingSteps = this.updateRemainingSteps({ pattern, remainingSteps });

    return continuingSquares.flatMap((square) =>
      this.recursiveScan({
        pattern,
        currentSquare: square,
        remainingSteps,
        stepAllowance: stepAllowance - 1,
        pieceMatcher,
      })
    );
  }

  // TODO: This is duplicate code - investigate
  go({ from, direction }: { from: Square; direction: Direction }): Square[] {
    return (
      from.adjacencies
        .go(direction)
        ?.map((location) => this.board.squareAt(location))
        .filter(isPresent) || []
    );
  }

  updateRemainingSteps(input: {
    pattern: Direction[];
    remainingSteps: Direction[];
  }): Direction[] {
    const { pattern, remainingSteps } = input;
    // Currently assumes the pattern always repeats for a scan - probably change that...
    const repeat = remainingSteps.length === 1;
    return repeat ? pattern : remainingSteps.slice(1);
  }
}
