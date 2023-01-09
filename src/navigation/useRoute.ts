import { useRoute as useRouteReact } from "@react-navigation/native";
import { NavigatorParamList } from "./NavigatorParamList";
import { Screens } from "./Screens";

const useRoute = <T extends Screens>(): {
  key: string;
  name: T;
  params?: NavigatorParamList[T];
} => {
  return useRouteReact();
};

export { useRoute };
