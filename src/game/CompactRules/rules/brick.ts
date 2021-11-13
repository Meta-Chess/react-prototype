import { PieceName } from "game/types";
import {
  Rule,
  ParameterRule,
  OnGaitsGeneratedModify,
  InPostMoveGenerationFilter,
} from "../CompactRules";

export const brick: ParameterRule = (): Rule => {
  return {
    title: "Brick",
    description: "Rooks cannot initiate capture or be captured",
    onGaitsGeneratedModify: ({ gaits, piece }): OnGaitsGeneratedModify => {
      if (piece.name === PieceName.Rook) {
        gaits = gaits.flatMap((gait) => [{ ...gait, mustNotCapture: true }]);
      }

      return {
        gaits: gaits,
        piece: piece,
      };
    },
    inPostMoveGenerationFilter: (input): InPostMoveGenerationFilter => {
      if (input.filtered) return input;
      const board = input.game.board;

      return {
        ...input,
        filtered: !!input.move.captures?.some((data) =>
          data.pieceIds.some(
            (pieceId) => board?.getPiece(pieceId)?.name === PieceName.Rook
          )
        ),
      };
    },
  };
};
