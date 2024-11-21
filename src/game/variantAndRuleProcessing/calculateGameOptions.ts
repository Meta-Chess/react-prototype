import { allPossiblePlayerNames, GameOptions } from "game/types";
import { FutureVariantName } from "game/variants/variants";
import { shuffleInPlace } from "utilities";
import { chooseRandomVariants } from "./formatProcessing";

export function calculateGameOptions(
  gameOptions: Partial<GameOptions>,
  selectedVariants: FutureVariantName[]
): GameOptions {
  gameOptions.format = gameOptions.format || "variantComposition";
  return {
    ...defaultGameOptions,
    ...gameOptions,
    baseVariants: [
      ...(gameOptions.baseVariants || []),
      ...(gameOptions.format === "variantComposition"
        ? selectedVariants
        : gameOptions.format === "randomVariants"
        ? chooseRandomVariants(selectedVariants)
        : []),
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
  format: "variantComposition",
  baseVariants: [] as FutureVariantName[],
  ruleNamesWithParams: {},
  numberOfPlayers: 2,
  checkEnabled: true,
  online: false,
  publicGame: false,
  time: undefined,
} as const;
