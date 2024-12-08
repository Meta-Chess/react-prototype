import { Rule } from "../CompactRules";
import { TrivialParameterRule } from "game";
import { GenerateSubTurns } from "../CompactRules";
import { SubTurnName } from "game/TurnController";
import { cloneDeep } from "lodash";

export const doubleMove: TrivialParameterRule = (): Rule => {
  return {
    title: "Double Move",
    description: "Double the number of moves for each player",
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
