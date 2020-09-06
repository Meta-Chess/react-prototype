import { ParamListBase } from "@react-navigation/native";
import { Screens } from "./Screens";
import { GameOptions } from "game/types";

export interface NavigatorParamList extends ParamListBase {
  [Screens.GameScreen]: {
    gameOptions: GameOptions;
    gameId: number;
  };
  [Screens.StartScreen]: undefined;
}
