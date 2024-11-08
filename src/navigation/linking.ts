import { LinkingOptions, getStateFromPath } from "@react-navigation/native";
import { Screens } from "./Screens";
import { GameOptions } from "game/types";
import { NavigatorParamList } from "navigation/NavigatorParamList";
import { FormatName } from "game/formats";
import { FutureVariantName } from "game/variants";
import { calculateGameOptions } from "game/variantAndRuleProcessing";

export const linking: LinkingOptions<NavigatorParamList> = {
  prefixes: [],
  config: {
    screens: {
      [Screens.AboutScreen]: { path: "about" },
      [Screens.GameScreen]: {
        // `/:` precedes a route param name. `?` marks the preceding name as optional
        path: "game/:roomId?/:gameOptions?/:namedGameMode?",
        stringify: {
          roomId: (roomId?: string): string => roomId || "",
          gameOptions: (_gameOptions: GameOptions): string => "", // Hide game options - they're ugly
        },
      },
      [Screens.StartScreen]: "",
      [Screens.VariantSelectScreen]: {
        path: "setup/:playWithFriends?",
        stringify: {
          playWithFriends: (_gameOptions: GameOptions): string => "", // Hide play with friends
        },
      },
    },
  },
  getStateFromPath(path, options) {
    if (Object.keys(pathToNamedGameMode).includes(path)) {
      return {
        routes: [
          {
            name: Screens.GameScreen,
            params: namedGameModeParams[pathToNamedGameMode[path]],
          },
        ],
      };
    }

    return getStateFromPath(path, options);
  },
};

enum NamedGameMode {
  spherical = "spherical",
}
const pathToNamedGameMode = Object.keys(NamedGameMode).reduce((acc, gameMode) => {
  acc[`/${gameMode}`] = gameMode as NamedGameMode;
  acc[`/game/${gameMode}`] = gameMode as NamedGameMode;
  return acc;
}, {} as { [key: string]: NamedGameMode });

const namedGameModeParams: {
  [key in NamedGameMode]: NavigatorParamList[Screens.GameScreen];
} = {
  [NamedGameMode.spherical]: {
    gameOptions: calculateGameOptions(
      {
        checkEnabled: true,
        online: false,
        publicGame: false,
        numberOfPlayers: 2,
        format: "variantComposition" as FormatName,
        baseVariants: [],
        ruleNamesWithParams: {},
        time: undefined,
      },
      ["spherical"] as FutureVariantName[]
    ),
    roomId: undefined,
    namedGameMode: "spherical",
  },
};
