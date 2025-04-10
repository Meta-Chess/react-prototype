import { ParamListBase } from "@react-navigation/native";
import { Screens } from "./Screens";
import { GameOptions } from "game";
import { NamedGameMode } from "./NamedGameMode";
import { InfoSection } from "components/RootStackNavigator/AboutScreen";

export interface NavigatorParamList extends ParamListBase {
  [Screens.AboutScreen]?: {
    sections?: InfoSection[];
  };
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
