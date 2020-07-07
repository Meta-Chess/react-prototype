import { Piece, SetState, Square, State } from "domain/types";
import * as Squares from "domain/elements/Square";
import * as Pieces from "domain/elements/Piece";
import * as Phases from "domain/gamePhase";

export const blackMove = {
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
  onClickSquare: (state: State, setState: SetState, square: Square): State => {
    if (Squares.containsBlack(state, square)) return state;

    state = Pieces.killPiecesOn(state, square);
    state = Pieces.moveActiveTo(state, square);
    state = Phases.nextPhase(state, setState);
    setState(state);
    return state;
  },
};
