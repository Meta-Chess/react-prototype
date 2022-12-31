import React, { useEffect, FC, useRef } from "react";
import { Animated, Easing, Platform } from "react-native";
import { AbsoluteView } from "ui/Containers";
import { AnimationComponentProps } from "./AnimationComponentProps";
import { AnimatedTile } from "ui";
import { SquareShape } from "game/types";

const Explosion: FC<AnimationComponentProps> = ({
  size,
  tileSchematic,
  duration,
  delay = 0,
  shape = SquareShape.Square,
}) => {
  const colorValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    colorValue.setValue(1);
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
  }, []);

  const animatedColor = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(235,52,52,0.5)", "rgba(255,200,100,0)"],
  });

  return (
    <AbsoluteView pointerEvents={"none"}>
      <AnimatedTile
        shape={shape}
        size={size}
        tileSchematic={tileSchematic}
        color={animatedColor}
      />
    </AbsoluteView>
  );
};

export { Explosion };
