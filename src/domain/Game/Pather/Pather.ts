import { isPresent, applyInSequence } from "utilities";
import { Piece, Square, Board } from "../Board";
import { Gait, GaitParams, PieceType, Variant } from "../types";
import { Direction } from "../Direction";
import { flatMap } from "lodash";

const MAX_STEPS = 64; // TODO: find a good number or something

export class Pather {
  private gaitParams: GaitParams;

  constructor(private board: Board, private piece: Piece, private variants: Variant[]) {
    this.gaitParams = {};
    if (piece.type === PieceType.Pawn) {
      this.gaitParams.pawnDoubleStep = piece?.attributes?.pawnDoubleStep;
    }
  }

  findPaths(): string[] {
    const currentSquare = this.board.squareAt(this.piece.location);
    if (!currentSquare) return [];
    const { gaits } = applyInSequence(
      this.variants?.map((v) => v?.onGaitGenerate),
      {
        gaits: this.piece.generateGaits(this.gaitParams),
        piece: this.piece,
      }
    );
    return flatMap(gaits, (gait) => this.path({ currentSquare, gait })).map(
      (square) => square.location
    );
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
      ...flatMap(continuingSquares, (square) =>
        this.path({
          gait,
          currentSquare: square,
          remainingSteps,
          stepAllowance: stepAllowance - 1,
        })
      ),
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
    // TODO: Check if there's a piece here and check stepment rights
    return true;
  }

  canStay({ square, gait, remainingSteps }: HypotheticalDisplacement): boolean {
    if (!gait.interuptable && remainingSteps.length > 1) return false;
    if (square.hasPieceBelongingTo(this.piece.owner)) return false;
    return true;
  }

  canContinue({ gait, square }: HypotheticalDisplacement): boolean {
    if (square.hasPiece() && !gait.nonBlocking) return false;
    return true;
  }

  go({ from, direction }: { from: Square; direction: Direction }): Square[] {
    return (
      from.adjacencies[direction]
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
