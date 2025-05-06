import { Screens } from "navigation/Screens";
import { Spaces } from "navigation/Spaces";
import { useNavigation } from "navigation/useNavigation";
import { useRoute } from "navigation/useRoute";
import { useCallback } from "react";
import { getSpaceFromRouteName } from "navigation/Spaces";

export function useGoBackOrToMainScreen(): () => void {
  const navigation = useNavigation();
  const route = useRoute();

  return useCallback((): void => {
    const space = getSpaceFromRouteName(route.name);
    const mainScreen = space === undefined ? Screens.AboutScreen : MAIN_SCREENS[space];

    if (navigation.canGoBack()) navigation.goBack();
    else navigation.replace(mainScreen);
  }, [navigation, route.name]);
}

const MAIN_SCREENS: { [space in Spaces]: Screens } = {
  nimbus: Screens.NimbusStartScreen,
};
