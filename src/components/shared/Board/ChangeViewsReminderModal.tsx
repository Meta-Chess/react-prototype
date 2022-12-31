import React, { FC, useEffect, useRef } from "react";
import { Animated, Platform } from "react-native";
import { Colors, Text } from "primitives";
import { AbsoluteView } from "ui";

export const ChangeViewsReminderModal: FC = () => {
  // Animated modal opacity
  const modalOpacity = useRef(new Animated.Value(0.75)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(modalOpacity, {
        toValue: 0,
        duration: 1500,
        isInteraction: false,
        useNativeDriver: Platform.OS === "ios",
      }),
    ]).start();
  }, []);

  return (
    <AbsoluteView pointerEvents="none">
      <Animated.View
        style={{
          width: 240,
          padding: 16,
          backgroundColor: Colors.DARKER.toString(),
          opacity: modalOpacity,
          borderRadius: 12,
        }}
        pointerEvents="none"
      >
        <Text alignment={"center"}>Press E to change view</Text>
      </Animated.View>
    </AbsoluteView>
  );
};
