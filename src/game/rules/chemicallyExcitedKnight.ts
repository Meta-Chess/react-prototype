import { PieceName, AnimationType, PieceAnimationType, Location } from "game/types";
import { Rule } from "./CompactRules";
import { Pather } from "game/Pather";
import { allAdjacencies, addAnimationTokenToSquare, doesCapture } from "./utilities";
import { uniq } from "lodash";

export const chemicallyExcitedKnight: Rule = {
  title: "Chemically Excited Knight",
  //thinking maybe have this variant be 'see' 3 enemy pieces (with scanner update)
  description: "Knights that could capture 3 enemy pieces explode.",

  inFindPathsModifyInputParams: () => ({ filterPacifistMoves: false }),

  postMove: ({ game, interrupt, board, move, currentTurn }) => {
    const triggeredKnights: { knightId: string; positionOnSquare: number }[] = [];
    const deadPieces: { deadPieceId: string; positionOnSquare: number }[] = [];
    const visualsToAddToSquare: Location[] = [];

    board
      .getPieces()
      .filter((piece) => piece.name === PieceName.Knight)
      .forEach((knight) => {
        const moves = new Pather(game, [], knight, interrupt, {
          checkDepth: 0,
          //todo: refactor - we need gameClones here or a better patherParams structure.
          //we might have intended behaviour by chance in this case, because chemKnight and noFork are related mechanics
          //but we should have a solution for if we wanted noForkSearch: true here.
          noForkSearch: false,
        }).findPaths();
        if (moves.filter(doesCapture).length > 2) {
          const knightSquarePieces = board.getPiecesAt(knight.location);
          knightSquarePieces.forEach((piece, index) => {
            if (piece.id === knight.id) {
              triggeredKnights.push({
                knightId: knight.id,
                positionOnSquare: index,
              });
            } else {
              deadPieces.push({
                deadPieceId: piece.id,
                positionOnSquare: index,
              });
            }
          });

          const otherExplosionSquareLocations = allAdjacencies(
            board,
            board.squareAt(knight.location)
          );

          visualsToAddToSquare.push(knight.location);
          otherExplosionSquareLocations.forEach((location) => {
            const pieces = board.getPiecesAt(location);
            pieces.forEach((piece, index) => {
              deadPieces.push({
                deadPieceId: piece.id,
                positionOnSquare: index,
              });
            });
            visualsToAddToSquare.push(location);
          });
        }
      });

    uniq(triggeredKnights).forEach(({ knightId, positionOnSquare }) => {
      const knight = board.getPiece(knightId);
      if (knight === undefined) return;
      const location = knight.location;
      board.killPiecesAt({ piecesLocation: location });
      const knightVisuals = {
        piece: knight.clone(),
        pieceAnimationType: PieceAnimationType.chemicallyExcited,
        positionOnSquare: positionOnSquare,
        outlineColorChange: "rgba(235,52,52,1)",
      };
      addAnimationTokenToSquare({
        board: board,
        squareLocation: location,
        duration: PRE_EXPLODE_ANIMATION_DURATION,
        delay: 0,
        animationType: undefined,
        pieceVisualData: knightVisuals,
      });
    });

    uniq(deadPieces).forEach(({ deadPieceId, positionOnSquare }) => {
      if (triggeredKnights.some(({ knightId }) => knightId === deadPieceId)) return;
      const piece = board.getPiece(deadPieceId);
      if (piece === undefined) return;
      const location = piece.location;
      board.killPiecesAt({ piecesLocation: location });
      const pieceVisuals = {
        piece: piece.clone(),
        pieceAnimationType: PieceAnimationType.chemicallyExcited,
        positionOnSquare: positionOnSquare,
      };
      addAnimationTokenToSquare({
        board: board,
        squareLocation: location,
        duration: PRE_EXPLODE_ANIMATION_DURATION,
        delay: 0,
        animationType: undefined,
        pieceVisualData: pieceVisuals,
      });
    });

    visualsToAddToSquare.forEach((location) => {
      addAnimationTokenToSquare({
        board: board,
        squareLocation: location,
        duration: EXPLODE_ANIMATION_DURATION,
        delay: PRE_EXPLODE_ANIMATION_DURATION,
        animationType: AnimationType.explosion,
      });
    });

    return { game, interrupt, board, move, currentTurn };
  },
};

const PRE_EXPLODE_ANIMATION_DURATION = 500;
const EXPLODE_ANIMATION_DURATION = 1000;
