import { PieceName, TokenName } from "../types";
import { Piece } from "../Board";
import { Rule } from "./Rules";
import { isPresent } from "utilities";

export const fatigue: Rule = {
  name: "Fatigue",
  description:
    "Moving is hard work! If you moved one of your pieces last turn, it's too tired to move this turn (unless you can capture the king!)",
  postMove: ({ board, move, currentTurn }) => {
    const piecesMoved = move.pieceDeltas
      .map((delta) => board.pieces[delta.pId])
      .filter(isPresent);
    piecesMoved.forEach((piece: Piece) => {
      const fatigueToken = {
        name: TokenName.Fatigue,
        expired: (turn: number): boolean => {
          return turn >= currentTurn + 2;
        },
        data: undefined,
      };
      piece.addToken(fatigueToken);
    });
    return { board, move, currentTurn };
  },
  onGaitsGeneratedModify: ({ piece, gaits }) =>
    /* Fatigued pieces can only move to capture king */
    piece.hasTokenWithName(TokenName.Fatigue)
      ? {
          gaits: gaits
            .filter((g) => !g.mustNotCapture)
            .map((g) => {
              return { ...g, mustCapture: true };
            }),
          piece,
        }
      : { piece, gaits },
  inCanStayFilter: ({ move, game, gameClones, interrupt, patherParams, filtered }) => {
    /* Fatigued pieces can only move to capture king */
    const movedPiece = game.board.findPieceById(move.pieceId);
    if (movedPiece && movedPiece.hasTokenWithName(TokenName.Fatigue)) {
      const capturedKings = game.board
        .getPieces()
        .filter(
          (piece) =>
            piece.name === PieceName.King &&
            piece.owner !== move.player &&
            piece.location === move.location
        );
      filtered = capturedKings.length === 0;
    }

    return { move, game, gameClones, interrupt, patherParams, filtered };
  },
};