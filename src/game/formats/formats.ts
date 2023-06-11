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
    description: "2 random variants are selected for the entirety of a game", // TODO: replace random choices with a constant when it exists
    shortExplanation: "Variants are chosen randomly from the deck",
  },
  rollingVariants: {
    title: "Rolling Variants",
    description: `Every ${NUMBER_OF_TURNS} turns a new variant is introduced, changing the rules of the game`,
    shortExplanation: "Variants in play will change throughout the game",
    ruleNames: ["rollingVariants"],
  },
};
