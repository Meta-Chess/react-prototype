import { Platform, Linking } from "react-native";

export const openURL = (URL: string): void => {
  if (Platform.OS == "web") window.open(URL, "_blank");
  else Linking.openURL(URL);
};
