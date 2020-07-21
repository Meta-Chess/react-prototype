import React, { useState, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackNavigator } from "./src/components";

export default function App() {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}
