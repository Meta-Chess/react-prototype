import React, { useEffect, FC, useRef } from "react";
import { Animated, Easing, Platform } from "react-native";
import { AbsoluteView } from "ui/Containers";
import { AnimationComponentProps } from "./AnimationComponentProps";
import { AnimatedTile } from "primitives/Tiles/AnimatedTile";

const Explosion: FC<AnimationComponentProps> = ({ shape, size, duration }) => {
  const colorValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    colorValue.stopAnimation();
    colorValue.setValue(0);
    Animated.timing(colorValue, {
      toValue: 10,
      duration: duration,
      easing: Easing.linear,
      isInteraction: false,
      useNativeDriver: Platform.OS === "ios",
    }).start();
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
