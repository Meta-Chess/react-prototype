import React, { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackNavigator } from "components";
import { KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Colors } from "primitives";
import { ModalProvider } from "ui";
import { linking } from "navigation";
import Amplify from "aws-amplify";
// TODO: Extract config
Amplify.configure({
  Auth: {
    identityPoolId: "ap-southeast-2:db492aba-f5bf-4a18-bdf3-28119732d791",
    region: "ap-southeast-2",
    userPoolId: "ap-southeast-2_E3Huhuflp",
    userPoolWebClientId: "2ah1g01gu9htpis9lt74bs8fna",
  },
});
// @ts-ignore
import { withAuthenticator } from "aws-amplify-react-native";

function App(): ReactElement {
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

export default withAuthenticator(App);

const KeyboardAvoidingContainer = styled(KeyboardAvoidingView)`
  flex: 1;
`;

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colors.DARKEST.toString()};
`;
