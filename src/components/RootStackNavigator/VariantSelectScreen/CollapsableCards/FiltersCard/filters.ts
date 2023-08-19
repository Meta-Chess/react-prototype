import type { TraitName } from "game/variants/traitInfo";
import type { FutureVariant } from "game/variants";

export type Filter = TraitFilter | ComplexityFilter;

export interface TraitFilter {
  type: "trait";
  value: TraitName;
  option: FilterOption;
}

export interface ComplexityFilter {
  type: "complexity";
  value: number;
  option: FilterOption;
}

export type FilterOption = "include" | "exclude";
export type FilterValue = Filter["value"];
export type FilterType = Filter["type"];

export const getFilterCondition = (
  filter: Filter
): ((variant: FutureVariant) => boolean) => {
  switch (filter.type) {
    case "trait":
      return (variant: FutureVariant): boolean => {
        return variant.traits.some((trait) => trait === filter.value);
      };
    case "complexity":
      return (variant: FutureVariant): boolean => {
        return variant.complexity === filter.value;
      };
  }
};

const OPTION_INFO_TEXT: { [option in FilterOption]: string } = {
  include: "",
  exclude: "not",
};

const TYPE_INFO_TEXT: { [type in FilterType]: string } = {
  trait: "",
  complexity: "Complexity",
};

export const getFilterInfoText = (filter: Filter): string => {
  const optionText = OPTION_INFO_TEXT[filter.option];
  const valueText = filter.value.toString();
  const typeText = TYPE_INFO_TEXT[filter.type];
  return [optionText, valueText, typeText].filter((t) => t !== "").join(" ");
};
