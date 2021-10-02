import { FutureVariantName, futureVariants } from "game/variants";
import { keys } from "utilities";

export type BoardVariantName = ("standard" | "hex" | "circular") & FutureVariantName;
export interface BoardVariant {
  variant: FutureVariantName;
  allowedPlayers: number[];
}

// we could remove the duplication and have rules/other info of these variants stored only here?
export const boardVariants: { [key in BoardVariantName]: BoardVariant } = {
  standard: { variant: "standard", allowedPlayers: [2] },
  circular: { variant: "circular", allowedPlayers: [2, 3, 4, 5, 6] },
  hex: { variant: "hex", allowedPlayers: [2] },
};

export const boardOrder: BoardVariantName[] = ["standard", "circular", "hex"];

export const boardRestrictedVariants: { [key in BoardVariantName]: FutureVariantName[] } =
  Object.assign(
    {},
    ...keys(boardVariants).map((boardVariant) => ({
      [boardVariant]: keys(futureVariants).filter((variant) => {
        const boardRules = futureVariants[boardVariant].ruleNames;
        const variantRules = futureVariants[variant].ruleNames;
        return (
          boardRules.length > 0 && boardRules.every((rule) => variantRules.includes(rule))
        );
      }),
    }))
  );
