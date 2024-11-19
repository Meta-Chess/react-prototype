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
        path: "game/:roomId?/:gameOptions?",
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
    if (path in pathToGameOptions) {
      return {
        routes: [
          {
            name: Screens.GameScreen,
            params: {
              gameOptions: pathToGameOptions[path],
            },
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

const gameModeToVariants: { [key in NamedGameMode]: FutureVariantName[] } = {
  spherical: ["spherical"],
  mobius: ["mobius"],
  toroidal: ["toroidal"],
  cylindrical: ["cylindrical"],
  hex: ["hex"],
};

const alternamePathNamings: { [key in NamedGameMode]?: string[] } = {
  [NamedGameMode.spherical]: ["sphere"],
  [NamedGameMode.cylindrical]: ["cylinder"],
  [NamedGameMode.toroidal]: ["torus", "donut"],
};

const offlineBaseGameOptions = {
  checkEnabled: true,
  numberOfPlayers: 2,
  baseVariants: [],
  ruleNamesWithParams: {},
  time: undefined,
  online: false,
  publicGame: false,
};

const pathToGameOptions = Object.keys(NamedGameMode).reduce((acc, gameMode) => {
  const namedGameMode = gameMode as NamedGameMode;
  const gameOptions = calculateGameOptions(
    offlineBaseGameOptions,
    gameModeToVariants[namedGameMode]
  );

  acc[`/${gameMode}`] = gameOptions;
  acc[`/${gameMode}/online`] = { ...gameOptions, online: true };

  alternamePathNamings[namedGameMode]?.forEach((pathName) => {
    acc[`/${pathName}`] = gameOptions;
    acc[`/${pathName}/online`] = { ...gameOptions, online: true };
  });
  return acc;
}, {} as { [key: string]: GameOptions });
