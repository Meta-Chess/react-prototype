import { PieceName, TokenName } from "game/types";
import { Piece } from "game/Board";
import {
  ParameterRule,
  PostMove,
  OnGaitsGeneratedModify,
  InPostMoveGenerationFilter,
} from "../CompactRules";
import { isPresent } from "utilities";

export const fatigue: ParameterRule = () => ({
  title: "Fatigue",
  description:
    "Moving is hard work! If you moved one of your pieces last turn, it's too tired to move this turn (unless you can capture the king!)",
  postMove: ({ game, interrupt, board, move, currentTurn }): PostMove => {
    if (!move) return { game, interrupt, board, move, currentTurn };

    const piecesMoved = move.pieceDeltas
      .map((delta) => board.pieces[delta.pieceId])
      .filter(isPresent);
    piecesMoved.forEach((piece: Piece) => {
      const fatigueToken = {
        name: TokenName.Fatigue,
        expired: (turn: number): boolean => {
          return turn >= currentTurn + game.players.length;
        },
        data: undefined,
      };
      piece.addToken(fatigueToken, true);
    });
    return { game, interrupt, board, move, currentTurn };
  },
  onGaitsGeneratedModify: ({ piece, gaits }): OnGaitsGeneratedModify =>
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
  inPostMoveGenerationFilter: ({
    move,
    game,
    gameClones,
    interrupt,
    patherParams,
    filtered,
  }): InPostMoveGenerationFilter => {
    if (filtered) return { move, game, gameClones, interrupt, patherParams, filtered };
    /* Fatigued pieces can only move to capture king */
    let filter = false;
    const anyMoversFatigued = move.pieceDeltas.some((pd) =>
      game.board.getPiece(pd.pieceId)?.hasTokenWithName(TokenName.Fatigue)
    );
    if (anyMoversFatigued) {
      const anyKingCapture = move.captures
        ?.flatMap((cd) => cd.pieceIds)
        .map((pId) => game.board.getPiece(pId))
        .some((p) => isPresent(p) && p.name === PieceName.King);
      filter = !anyKingCapture;
    }
    return { move, game, gameClones, interrupt, patherParams, filtered: filter };
  },
});
