import { Screens } from "navigation/Screens";
import { useNavigation } from "navigation/useNavigation";
import { useRoute } from "navigation/useRoute";
import { useCallback } from "react";

export function useGoBackOrToMainScreen(): () => void {
  const navigation = useNavigation();
  const route = useRoute();

  return useCallback((): void => {
    const routePrefix = route.name.split("/")[0];
    const mainScreen =
      routePrefix in MAIN_SCREENS
        ? MAIN_SCREENS[routePrefix as Spaces]
        : Screens.StartScreen;

    if (navigation.canGoBack()) navigation.goBack();
    else navigation.replace(mainScreen);
  }, [navigation, route.name]);
}

type Spaces = "nimbus";

const MAIN_SCREENS: { [space in Spaces]: Screens } = {
  nimbus: Screens.NimbusStartScreen,
};
