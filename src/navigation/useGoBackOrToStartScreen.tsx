import { Screens } from "navigation/Screens";
import { useNavigation } from "navigation/useNavigation";
import { useCallback } from "react";

export function useGoBackOrToStartScreen(): () => void {
  const navigation = useNavigation();
  return useCallback((): void => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.replace(Screens.StartScreen);
  }, [navigation]);
}
