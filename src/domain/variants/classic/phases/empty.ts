import { Piece, SetState, Square, State } from "domain/types";

export const empty = {
  onPhaseStart: (state: State, _setState: SetState): State => {
    return state;
  },
  onPhaseEnd: (state: State, _setState: SetState): State => {
    return state;
  },
  onClickWhitePiece: (
    state: State,
    _setState: SetState,
    _piece: Piece
  ): State => {
    return state;
  },
  onClickBlackPiece: (
    state: State,
    _setState: SetState,
    _piece: Piece
  ): State => {
    return state;
  },
  onClickSquare: (
    state: State,
    _setState: SetState,
    _square: Square
  ): State => {
    return state;
  },
};
