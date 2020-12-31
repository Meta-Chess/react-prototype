import { TokenName } from "game/types";

// Keep moving tokens here

export const polarToken = {
  name: TokenName.PolarToken,
  expired: (): boolean => {
    return false;
  },
  data: undefined,
};

export const invisibilityToken = {
  name: TokenName.InvisibilityToken,
  expired: (): boolean => {
    return false;
  },
  data: undefined,
};

export const pawnDoubleStepToken = {
  name: TokenName.PawnDoubleStep,
  expired: (): boolean => {
    return false;
  },
  data: undefined,
};

export const activeCastlingToken = {
  name: TokenName.ActiveCastling,
  expired: (): boolean => {
    return false;
  },
  data: undefined,
};

export const passiveCastlingToken = {
  name: TokenName.PassiveCastling,
  expired: (): boolean => {
    return false;
  },
  data: undefined,
};

export const evadeToken = {
  name: TokenName.EvadeToken,
  expired: (): boolean => {
    return false;
  },
  data: undefined,
};
