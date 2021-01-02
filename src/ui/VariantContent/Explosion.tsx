import React, { useEffect, FC, useRef } from "react";
import { Animated, Easing, Platform } from "react-native";
import { AbsoluteView } from "ui/Containers";
import { SquareShape } from "game/types";
import { SquareTileAnimated, HexTileAnimated } from "primitives/Tiles";

interface Props {
  shape: SquareShape | undefined;
  size: number;
  duration: number | undefined;
}

const Explosion: FC<Props> = ({ shape, size, duration }) => {
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
    outputRange: ["rgba(235,52,52,0.4)", "rgba(0,0,0,0)"],
  });

  const options = {
    [SquareShape.Hex]: <HexTileAnimated size={size} color={animatedColor} />,
  };

  return (
    <AbsoluteView pointerEvents={"none"}>
      {shape ? options[shape] : <SquareTileAnimated size={size} color={animatedColor} />}
    </AbsoluteView>
  );
};

export { Explosion };
