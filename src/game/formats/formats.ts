import {
  VariantCompositionIcon,
  RandomVariantsIcon,
  RollingVariantsIcon,
} from "primitives/icons/Formats";

interface Format {
  title: string;
  description: string;
  variantScreenHelpText: string;
  icon: React.FC;
}

export type FormatName = "variantComposition" | "randomVariants" | "rollingVariants";

export const formats: { [key in FormatName]: Format } = {
  variantComposition: {
    title: "Variant Composition",
    description: "A selection of variants are active for the entirety of a game",
    variantScreenHelpText: "Selected variants are fused",
    icon: VariantCompositionIcon,
  },
  randomVariants: {
    title: "Random Variants",
    description: "A random selection of variants are active for the entire game",
    variantScreenHelpText:
      "A variant composition is chosen at random from the selected variants",
    icon: RandomVariantsIcon,
  },
  rollingVariants: {
    title: "Rolling Variants",
    description:
      "Every couple turns a new variant is introduced, changing the rules of the game.",
    variantScreenHelpText: "Variants in play will change throughout the game",
    icon: RollingVariantsIcon,
  },
};
