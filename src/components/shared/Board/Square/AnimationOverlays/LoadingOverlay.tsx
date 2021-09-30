import React, { useEffect, FC, useRef } from "react";
import { Animated, Easing, Platform } from "react-native";
import { AbsoluteView } from "ui/Containers";
import { AnimatedTile } from "ui";
import { SquareShape } from "game/types";
import { TileSchematic } from "ui/Tiles/TileProps";

export const LoadingOverlay: FC<{
  size?: number;
  tileSchematic?: TileSchematic;
  shape?: SquareShape;
}> = ({ size = 0, shape = SquareShape.Square, tileSchematic }) => {
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
      <AnimatedTile
        shape={shape}
        size={size}
        tileSchematic={tileSchematic}
        color={animatedColor}
      />
    </AbsoluteView>
  );
};
