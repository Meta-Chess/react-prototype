import { ParamListBase } from "@react-navigation/native";
import { Screens } from "./Screens";
import { VariantName } from "game";

export interface NavigatorParamList extends ParamListBase {
  [Screens.GameScreen]: {
    variant: VariantName;
    gameId: number;
  };
  [Screens.StartScreen]: undefined;
}
