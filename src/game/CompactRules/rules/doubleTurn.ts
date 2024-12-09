import { Rule } from "../CompactRules";
import { TrivialParameterRule } from "game";
import { GenerateSubTurns } from "../CompactRules";
import { SubTurnName } from "game/TurnController";
import { cloneDeep } from "lodash";

export const doubleTurn: TrivialParameterRule = (): Rule => {
  return {
    title: "Double Turn",
    description: "Double the number of turns for each player",
    generateSubTurns: ({ turnController }): GenerateSubTurns => {
      const upcomingSubTurns = turnController.getUpcomingSubTurns();
      const duplicatedAdditionalSubTurnInfo = cloneDeep(upcomingSubTurns);
      const additionalStandardTurn = { name: SubTurnName.Standard };

      turnController.updateSubTurns([
        ...upcomingSubTurns,
        additionalStandardTurn,
        ...duplicatedAdditionalSubTurnInfo,
      ]);
      return {
        turnController,
      };
    },
  };
};
