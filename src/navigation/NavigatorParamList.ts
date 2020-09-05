import { ParamListBase } from "@react-navigation/native";
import { Screens } from "./Screens";
import { VariantName } from "game";

export interface NavigatorParamList extends ParamListBase {
  [Screens.GameScreen]: {
    gameOptions: { variant: VariantName; time: number | undefined };
    gameId: number;
  };
  [Screens.StartScreen]: undefined;
}
