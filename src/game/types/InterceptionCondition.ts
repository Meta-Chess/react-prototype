import type { Piece } from "game/Board";
import { PieceName, PlayerName } from "./types";

export enum InterceptionConditionType {
  PawnDoubleStep,
  Generic,
}
export type InterceptionCondition = (piece: Piece) => boolean;

export interface InterceptionConditionBuilderParams {
  originalOwner: PlayerName;
}

export const interceptionConditionBuilders: {
  [key in InterceptionConditionType]: (
    params: InterceptionConditionBuilderParams
  ) => InterceptionCondition;
} = {
  [InterceptionConditionType.PawnDoubleStep]:
    (params) =>
    (piece: Piece): boolean => {
      return piece.name === PieceName.Pawn && piece.owner !== params.originalOwner;
    },
  [InterceptionConditionType.Generic]:
    (params) =>
    (piece: Piece): boolean => {
      return piece.owner !== params.originalOwner;
    },
};
