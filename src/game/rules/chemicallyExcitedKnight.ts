import { PieceName, TokenName, AnimationType, PieceVisualData } from "game/types";
import { Rule } from "./CompactRules";
import { Pather } from "game/Pather";
import { Board } from "game/Board";
import { standardKingStep } from "./utilities";

export const chemicallyExcitedKnight: Rule = {
  title: "Chemically Excited Knight",
  //thinking maybe have this variant be 'see' 3 enemy pieces (with scanner update)
  description: "Knights that could capture 3 enemy pieces explode.",
  postMove: ({ game, interrupt, board, move, currentTurn }) => {
    const triggeredKnights: { [id: string]: undefined } = {}; //piece ids
    const deadPieces: { [id: string]: undefined } = {}; //piece ids
    const addVisualToSquares: string[] = []; //locations

    const pieces = board.pieces;
    Object.values(pieces)
      .filter((piece) => piece.name === PieceName.Knight)
      .forEach((knight) => {
        const moves = new Pather(game, [], knight, interrupt, {
          checkDepth: 0,
        }).findPaths();
        if (
          moves.filter(
            (m) =>
              m.pieceDeltas.filter(
                (delta) =>
                  board
                    .getPiecesAt(delta.path.getEnd())
                    .filter((p) => p.owner !== knight.owner).length > 0
              ).length > 0
          ).length > 2 // more than 2 enemy piece captures possible
        ) {
          triggeredKnights[knight.id] = undefined;
          const explosionSquareLocations = standardKingStep(
            board,
            board.squareAt(knight.location)
          );
          addVisualToSquares.push(knight.location);
          explosionSquareLocations.forEach((location) => {
            const pieces = board.getPiecesAt(location);
            if (pieces.length > 0) {
              deadPieces[pieces[0].id] = undefined; //todo: handle chess+
            }
            addVisualToSquares.push(location);
          });
        }
      });

    Object.keys(triggeredKnights).map((pieceId) => {
      const knight = board.getPiece(pieceId);
      if (knight === undefined) return;
      board.killPiecesAt(knight.location);
      const knightVisuals = {
        owner: knight.owner,
        type: PieceName.Knight,
        fatigued: knight.hasTokenWithName(TokenName.Fatigue),
        outlineColorChange: "rgba(235,52,52,1)",
      };
      addPieceVisualToSquare(board, knight.location, knightVisuals); //todo: handle chess+ piece visuals
    });
    Object.keys(deadPieces).map((pieceId) => {
      const piece = board.getPiece(pieceId);
      if (piece === undefined) return;
      board.killPiecesAt(piece.location);
      const pieceVisuals = {
        owner: piece.owner,
        type: piece.name,
        fatigued: piece.hasTokenWithName(TokenName.Fatigue),
      };
      addPieceVisualToSquare(board, piece.location, pieceVisuals); //todo: handle chess+ for piece visuals
    });
    addVisualToSquares.map((location) => {
      addExplosionVisualToSquare(board, location);
    });

    return { game, interrupt, board, move, currentTurn };
  },
};

const preExplodeAnimationDuration = 500;
const explodeAnimationDuration = 1000;

//consider: maybe want to change expire time so that everything disappears when new move is made
//wouldn't want it to be reset by any random re-render though...
const addPieceVisualToSquare = (
  board: Board,
  squareLocation: string,
  pieceVisualData: PieceVisualData
): void => {
  const creationTimeInMilliseconds = Date.now();
  const duration = preExplodeAnimationDuration;
  board.squareAt(squareLocation)?.addToken({
    name: TokenName.AnimationToken,
    expired: () => Date.now() > creationTimeInMilliseconds + duration,
    data: {
      type: AnimationType.pieceAnimation,
      createdAt: creationTimeInMilliseconds,
      duration: duration,
      id: Math.random(), // TODO: We should change this sometime because collisions would be bad
      pieceVisualData: pieceVisualData,
    },
  });
};

const addExplosionVisualToSquare = (board: Board, squareLocation: string): void => {
  const creationTimeInMilliseconds = Date.now();
  const duration = explodeAnimationDuration;
  board.squareAt(squareLocation)?.addToken({
    name: TokenName.AnimationToken,
    expired: () => Date.now() > creationTimeInMilliseconds + duration,
    data: {
      type: AnimationType.explosion,
      createdAt: creationTimeInMilliseconds,
      duration: duration,
      delay: preExplodeAnimationDuration,
      id: Math.random(), // TODO: We should change this sometime because collisions would be bad
    },
  });
};
