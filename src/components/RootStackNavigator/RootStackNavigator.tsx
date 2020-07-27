import React, { FC } from "react";
import { GameScreen, StartScreen } from "./components";
import { createStackNavigator } from "@react-navigation/stack";
import { Screens } from "navigation/Screens";

const Stack = createStackNavigator();

export const RootStackNavigator: FC = () => {
  return (
    <Stack.Navigator initialRouteName={Screens.StartScreen}>
      <Stack.Screen name={Screens.GameScreen} component={GameScreen} />
      <Stack.Screen name={Screens.StartScreen} component={StartScreen} />
    </Stack.Navigator>
  );
};
