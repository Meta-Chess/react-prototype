import { Color, Piece, SetState, State } from "domain/types";
import { phases } from "domain/variants";

export const onClickPiece = (
  gameState: State,
  setGameState: SetState,
  piece: Piece
) => () => {
  if (piece.color === Color.White) {
    phases[gameState.phase].onClickWhitePiece(gameState, setGameState, piece);
  }
  if (piece.color === Color.Black) {
    phases[gameState.phase].onClickBlackPiece(gameState, setGameState, piece);
  }
};
