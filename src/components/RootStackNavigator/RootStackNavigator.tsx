import React, { FC } from "react";
import { GameScreen } from "./GameScreen";
import { StartScreen } from "./StartScreen";
import { VariantSelectScreen } from "./VariantSelectScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { Screens } from "navigation/Screens";

const Stack = createStackNavigator();

export const RootStackNavigator: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screens.StartScreen}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={Screens.GameScreen}
        component={GameScreen}
        options={{ title: "mchess" }}
      />
      <Stack.Screen
        name={Screens.StartScreen}
        component={StartScreen}
        options={{ title: "mchess" }}
      />
      <Stack.Screen
        name={Screens.VariantSelectScreen}
        component={VariantSelectScreen}
        options={{ title: "mchess" }}
      />
    </Stack.Navigator>
  );
};
