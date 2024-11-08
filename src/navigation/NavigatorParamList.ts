import { ParamListBase } from "@react-navigation/native";
import { Screens } from "./Screens";
import { GameOptions } from "game";

export interface NavigatorParamList extends ParamListBase {
  [Screens.AboutScreen]: undefined;
  [Screens.GameScreen]?: {
    gameOptions?: GameOptions;
    roomId?: string;
    namedGameMode?: string;
  };
  [Screens.StartScreen]: undefined;
  [Screens.VariantSelectScreen]?: {
    playWithFriends?: boolean;
  };
}
