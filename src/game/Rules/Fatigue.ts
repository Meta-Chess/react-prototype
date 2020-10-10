import { PieceName, TokenName } from "../types";
import { Piece } from "../Board";
import { Rule } from "./Rules";

export const Fatigue: Rule = {
  name: "Fatigue",
  description:
    "Moving is hard work! If you moved one of your pieces last turn, it's too tired to move this turn.",
  postMove: ({ board, move, currentTurn }) => {
    const piecesMoved = move.pieceDeltas.map((delta) => board.pieces[delta.pId]);
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
          gaits: gaits.map((g) => {
            return { ...g, mustCapture: true };
          }),
          piece,
        }
      : { piece, gaits },
  inCanStayFilter: ({ move, game, gameClones, interrupt, patherParams, filtered }) => {
    /* Fatigued pieces can only move to capture king */
    const movedPieceId = move.pieceDeltas
      .filter((pd) => pd.destination === move.location)
      .map((pd) => pd.pId)
      .pop();
    const movedPiece = movedPieceId ? game.board.findPieceById(movedPieceId) : undefined;
    if (movedPiece?.hasTokenWithName(TokenName.Fatigue)) {
      const kings = game.board.getPieces().filter((p) => p.name === PieceName.King);
      filtered = !game.board.squares[move.location].hasPieceOf(kings);
    }
    return { move, game, gameClones, interrupt, patherParams, filtered };
  },
};
