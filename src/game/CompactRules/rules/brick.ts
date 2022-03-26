import { PieceName } from "game/types";
import {
  Rule,
  OnGaitsGeneratedModify,
  InPostMoveGenerationFilter,
} from "../CompactRules";
import { TrivialParameterRule } from "game";
import { isPieceNameCaptured } from "../utilities";

export const brick: TrivialParameterRule = (): Rule => {
  return {
    title: "Brick",
    description: "Rooks cannot initiate capture or be captured",
    onGaitsGeneratedModify: ({ game, gaits, piece }): OnGaitsGeneratedModify => {
      if (piece.name === PieceName.Rook) {
        gaits = gaits.flatMap((gait) => [{ ...gait, mustNotCapture: true }]);
      }

      return {
        game: game,
        gaits: gaits,
        piece: piece,
      };
    },
    inPostMoveGenerationFilter: (input): InPostMoveGenerationFilter => {
      if (input.filtered) return input;
      const board = input.game.board;

      return {
        ...input,
        filtered: isPieceNameCaptured(input.move, board, PieceName.Rook),
      };
    },
  };
};
