import React, { useEffect } from "react";
import { useNavigation } from "navigation/useNavigation";
import { useModals } from "ui";
import { View, Platform, useWindowDimensions } from "react-native";
import { Colors, SFC } from "primitives";
import styled from "styled-components/native";
import { ErrorBoundary } from "components/shared/ErrorBoundary";

export const ScreenContainer: SFC = ({ children, style }) => {
  const navigation = useNavigation();
  const modals = useModals();
  useEffect(() => {
    navigation.addListener("beforeRemove", () => {
      modals.hideAll();
    });
  }, [navigation, modals]);

  const { height, width } = useWindowDimensions();
  const portrait = height > width;
  const paddingHorizontal = Platform.OS === "web" || !portrait ? 16 : 0;
  const paddingVertical = Platform.OS === "web" || portrait ? 16 : 0;

  return (
    <Container style={[{ paddingHorizontal, paddingVertical }, style]}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  background: ${Colors.DARKEST.string()};
`;
