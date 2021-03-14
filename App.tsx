import React, { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackNavigator } from "components";
import { KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Colors } from "primitives";
import { ModalProvider } from "ui";
import { linking } from "navigation";

export default function App(): ReactElement {
  return (
    <NavigationContainer linking={linking}>
      <ModalProvider>
        <KeyboardAvoidingContainer behavior={Platform.OS == "ios" ? "padding" : "height"}>
          <SafeAreaProvider>
            <SafeAreaContainer>
              <RootStackNavigator />
            </SafeAreaContainer>
          </SafeAreaProvider>
        </KeyboardAvoidingContainer>
      </ModalProvider>
    </NavigationContainer>
  );
}

const KeyboardAvoidingContainer = styled(KeyboardAvoidingView)`
  flex: 1;
`;

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colors.DARKEST.toString()};
`;
