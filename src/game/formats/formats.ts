import { RuleName } from "../CompactRules";

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
    description: "All selected variants are combined for the duration of a game.",
    shortExplanation: "All variants will be fused",
  },
  randomVariants: {
    title: "Random Variants",
    description:
      "Variants are randomly drawn from the deck and combined for the duration of a game.",
    shortExplanation: "A variant composition is chosen at random from the deck",
  },
  rollingVariants: {
    title: "Rolling Variants",
    description:
      "Every few turns a variant is drawn from the deck and applied to the game. If the maximum number of variants are in play, the oldest variant is removed.",
    shortExplanation: "Variants in play will change throughout the game",
    ruleNames: ["rollingVariants"],
  },
};
