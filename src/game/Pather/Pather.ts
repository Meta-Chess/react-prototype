import { isPresent } from "utilities";
import { CompactRules, Game, Piece, Square } from "game";
import { Direction, Gait, Move } from "../types";
import { flatMap } from "lodash";

const MAX_STEPS = 64; // To be considered further

export class Pather {
  constructor(
    private game: Game,
    private gameClones: Game[] = [game.clone(), game.clone(), game.clone(), game.clone()],
    private piece: Piece,
    private interrupt: CompactRules,
    private params: { checkDepth?: number } = {}
  ) {}

  findPaths(): Move[] {
    const currentSquare = this.game.board.squareAt(this.piece.location);
    if (!currentSquare) return [];

    const { gaits } = this.interrupt.for.onGaitsGeneratedModify({
      gaits: this.piece.generateGaits(),
      piece: this.piece,
    });

    const moves = flatMap(gaits, (gait) => this.path({ currentSquare, gait })).map(
      (square) => ({
        location: square.location,
        pieceDeltas: [{ piece: this.piece, destination: square.location }],
        player: this.piece.owner,
      })
    );

    let { moves: specialMoves } = this.interrupt.for.generateSpecialMoves({
      game: this.game,
      piece: this.piece,
      interrupt: this.interrupt,
      moves: [],
    });

    specialMoves = specialMoves.filter((m) => {
      const m1: Move = {
        location: m.location,
        pieceDeltas: m.pieceDeltas.map((p) => ({
          piece: p.piece.clone(),
          destination: p.destination,
        })),
        player: m.player,
      };
      return !this.interrupt.for.inCanStayFilter({
        move: m1,
        game: this.game,
        gameClones: this.gameClones,
        interrupt: this.interrupt,
        patherParams: this.params,
        filtered: false,
      }).filtered;
    });

    return moves.concat(specialMoves);
  }

  path({
    gait,
    currentSquare = this.game.board.squareAt(this.piece.location),
    remainingSteps = gait.pattern,
    stepAllowance = MAX_STEPS,
  }: {
    gait: Gait;
    currentSquare?: Square;
    remainingSteps?: Direction[];
    stepAllowance?: number;
  }): Square[] {
    const allowableSquares: Square[] = [];
    if (!currentSquare) return allowableSquares;
    const pieceClone = this.piece.clone();
    for (let steps = 0; steps < stepAllowance; steps++) {
      if (remainingSteps.length === 0) return allowableSquares;

      pieceClone.resetTo(this.piece);
      const { continuingSquares, newAllowableSquares } = this.step({
        currentSquare,
        remainingSteps,
        gait,
        pieceClone,
      });

      allowableSquares.push(...newAllowableSquares);

      remainingSteps = this.updateRemainingSteps({ gait, remainingSteps });

      if (continuingSquares.length === 0) return allowableSquares;
      ({ gait, remainingSteps, currentSquare } = this.interrupt.for.afterStepModify({
        gait,
        remainingSteps,
        currentSquare: continuingSquares[0], // Later: Handle multiple continuing squares
      }));
    }

    return allowableSquares;
  }

  step({
    currentSquare,
    remainingSteps,
    gait,
    pieceClone,
  }: {
    currentSquare: Square;
    remainingSteps: Direction[];
    gait: Gait;
    pieceClone: Piece;
  }): { continuingSquares: Square[]; newAllowableSquares: Square[] } {
    const possibleLandingSquares = this.go({
      from: currentSquare,
      direction: remainingSteps[0],
    });
    const landingSquares = possibleLandingSquares.filter((square) =>
      this.canLand({ square, gait, remainingSteps })
    );
    const stayingSquares = landingSquares.filter((square) =>
      this.canStay({ square, gait, remainingSteps, pieceClone })
    );
    const continuingSquares = landingSquares.filter((square) =>
      this.canContinue({ square, gait, remainingSteps })
    );

    return {
      continuingSquares,
      newAllowableSquares: stayingSquares,
    };
  }

  canLand(_displacement: HypotheticalDisplacement): boolean {
    // TODO: Check for valid key once keys exist
    return true;
  }

  canStay({
    square,
    gait,
    remainingSteps,
    pieceClone = this.piece.clone(),
  }: HypotheticalDisplacement): boolean {
    if (!gait.interruptable && remainingSteps.length > 1) return false;
    if (square.hasPieceBelongingTo(this.piece.owner)) return false;
    if (square.hasPieceNotBelongingTo(this.piece.owner)) {
      // TODO: change this out for "hasCapturablePiece method"
      if (gait.mustNotCapture) return false;
    } else {
      if (gait.mustCapture) return false;
    }
    pieceClone.resetTo(this.piece);
    const { filtered } = this.interrupt.for.inCanStayFilter({
      move: {
        location: square.location,
        pieceDeltas: [{ piece: pieceClone, destination: square.location }],
        player: this.piece.owner,
      },
      game: this.game,
      gameClones: this.gameClones,
      interrupt: this.interrupt,
      patherParams: this.params,
      filtered: false,
    });
    return !filtered;
  }

  canContinue({ gait, square }: HypotheticalDisplacement): boolean {
    if (square.hasPiece() && !gait.nonBlocking) return false;
    return true;
  }

  go({ from, direction }: { from: Square; direction: Direction }): Square[] {
    return (
      from.adjacencies
        .go(direction)
        ?.map((location) => this.game.board.squareAt(location))
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
  pieceClone?: Piece;
}
