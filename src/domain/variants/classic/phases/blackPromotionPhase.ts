import { Color, Piece, SetState, Square, State } from "domain/types";
import * as Phases from "domain/gamePhase";
import { possiblePromotions } from "domain/variants/classic/promotion";
import { PopUpEnum, setPopUp } from "domain/elements/PopUp";

export const blackPromotion = {
  onPhaseStart: (state: State, setState: SetState): State => {
    const promotablePieces = possiblePromotions(state, Color.Black);
    console.log(promotablePieces);
    if (promotablePieces.length) {
      state = setPopUp(state, {
        component: PopUpEnum.Promotion,
        meta: {
          piece: promotablePieces[0],
        },
      });
    } else {
      state = Phases.nextPhase(state, setState);
    }
    setState(state);
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
