import { RuleName, NUMBER_OF_TURNS } from "../CompactRules";

interface Format {
  title: string;
  description: string;
  shortExplanation: string;
  ruleNames?: RuleName[];
}

export type FormatName = "variantComposition" | "randomVariants" | "rollingVariants";

export const formats: { [key in FormatName]: Format } = {
  variantComposition: {
    title: "Variant Composition",
    description: "A selection of variants are active for the entirety of a game",
    shortExplanation: "Selected variants are fused",
  },
  randomVariants: {
    title: "Random Variants",
    description: "2 random variants have been selected for the entire game", // TODO: replace random choices with a constant when it exists
    shortExplanation:
      "A variant composition is chosen at random from the selected variants",
  },
  rollingVariants: {
    title: "Rolling Variants",
    description: `Every ${NUMBER_OF_TURNS} turns a new variant is introduced, changing the rules of the game.`,
    shortExplanation: "Variants in play will change throughout the game",
    ruleNames: ["rollingVariants"],
  },
};
