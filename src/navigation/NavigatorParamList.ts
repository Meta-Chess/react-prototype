import { ParamListBase } from "@react-navigation/native";
import { Screens } from "./Screens";
import { GameOptions } from "game";

export interface NavigatorParamList extends ParamListBase {
  [Screens.GameScreen]: {
    gameOptions?: GameOptions;
    roomId?: string;
  };
  [Screens.StartScreen]: undefined;
}
