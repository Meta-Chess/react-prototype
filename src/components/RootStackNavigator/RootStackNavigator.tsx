import React, { FC } from "react";
import { AboutScreen } from "./AboutScreen";
import { GameScreen } from "./GameScreen";
import { StartScreen } from "./StartScreen";
import { VariantSelectScreen } from "./VariantSelectScreen";
import { NimbusStartScreen, NimbusGameScreen, NimbusAboutScreen } from "./NimbusScreens";
import { createStackNavigator } from "@react-navigation/stack";
import { Screens } from "navigation/Screens";
import { Colors } from "primitives/Colors";

const Stack = createStackNavigator();

export const RootStackNavigator: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screens.StartScreen}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.DARKEST.toString() },
      }}
    >
      <Stack.Screen
        name={Screens.GameScreen}
        component={GameScreen}
        options={{ title: "mchess • Variant Chess Online!" }}
      />
      <Stack.Screen
        name={Screens.StartScreen}
        component={StartScreen}
        options={{ title: "mchess • Variant Chess Online!" }}
      />
      <Stack.Screen
        name={Screens.VariantSelectScreen}
        component={VariantSelectScreen}
        options={{ title: "mchess • Variant Chess Online!" }}
      />
      <Stack.Screen
        name={Screens.AboutScreen}
        component={AboutScreen}
        options={{ title: "mchess" }}
      />
      <Stack.Screen
        name={Screens.NimbusStartScreen}
        component={NimbusStartScreen}
        options={{ title: "Nimbus • Powered by mchess!" }}
      />
      <Stack.Screen
        name={Screens.NimbusGameScreen}
        component={NimbusGameScreen}
        options={{ title: "Nimbus • Powered by mchess!" }}
      />
      <Stack.Screen
        name={Screens.NimbusAboutScreen}
        component={NimbusAboutScreen}
        options={{ title: "Nimbus • Powered by mchess!" }}
      />
    </Stack.Navigator>
  );
};
