import { SetState, State } from "domain/types";
import update from "immutability-helper";
import { phases } from "domain/variants";

export const nextPhase = (state: State, setState: SetState): State => {
  const currentPhaseIndex = state.phases.findIndex((p) => p === state.phase);
  const nextPhase = state.phases[(currentPhaseIndex + 1) % state.phases.length];

  state = phases[state.phase].onPhaseEnd(state, setState);
  state = update(state, {
    phase: {
      $set: nextPhase,
    },
  });
  state = phases[nextPhase].onPhaseStart(state, setState);

  return state;
};
