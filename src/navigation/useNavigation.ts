import { useNavigation as useReactNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { NavigatorParamList } from "./NavigatorParamList";
import { Screens } from "./Screens";

const useNavigation = <T extends Screens>(): StackNavigationProp<
  NavigatorParamList,
  T
> => {
  return useReactNavigation();
};

export { useNavigation };
