import { PopUp, State } from "domain/types";
import update from "immutability-helper";

export const setPopUp = (state: State, popUp: PopUp): State => {
  return update(state, {
    popUp: { $set: popUp },
  });
};
