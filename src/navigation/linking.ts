import { LinkingOptions, getStateFromPath } from "@react-navigation/native";
import { Screens } from "./Screens";
import { GameOptions } from "game/types";
import { NavigatorParamList } from "navigation/NavigatorParamList";
import { pathToParams } from "./NamedGameMode";

const baseScreenConfig = {
  [Screens.AboutScreen]: {
    path: "about",
  },
  [Screens.GameScreen]: {
    // `/:` precedes a route param name. `?` marks the preceding name as optional
    path: "game/:roomId?/:gameOptions?",
    stringify: {
      roomId: (roomId?: string): string => roomId || "",
      gameOptions: (_gameOptions: GameOptions): string => "", // Hide game options - they're ugly
    },
  },
  [Screens.VariantSelectScreen]: {
    path: "setup/:playWithFriends?",
    stringify: {
      playWithFriends: (_gameOptions: GameOptions): string => "", // Hide play with friends
    },
  },
};

export const linking: LinkingOptions<NavigatorParamList> = {
  prefixes: [],
  config: {
    screens: {
      [Screens.AboutScreen]: baseScreenConfig[Screens.AboutScreen],
      [Screens.GameScreen]: baseScreenConfig[Screens.GameScreen],
      [Screens.StartScreen]: "",
      [Screens.VariantSelectScreen]: baseScreenConfig[Screens.VariantSelectScreen],
      [Screens.NimbusStartScreen]: "nimbus",
      [Screens.NimbusGameScreen]: {
        path: `nimbus/${baseScreenConfig[Screens.GameScreen].path}`,
        stringify: baseScreenConfig[Screens.GameScreen].stringify,
      },
      [Screens.NimbusAboutScreen]: {
        path: `nimbus/${baseScreenConfig[Screens.AboutScreen].path}`,
      },
    },
  },

  getStateFromPath(path, options) {
    if (path in pathToParams) {
      return {
        routes: [
          {
            name: Screens.GameScreen,
            params: pathToParams[path],
          },
        ],
      };
    }

    return getStateFromPath(path, options);
  },
};
