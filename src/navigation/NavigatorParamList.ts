import { ParamListBase } from "@react-navigation/native";
import { Screens } from "./Screens";
import { GameOptions } from "game";
import { NamedGameMode } from "./NamedGameMode";

export interface NavigatorParamList extends ParamListBase {
  [Screens.AboutScreen]: undefined;
  [Screens.GameScreen]?: {
    gameOptions?: GameOptions;
    roomId?: string;
    mode?: NamedGameMode; // query param for nicer page refresh behavior
  };
  [Screens.StartScreen]: undefined;
  [Screens.VariantSelectScreen]?: {
    playWithFriends?: boolean;
  };
}
