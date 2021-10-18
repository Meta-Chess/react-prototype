import { Pather } from "game/Pather";
import { PieceName, Gait, TokenName } from "game/types";
import {
  Rule,
  TrivialParameterRule,
  TurnStartPreprocessing,
  OnGaitsGeneratedModify,
} from "../CompactRules";
import { clone } from "lodash";

export const puppeteers: TrivialParameterRule = (): Rule => {
  return {
    title: "Puppeteers",
    description: "Pieces seen by friendly knights can move as the knights",
    turnStartPreprocessing: ({ game, gameClones }): TurnStartPreprocessing => {
      const friendlyKnights = game.board.getPiecesByRule(
        (p) => p.name === PieceName.Knight && p.owner === game.currentPlayerIndex
      );
      const rememberedGaits = friendlyKnights.map((knight) => knight.generateGaits());

      // changing knight gaits to scanner gaits
      friendlyKnights.forEach(
        (knight, i) =>
          (knight.generateGaits = (): Gait[] =>
            clone(rememberedGaits[i]).flatMap((gait) => [{ ...gait, phaser: true }]))
      );

      const newCompactRules = game.interrupt.cloneWithoutRule("puppeteers");
      const knightsScanMoves = friendlyKnights.map((knight) => {
        return new Pather(game, gameClones, knight, newCompactRules).findPaths();
      });

      const board = game.board;
      const knightsDefendedPieces = knightsScanMoves.map((knightMoves) =>
        knightMoves.flatMap((move) =>
          move.pieceDeltas.flatMap((delta) => {
            const endLocation = delta.path.getEnd();
            const pieces = board.getPiecesAt(endLocation);
            const friendlyPieces = pieces.filter(
              (piece) => piece.owner === game.currentPlayerIndex
            );
            return friendlyPieces;
          })
        )
      );

      // changing knight gaits back to normal
      friendlyKnights.map(
        (knight, i) => (knight.generateGaits = (): Gait[] => rememberedGaits[i])
      );

      knightsDefendedPieces.map((defendedPieces, i) =>
        defendedPieces.map((defendedPiece) => {
          const puppeteeredToken = {
            name: TokenName.Puppeteered,
            expired: (turn: number): boolean => {
              return turn >= game.currentTurn;
            },
            data: {
              pieceId: friendlyKnights[i].id,
            },
          };
          defendedPiece.addToken(puppeteeredToken);
        })
      );

      return { game, gameClones };
    },
    onGaitsGeneratedModify: ({ game, gaits, piece }): OnGaitsGeneratedModify => {
      const puppeteerTokens = piece.tokensSatisfyingRule(
        (t) => t.name === TokenName.Puppeteered
      );
      const board = game.board;
      const puppeteerPieces = puppeteerTokens.flatMap((token) => {
        const pieceId = token.data?.pieceId;
        return pieceId ? board.getPiece(pieceId) ?? [] : [];
      });
      return {
        game,
        gaits: [...gaits, ...puppeteerPieces.flatMap((piece) => piece?.generateGaits())],
        piece,
      };
    },
  };
};
