import { LinkingOptions, getStateFromPath } from "@react-navigation/native";
import { Screens } from "./Screens";
import { GameOptions } from "game/types";
import { NavigatorParamList } from "navigation/NavigatorParamList";
import { pathToParams } from "./NamedGameMode";

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
    if (path === "/game" || path === "game") {
      return {
        routes: [
          {
            name: Screens.GameScreen,
            params: {
              gameOptions: {
                checkEnabled: true,
                numberOfPlayers: 2,
                baseVariants: ["doubleMove"],
                ruleNamesWithParams: {},
                time: undefined,
                online: false,
                publicGame: false,
              },
            },
          },
        ],
      };
    }

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
