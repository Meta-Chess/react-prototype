import { Screens } from "navigation/Screens";
import { Spaces } from "navigation/Spaces";
import { useNavigation } from "navigation/useNavigation";
import { useRoute } from "navigation/useRoute";
import { useCallback } from "react";
import { getSpaceFromRouteName } from "navigation/Spaces";

export function useNavigateToAboutScreen(): () => void {
  const navigation = useNavigation();
  const route = useRoute();

  return useCallback((): void => {
    const space = getSpaceFromRouteName(route.name);
    const aboutScreen = space === undefined ? Screens.AboutScreen : ABOUT_SCREENS[space];

    navigation.navigate(aboutScreen);
  }, [navigation, route.name]);
}

const ABOUT_SCREENS: { [space in Spaces]: Screens } = {
  nimbus: Screens.NimbusAboutScreen,
};
