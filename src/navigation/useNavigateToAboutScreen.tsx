import { Screens } from "navigation/Screens";
import { Spaces } from "navigation/Spaces";
import { useNavigation } from "navigation/useNavigation";
import { useRoute } from "navigation/useRoute";
import { useCallback } from "react";

export function useNavigateToAboutScreen(): () => void {
  const navigation = useNavigation();
  const route = useRoute();

  return useCallback((): void => {
    const routePrefix = route.name.split("/")[0];
    const aboutScreen =
      routePrefix in ABOUT_SCREENS
        ? ABOUT_SCREENS[routePrefix as Spaces]
        : Screens.AboutScreen;

    navigation.navigate(aboutScreen);
  }, [navigation, route.name]);
}

const ABOUT_SCREENS: { [space in Spaces]: Screens } = {
  nimbus: Screens.NimbusAboutScreen,
};
