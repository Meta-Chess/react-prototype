import { Rule } from "../CompactRules";
import { TrivialParameterRule } from "game";
import { GenerateAdditionalTurns } from "../CompactRules";
import { TurnName } from "game/TurnController";
import { cloneDeep } from "lodash";

export const doubleTurn: TrivialParameterRule = (): Rule => {
  return {
    title: "Double Turn",
    description: "Double the number of turns for each player",
    generateAdditionalTurns: ({ turnController }): GenerateAdditionalTurns => {
      const currentAdditionalTurns = turnController.getAdditionalTurns();
      const duplicatedAdditionalTurns = cloneDeep(currentAdditionalTurns);
      const standardTurn = { name: TurnName.Standard };

      turnController.updateAdditionalTurns([
        ...currentAdditionalTurns,
        standardTurn,
        ...duplicatedAdditionalTurns,
      ]);
      return {
        turnController,
      };
    },
  };
};
