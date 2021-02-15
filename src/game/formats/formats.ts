import { RuleName } from "game";

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
    description: "A random selection of variants are active for the entire game",
    shortExplanation:
      "A variant composition is chosen at random from the selected variants",
  },
  rollingVariants: {
    title: "Rolling Variants",
    description:
      "Every couple turns a new variant is introduced, changing the rules of the game.",
    shortExplanation: "Variants in play will change throughout the game",
    ruleNames: ["rollingVariants"],
  },
};
