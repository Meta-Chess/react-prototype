import { applyInSequence, isPresent } from "utilities";
import { Board, Piece, Square } from "../Board";
import { Direction, Gait, Move, Rule } from "../types";
import { flatMap } from "lodash";

const MAX_STEPS = 64; // To be considered further

export class Pather {
  constructor(private board: Board, private piece: Piece, private rules: Rule[]) {}

  findPaths(): Move[] {
    const currentSquare = this.board.squareAt(this.piece.location);
    if (!currentSquare) return [];

    const { gaits } = applyInSequence(
      this.rules?.map((r) => r?.onGaitsGeneratedModify),
      {
        gaits: this.piece.generateGaits(),
        piece: this.piece,
      }
    );

    const moves = flatMap(gaits, (gait) => this.path({ currentSquare, gait })).map(
      (square) => ({
        location: square.location,
        pieceDeltas: [{ piece: this.piece, destination: square.location }],
      })
    );

    const specialMoves = this.rules?.flatMap(
      (r) =>
        r?.generateSpecialMoves?.({
          board: this.board,
          piece: this.piece,
          rules: this.rules,
        }) || []
    );

    return moves.concat(specialMoves);
  }

  path({
    gait,
    currentSquare = this.board.squareAt(this.piece.location),
    remainingSteps = gait.pattern,
    stepAllowance = MAX_STEPS,
  }: {
    gait: Gait;
    currentSquare?: Square;
    remainingSteps?: Direction[];
    stepAllowance?: number;
  }): Square[] {
    if (stepAllowance === 0 || remainingSteps.length === 0 || !currentSquare) {
      return [];
    }

    // prettier-ignore
    const { continuingSquares, allowableSquares } = 
      this.step({ currentSquare, remainingSteps, gait });

    remainingSteps = this.updateRemainingSteps({ gait, remainingSteps });

    return [
      ...allowableSquares,
      ...flatMap(continuingSquares, (square) => {
        ({ gait, remainingSteps, currentSquare } = applyInSequence(
          this.rules?.map((r) => r.afterStepModify),
          { gait, remainingSteps, currentSquare: square }
        ));

        return this.path({
          gait,
          currentSquare,
          remainingSteps,
          stepAllowance: stepAllowance - 1,
        });
      }),
    ];
  }

  step({
    currentSquare,
    remainingSteps,
    gait,
  }: {
    currentSquare: Square;
    remainingSteps: Direction[];
    gait: Gait;
  }): { continuingSquares: Square[]; allowableSquares: Square[] } {
    const possibleLandingSquares = this.go({
      from: currentSquare,
      direction: remainingSteps[0],
    });
    const landingSquares = possibleLandingSquares.filter((square) =>
      this.canLand({ square, gait, remainingSteps })
    );
    const stayingSquares = landingSquares.filter((square) =>
      this.canStay({ square, gait, remainingSteps })
    );
    const continuingSquares = landingSquares.filter((square) =>
      this.canContinue({ square, gait, remainingSteps })
    );

    return {
      continuingSquares,
      allowableSquares: stayingSquares,
    };
  }

  canLand(_displacement: HypotheticalDisplacement): boolean {
    // TODO: Check for valid key once keys exist
    return true;
  }

  canStay({ square, gait, remainingSteps }: HypotheticalDisplacement): boolean {
    if (!gait.interruptable && remainingSteps.length > 1) return false;
    if (square.hasPieceBelongingTo(this.piece.owner)) return false;
    if (square.hasPieceNotBelongingTo(this.piece.owner)) {
      // TODO: change this out for "hasCapturablePiece method"
      if (gait.mustNotCapture) return false;
    } else {
      if (gait.mustCapture) return false;
    }
    return true;
  }

  canContinue({ gait, square }: HypotheticalDisplacement): boolean {
    if (square.hasPiece() && !gait.nonBlocking) return false;
    return true;
  }

  go({ from, direction }: { from: Square; direction: Direction }): Square[] {
    return (
      from.adjacencies
        .go(direction)
        ?.map((location) => this.board.squareAt(location))
        .filter(isPresent) || []
    );
  }

  updateRemainingSteps(input: { gait: Gait; remainingSteps: Direction[] }): Direction[] {
    const { gait, remainingSteps } = input;
    const repeat = remainingSteps.length === 1 && gait.repeats;

    return repeat ? gait.pattern : remainingSteps.slice(1);
  }
}

interface HypotheticalDisplacement {
  square: Square;
  gait: Gait;
  remainingSteps: Direction[];
}
