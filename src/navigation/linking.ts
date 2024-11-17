import { LinkingOptions, getStateFromPath } from "@react-navigation/native";
import { Screens } from "./Screens";
import { GameOptions } from "game/types";
import { NavigatorParamList } from "navigation/NavigatorParamList";
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
  mobius = "mobius",
  toroidal = "toroidal",
  cylindrical = "cylindrical",
  hex = "hex",
}

const alternamePathNamings: { [key in NamedGameMode]?: string[] } = {
  [NamedGameMode.spherical]: ["sphere"],
  [NamedGameMode.cylindrical]: ["cylinder"],
  [NamedGameMode.toroidal]: ["torus", "donut"],
};
const gameModeToVariants: { [key in NamedGameMode]: FutureVariantName[] } = {
  spherical: ["spherical"],
  mobius: ["mobius"],
  toroidal: ["toroidal"],
  cylindrical: ["cylindrical"],
  hex: ["hex"],
};

const standardGameOptions = {
  checkEnabled: true,
  online: false,
  publicGame: false,
  numberOfPlayers: 2,
  baseVariants: [],
  ruleNamesWithParams: {},
  time: undefined,
};

const namedGameModeParams = Object.keys(NamedGameMode).reduce((acc, gameMode) => {
  const namedGameMode = gameMode as NamedGameMode;
  acc[namedGameMode] = {
    gameOptions: calculateGameOptions(
      standardGameOptions,
      gameModeToVariants[namedGameMode]
    ),
    roomId: undefined,
    namedGameMode: gameMode,
  };
  return acc;
}, {} as { [key in NamedGameMode]: NavigatorParamList[Screens.GameScreen] });

const pathToNamedGameMode = Object.keys(NamedGameMode).reduce((acc, gameMode) => {
  const namedGameMode = gameMode as NamedGameMode;
  acc[`/${gameMode}`] = namedGameMode;
  acc[`/game/${gameMode}`] = namedGameMode;
  alternamePathNamings[namedGameMode]?.forEach((pathName) => {
    acc[`/${pathName}`] = namedGameMode;
    acc[`/game/${pathName}`] = namedGameMode;
  });
  return acc;
}, {} as { [key: string]: NamedGameMode });
