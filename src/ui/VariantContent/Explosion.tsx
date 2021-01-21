import React, { useEffect, FC, useRef } from "react";
import { Animated, Easing, Platform } from "react-native";
import { AbsoluteView } from "ui/Containers";
import { AnimationComponentProps } from "./AnimationComponentProps";
import { AnimatedTile } from "ui";

const Explosion: FC<AnimationComponentProps> = ({ shape, size, duration, delay = 0 }) => {
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
        toValue: 10,
        duration: duration,
        easing: Easing.linear,
        isInteraction: false,
        useNativeDriver: Platform.OS === "ios",
      }),
    ]).start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const animatedColor = colorValue.interpolate({
    inputRange: [0, 10],
    outputRange: ["rgba(235,52,52,0.5)", "rgba(255,200,100,0)"],
  });

  return (
    <AbsoluteView pointerEvents={"none"}>
      <AnimatedTile shape={shape} size={size} color={animatedColor} />
    </AbsoluteView>
  );
};

export { Explosion };
