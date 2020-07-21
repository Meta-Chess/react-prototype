import { ParamListBase } from "@react-navigation/native";
import { Screens } from "./Screens";

export interface NavigatorParamList extends ParamListBase {
  [Screens.GameScreen]: {
    gameType: string;
  };
  [Screens.StartScreen]: undefined;
}
