import { isPresent } from "utilities";
import { CompactRules, Game, Piece, Square } from "game";
import { Direction, Gait, Move, TokenName } from "../types";
import { flatMap } from "lodash";
import { Path } from "./Path";

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

    const moves: Move[] = flatMap(gaits, (gait) => {
      return this.path({ currentSquare, gait }).map((path) => {
        return { path, gait };
      });
    }).map(({ path, gait }) => ({
      pieceId: this.piece.id,
      location: path.getEnd(),
      pieceDeltas: [{ pId: this.piece.id, path }],
      player: this.piece.owner,
      data: gait.data,
    }));

    let { moves: specialMoves } = this.interrupt.for.generateSpecialMoves({
      game: this.game,
      piece: this.piece,
      interrupt: this.interrupt,
      moves: [],
    });

    specialMoves = specialMoves.filter((m) => {
      return !this.interrupt.for.inCanStayFilter({
        move: m,
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
  }): Path[] {
    const allowablePaths: Path[] = [];

    if (!currentSquare) return allowablePaths;
    const pathSoFar: Path = new Path(currentSquare.location);

    for (let steps = 0; steps < stepAllowance; steps++) {
      if (remainingSteps.length === 0) return allowablePaths;

      const { continuingSquares, newAllowableSquares } = this.step({
        currentSquare,
        pathSoFar,
        remainingSteps,
        gait,
      });

      allowablePaths.push(
        ...newAllowableSquares.map((square) => {
          const path = pathSoFar.clone();
          path.push(square.location);
          return path;
        })
      );

      remainingSteps = this.updateRemainingSteps({ gait, remainingSteps });

      if (continuingSquares.length === 0) return allowablePaths;
      ({ gait, remainingSteps, currentSquare } = this.interrupt.for.afterStepModify({
        gait,
        remainingSteps,
        currentSquare: continuingSquares[0], // Later: Handle multiple continuing squares
      }));

      pathSoFar.push(currentSquare.location);
    }

    return allowablePaths;
  }

  step({
    currentSquare,
    pathSoFar,
    remainingSteps,
    gait,
  }: {
    currentSquare: Square;
    remainingSteps: Direction[];
    gait: Gait;
    pathSoFar: Path;
  }): { continuingSquares: Square[]; newAllowableSquares: Square[] } {
    const possibleLandingSquares = this.go({
      from: currentSquare,
      direction: remainingSteps[0],
    });
    const landingSquares = possibleLandingSquares.filter((square) =>
      this.canLand({ square, pathSoFar, gait, remainingSteps })
    );
    const stayingSquares = landingSquares.filter((square) =>
      this.canStay({ square, pathSoFar, gait, remainingSteps })
    );
    const continuingSquares = landingSquares.filter((square) =>
      this.canContinue({ square, pathSoFar, gait, remainingSteps })
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
    pathSoFar,
    gait,
    remainingSteps,
  }: HypotheticalDisplacement): boolean {
    if (!gait.interruptable && remainingSteps.length > 1) return false;
    if (this.game.board.squareHasPieceBelongingTo(square, this.piece.owner)) return false;
    if (this.game.board.squareHasPieceNotBelongingTo(square, this.piece.owner)) {
      // TODO: change this out for "hasCapturablePiece method"
      if (gait.mustNotCapture) return false;
    } else if (square.hasTokenWithName(TokenName.CaptureToken)) {
      const token = square.firstTokenWithName(TokenName.CaptureToken);
      if (token?.data?.condition?.(this.piece)) {
        const capturablePiece = token?.data?.pieceId
          ? this.game.board.findPieceById(token?.data?.pieceId)
          : undefined;
        if (capturablePiece?.owner === this.piece.owner || gait.mustNotCapture)
          return false;
      }
    } else if (gait.mustCapture) return false;

    const hypotheticalPath = pathSoFar.clone();
    hypotheticalPath.push(square.location);

    const { filtered } = this.interrupt.for.inCanStayFilter({
      move: {
        pieceId: this.piece.id,
        location: square.location,
        pieceDeltas: [{ pId: this.piece.id, path: hypotheticalPath }],
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
    return !(square.hasPiece() && !gait.nonBlocking);
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
  pathSoFar: Path;
  gait: Gait;
  remainingSteps: Direction[];
}
