import React, { useEffect, useMemo } from "react";
import { useNavigation } from "navigation/useNavigation";
import { useModals } from "ui";
import { View, Platform, useWindowDimensions } from "react-native";
import { Colors, SFC } from "primitives";
import { ErrorBoundary } from "components/shared/ErrorBoundary";
import { ScrollView } from "react-native-gesture-handler";

interface Props {
  height: number;
  width: number;
  paddingHorizontal: number;
  paddingVertical: number;
}

export const ScreenContainer: SFC<{ portraitFriendly?: boolean }> = ({
  portraitFriendly = false,
  children,
  style,
}) => {
  const navigation = useNavigation();
  const modals = useModals();
  useEffect(() => {
    navigation.addListener("beforeRemove", () => {
      modals.hideAll();
    });
  }, [navigation, modals]);

  const { height, width } = useWindowDimensions();
  const screenSizeVariables = useMemo(() => {
    const portrait = height > width;
    const paddingHorizontal = Platform.OS === "web" || !portrait ? 16 : 0;
    const paddingVertical = Platform.OS === "web" || portrait ? 16 : 0;
    const minimumWidth = 1050;
    const scrollableWidth =
      width >= minimumWidth || portraitFriendly ? width : minimumWidth;
    return { paddingHorizontal, paddingVertical, width: scrollableWidth };
  }, [width, height, portraitFriendly]);

  return (
    <ErrorBoundary>
      <Container {...{ ...screenSizeVariables, height, style }}>{children}</Container>
    </ErrorBoundary>
  );
};

const Container: SFC<Props> = ({
  paddingHorizontal,
  paddingVertical,
  height,
  width,
  style,
  children,
}) => {
  return (
    <ScrollView
      horizontal={true}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View
        style={[
          {
            width,
            paddingHorizontal,
            paddingVertical,
            backgroundColor: Colors.DARKEST.toString(),
            flex: 1,
            height,
          },
          style,
        ]}
      >
        {children}
      </View>
    </ScrollView>
  );
};
