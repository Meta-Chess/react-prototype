import { Screens } from "./Screens";
export type Spaces = "nimbus";

// TODO: explicitly register new screens with their space and make this function nicer
export function getSpaceFromRouteName(routeName: Screens): Spaces | undefined {
  if (
    [
      Screens.NimbusGameScreen,
      Screens.NimbusAboutScreen,
      Screens.NimbusStartScreen,
    ].includes(routeName)
  ) {
    return "nimbus";
  }
}
