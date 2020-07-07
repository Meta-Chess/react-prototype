import { Color, Piece, PieceType, State } from "domain/types";

export const possiblePromotions = (state: State, color: Color): Piece[] => {
  const promotionRowIndex = color === Color.White ? 7 : 0;
  return state.pieces
    .filter((p) => p.location.y === promotionRowIndex)
    .filter((p) => p.color === color)
    .filter((p) => p.alive)
    .filter((p) => p.type === PieceType.Pawn);
};
