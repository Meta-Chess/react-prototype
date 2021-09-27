import React, { useEffect, FC, useRef } from "react";
import { Animated, Easing, Platform } from "react-native";
import { AbsoluteView } from "ui/Containers";
import { AnimatedTile } from "ui";
import { SquareShape } from "game/types";

export const LoadingOverlay: FC<{ size: number; shape?: SquareShape }> = ({
  size,
  shape = SquareShape.Square,
}) => {
  const colorValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(colorValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          isInteraction: false,
          useNativeDriver: Platform.OS === "ios",
        }),
        Animated.timing(colorValue, {
          toValue: 1,
          duration: 1000,
          isInteraction: false,
          useNativeDriver: Platform.OS === "ios",
        }),
      ])
    ).start();
  }, []);

  const animatedColor = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(52,52,52,0.3)", "rgba(52,52,52,0.2)"],
  });

  return (
    <AbsoluteView pointerEvents={"none"}>
      <AnimatedTile shape={shape} size={size} color={animatedColor} />
    </AbsoluteView>
  );
};
