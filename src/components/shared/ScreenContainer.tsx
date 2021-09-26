import React, { useEffect, useMemo } from "react";
import { useNavigation } from "navigation/useNavigation";
import { useModals } from "ui";
import { View, Platform, useWindowDimensions } from "react-native";
import { Colors, SFC } from "primitives";
import { ErrorBoundary } from "components/shared/ErrorBoundary";
import { ScrollView } from "react-native-gesture-handler";
import { isWindows } from "../../utilities/isWindows";

interface Props {
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
    <View style={{ height: isWindows() ? height - 1 : height }}>
      <Container {...{ ...screenSizeVariables, style }}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Container>
    </View>
  );
};

const Container: SFC<Props> = ({
  paddingHorizontal,
  paddingVertical,
  width,
  style,
  children,
}) => {
  return (
    <ScrollView
      horizontal
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
          },
          style,
        ]}
      >
        {children}
      </View>
    </ScrollView>
  );
};
