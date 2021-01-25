import React, { useEffect, FC, useRef } from "react";
import { Animated, Easing, Platform } from "react-native";
import { AbsoluteView } from "ui/Containers";
import { AnimationComponentProps } from "./AnimationComponentProps";
import { AnimatedTile } from "ui";
import { SquareShape } from "game/types";

const Explosion: FC<AnimationComponentProps> = ({
  size,
  duration,
  delay = 0,
  shape = SquareShape.Square,
}) => {
  const colorValue = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    colorValue.stopAnimation();
    colorValue.setValue(10);
    Animated.sequence([
      Animated.delay(delay),
      Animated.timing(colorValue, {
        toValue: 0,
        duration: 0,
        useNativeDriver: Platform.OS === "ios",
      }),
      Animated.timing(colorValue, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        isInteraction: false,
        useNativeDriver: Platform.OS === "ios",
      }),
    ]).start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const animatedColor = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(235,52,52,0.5)", "rgba(255,200,100,0)"],
  });

  return (
    <AbsoluteView pointerEvents={"none"}>
      <AnimatedTile shape={shape} size={size} color={animatedColor} />
    </AbsoluteView>
  );
};

export { Explosion };
