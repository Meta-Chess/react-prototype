import { Rule } from "../CompactRules";
import { TrivialParameterRule } from "game";

export const doubleMove: TrivialParameterRule = (): Rule => {
  return {
    title: "Double Move",
    description: "Double the number of moves for each player",
  };
};
