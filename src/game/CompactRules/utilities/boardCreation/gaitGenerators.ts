import { PlayerName } from "game/types";
import { determineGaitGenerator, PieceSet } from "game/CompactRules/utilities";
import type { GetGaitGenerator } from "game/CompactRules";

export function GET_GAIT_GENERATOR({
  gaitGenerator,
  name,
  owner,
  set,
}: GetGaitGenerator & { set: PieceSet }): GetGaitGenerator {
  return {
    gaitGenerator: determineGaitGenerator({
      gaitGenerators: gaitGenerator ? [gaitGenerator] : [],
      name,
      owner: owner || PlayerName.White,
      set,
    }),
    name,
    owner,
  };
}
