import { allPossiblePlayerNames, GameOptions } from "game/types";
import { FutureVariantName } from "game/variants/variants";
import { shuffleInPlace } from "utilities";
import { chooseRandomVariants } from "./formatProcessing";

export function calculateGameOptions(
  gameOptions: Partial<GameOptions>,
  selectedVariants: FutureVariantName[],
  boardVariant?: FutureVariantName
): GameOptions {
  gameOptions.format = gameOptions.format || "variantComposition";
  const otherBaseVariants =
    boardVariant !== "standard" && boardVariant !== undefined ? [boardVariant] : [];
  return {
    ...defaultGameOptions,
    ...gameOptions,
    baseVariants: [
      ...(gameOptions.baseVariants || []),
      ...(gameOptions.format === "variantComposition"
        ? [...selectedVariants, ...otherBaseVariants]
        : gameOptions.format === "randomVariants"
        ? [...chooseRandomVariants(selectedVariants), ...otherBaseVariants]
        : otherBaseVariants),
    ],
    deck:
      gameOptions.format === "rollingVariants"
        ? shuffleInPlace(selectedVariants)
        : gameOptions.format === "randomVariants"
        ? selectedVariants
        : [],
    players: allPossiblePlayerNames.slice(0, gameOptions.numberOfPlayers),
  };
}

export const defaultGameOptions = {
  checkEnabled: true,
  online: true,
  publicGame: true,
  numberOfPlayers: 2,
  format: "variantComposition",
  baseVariants: [] as FutureVariantName[],
  time: undefined,
  ruleNamesWithParams: {},
} as const;
