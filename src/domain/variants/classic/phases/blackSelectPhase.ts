import { Piece, SetState, Square, State } from "domain/types";
import * as Pieces from "domain/elements/Piece";
import * as Phases from "domain/gamePhase";

export const blackSelect = {
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
    setState: SetState,
    piece: Piece
  ): State => {
    state = Pieces.activate(state, piece);
    state = Phases.nextPhase(state, setState);
    setState(state);
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
