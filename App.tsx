import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackNavigator } from "components";
import { linking } from "navigation";

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <RootStackNavigator />
    </NavigationContainer>
  );
}
