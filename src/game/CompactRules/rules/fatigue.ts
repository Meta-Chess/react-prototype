import { PieceName, TokenName } from "game/types";
import { Piece } from "game/Board";
import {
  InPostMoveGenerationFilter,
  OnGaitsGeneratedModify,
  ParameterRule,
  PostMove,
} from "../CompactRules";
import { isPresent } from "utilities";

export const fatigue: ParameterRule<"fatigue"> = ({ "True Fatigue": trueFatigue }) => ({
  title: "Fatigue",
  description: "Pieces can't be moved twice in a row, unless they can kill the king.",
  postMove: ({ game, interrupt, board, move, turnIndexes }): PostMove => {
    board
      .piecesBelongingTo(game.getCurrentPlayerName())
      .forEach((piece) => piece.removeTokensByName(TokenName.Fatigue));

    if (!move) return { game, interrupt, board, move, turnIndexes };

    const piecesMoved = move.pieceDeltas
      .map((delta) => board.pieces[delta.pieceId])
      .filter(isPresent);
    piecesMoved.forEach((piece: Piece) => {
      const fatigueToken = {
        name: TokenName.Fatigue,
        expired: (): boolean => false,
        data: undefined,
      };
      piece.addToken(fatigueToken, true);
    });
    return { game, interrupt, board, move, turnIndexes };
  },
  onGaitsGeneratedModify: ({ game, piece, gaits }): OnGaitsGeneratedModify =>
    /* Fatigued pieces can only move to capture king */
    piece.hasTokenWithName(TokenName.Fatigue)
      ? {
          game,
          gaits: gaits
            .filter((g) => !g.mustNotCapture)
            .map((g) => {
              return {
                ...g,
                mustCapture: true,
                mustNotCapture: trueFatigue,
              };
            }),
          piece,
        }
      : { game, piece, gaits },
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
