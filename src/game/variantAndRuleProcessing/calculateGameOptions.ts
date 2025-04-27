import { allPossiblePlayerNames, GameOptions, PlayerType } from "game/types";
import { FutureVariantName } from "game/variants/variants";
import { shuffleInPlace } from "utilities";
import { calculatePlayerTypes } from "./calculatePlayerTypes";
import { chooseRandomVariants } from "./formatProcessing";

export function calculateGameOptions(
  gameOptions: Partial<GameOptions>,
  selectedVariants: FutureVariantName[]
): GameOptions {
  gameOptions.format = gameOptions.format || "variantComposition";
  const numberOfPlayers =
    gameOptions.numberOfPlayers ?? defaultGameOptions.numberOfPlayers;
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
    players: allPossiblePlayerNames.slice(0, numberOfPlayers),
    playerTypes: calculatePlayerTypes(numberOfPlayers, gameOptions.playerTypes),
  };
}

export const defaultGameOptions = {
  format: "variantComposition",
  baseVariants: [] as FutureVariantName[],
  ruleNamesWithParams: {},
  numberOfPlayers: 2,
  playerTypes: ["local_human", "local_ai"] as PlayerType[], // TODO: try replacing this with satisfies
  checkEnabled: false,
  online: false,
  publicGame: false,
  time: undefined,
} as const;
