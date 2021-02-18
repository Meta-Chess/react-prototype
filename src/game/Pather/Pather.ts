import { isPresent } from "utilities";
import { CompactRules, Game, Piece, Square } from "game";
import { Direction, Gait, TokenName } from "../types";
import { clone, flatMap } from "lodash";
import { Path } from "./Path";
import { Move } from "game/Move";

export interface PatherParams {
  checkDepth?: number;
  noForkSearch?: boolean;
  chainReactionSearch?: boolean;
}

const MAX_STEPS = 64; // To be considered further

export class Pather {
  constructor(
    private game: Game,
    private gameClones: Game[] = [game.clone(), game.clone(), game.clone(), game.clone()],
    private piece: Piece,
    private interrupt: CompactRules,
    private params: PatherParams = {}
  ) {}

  findPaths({ filterPacifistMoves } = { filterPacifistMoves: false }): Move[] {
    filterPacifistMoves = this.interrupt.for.inFindPathsModifyInputParams({
      filterPacifistMoves: filterPacifistMoves,
    }).filterPacifistMoves;

    const currentSquare = this.game.board.squareAt(this.piece.location);
    if (!currentSquare) return [];

    const allGaits = this.interrupt.for.onGaitsGeneratedModify({
      gaits: this.piece.generateGaits(),
      piece: this.piece,
    }).gaits;

    const gaits = filterPacifistMoves
      ? allGaits.filter((g) => !g.mustNotCapture)
      : allGaits;

    const moves: Move[] = flatMap(gaits, (gait) => {
      return this.path({ currentSquare, gait }).map((path) => ({ path, gait }));
    }).flatMap(({ path, gait }) =>
      this.handlePieceCollisions(
        {
          pieceId: this.piece.id,
          location: path.getEnd(),
          pieceDeltas: [{ pieceId: this.piece.id, path }],
          playerName: this.piece.owner,
          data: gait.data,
          captures: undefined,
        },
        gait
      )
    );

    const specialPacifistMoves = filterPacifistMoves
      ? []
      : this.interrupt.for.generateSpecialPacifistMoves({
          game: this.game,
          piece: this.piece,
          interrupt: this.interrupt,
          moves: [],
        }).moves;

    const allMoves = moves.concat(specialPacifistMoves);

    const processedMoves = this.interrupt.for.processMoves({
      moves: allMoves,
      game: this.game,
      gameClones: this.gameClones,
      params: this.params,
    }).moves;

    return processedMoves.filter((m) => this.postMoveGenerationFilter(m));
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
    const landingSquares = this.go({
      from: currentSquare,
      direction: remainingSteps[0],
    });
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

  canStay({ gait, remainingSteps }: HypotheticalDisplacement): boolean {
    if (!gait.interruptable && remainingSteps.length > 1) return false;
    return true;
  }

  canContinue({ gait, square }: HypotheticalDisplacement): boolean {
    return !(square.hasPiece() && !gait.nonBlocking);
  }

  postMoveGenerationFilter(move: Move): boolean {
    const board = this.game.board;
    for (let i = 0; i < move.pieceDeltas.length; i++) {
      const piece = board.findPieceById(move.pieceDeltas[i].pieceId);
      const square = board.squareAt(move.pieceDeltas[i].path.getEnd());

      if (!piece || !square) return false;

      if (
        !piece.AccessMarkers.some((marker) => square.whiteListedMarkers.includes(marker))
      )
        return false;
    }
    const { filtered } = this.interrupt.for.inPostMoveGenerationFilter({
      move,
      game: this.game,
      gameClones: this.gameClones,
      interrupt: this.interrupt,
      patherParams: this.params,
      filtered: false,
    });
    return !filtered;
  }

  // TODO: handle moves that self interfere better.
  handlePieceCollisions(move: Move, gait: Gait): Move[] {
    const terminalSquare = this.game.board.squareAt(move.pieceDeltas[0].path.getEnd());
    if (!terminalSquare) return [];

    // what's on the square?
    const optionalCapturePossible = this.optionalCapturePossible(
      terminalSquare,
      this.piece
    );
    const enemiesPresent = this.game.board.squareHasPieceNotBelongingTo(
      terminalSquare,
      move.playerName
    );
    const friendliesPresent = this.game.board.squareHasPieceBelongingTo(
      terminalSquare,
      move.playerName
    );

    // what moves am I allowed to make?
    const canMovePassively =
      !gait.mustCapture && (gait.phaser || (!enemiesPresent && !friendliesPresent));
    const canCaptureNormally =
      !gait.mustNotCapture && (!friendliesPresent || gait.phaser) && enemiesPresent;
    const mayMakeOptionalCapture =
      !gait.mustNotCapture && (!friendliesPresent || gait.phaser);

    // what moves are theoretically possible?
    const passiveMove = canMovePassively ? move : undefined;
    const captureMove: Move | undefined = canCaptureNormally
      ? {
          ...clone(move),
          captures: [
            {
              at: terminalSquare.location,
              pieceIds: this.game.board
                .getEnemyPiecesAt(terminalSquare.location, move.playerName)
                .map((p) => p.id),
              capturer: move.playerName,
            },
          ],
        }
      : undefined;
    const optionalCaptureMove: Move | undefined =
      mayMakeOptionalCapture && !!optionalCapturePossible
        ? {
            ...clone(move),
            captures: [{ ...optionalCapturePossible, capturer: move.playerName }],
          }
        : undefined;
    const optionalCaptureAndCaptureMove =
      optionalCaptureMove?.captures && captureMove?.captures
        ? {
            ...clone(move),
            captures: [...captureMove.captures, ...optionalCaptureMove.captures],
          }
        : undefined;

    return [
      passiveMove,
      captureMove,
      optionalCaptureMove,
      optionalCaptureAndCaptureMove,
    ].filter(isPresent);
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

  private optionalCapturePossible(
    square: Square,
    piece: Piece = this.piece
  ): { at: string; pieceIds: string[] } | false {
    return (
      square?.tokens
        .filter((token) => token.name === TokenName.CaptureToken)
        .map((token) => {
          const pieceId = token?.data?.pieceId;
          return token?.data?.condition?.(piece) && pieceId
            ? { at: square.location, pieceIds: [pieceId] }
            : false;
        })
        .find((optionalCapturePossible) => optionalCapturePossible) || false
    );
  }
}

interface HypotheticalDisplacement {
  square: Square;
  pathSoFar: Path;
  gait: Gait;
  remainingSteps: Direction[];
}
