import { LinkingOptions } from "@react-navigation/native";
import { Screens } from "./Screens";
import { GameOptions } from "game/types";

export const linking: LinkingOptions = {
  prefixes: [],
  config: {
    screens: {
      [Screens.GameScreen]: {
        // `/:` precedes a route param name. `?` marks the preceding name as optional
        path: "game/:roomId?/:gameOptions?",
        stringify: {
          roomId: (roomId?: string): string => roomId || "",
          gameOptions: (_gameOptions: GameOptions): string => "", // Hide game options - they're ugly
        },
      },
      [Screens.StartScreen]: "",
      [Screens.VariantSelectScreen]: { path: "setup" },
    },
  },
};
