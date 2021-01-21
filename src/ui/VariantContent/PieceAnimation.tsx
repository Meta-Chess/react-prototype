import React, { useEffect, FC, useRef } from "react";
import { Animated, Easing, Platform } from "react-native";
import { AbsoluteView } from "ui/Containers";
import { AnimationComponentProps } from "./AnimationComponentProps";
import { PieceImageAnimated } from "primitives/PieceImage";
import { Colors } from "primitives";
import { SquareShape } from "game/types";

const PieceAnimation: FC<AnimationComponentProps> = ({
  shape,
  size,
  duration,
  pieceVisualData,
}) => {
  const colorValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    colorValue.stopAnimation();
    colorValue.setValue(0);
    Animated.sequence([
      Animated.timing(colorValue, {
        toValue: 10,
        duration: duration,
        easing: Easing.linear,
        isInteraction: false,
        useNativeDriver: Platform.OS === "ios",
      }),
      Animated.timing(colorValue, {
        toValue: 11,
        duration: 0,
        useNativeDriver: Platform.OS === "ios",
      }),
    ]).start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (pieceVisualData === undefined) return null;

  const startingBodyColor = Colors.PLAYER[pieceVisualData.owner].string();
  const startingOutlineColor = Colors.DARKEST.string(); //todo: piece color schema should be somewhere
  const endingBodyColor =
    pieceVisualData.bodyColorChange === undefined
      ? startingBodyColor
      : pieceVisualData.bodyColorChange;
  const endingOutlineColor =
    pieceVisualData.outlineColorChange === undefined
      ? startingOutlineColor
      : pieceVisualData.outlineColorChange;

  const animatedBodyColor = colorValue.interpolate({
    inputRange: [0, 10, 11],
    outputRange: [startingBodyColor, endingBodyColor, "transparent"],
  });

  const animatedOutlineColor = colorValue.interpolate({
    inputRange: [0, 10, 11],
    outputRange: [startingOutlineColor, endingOutlineColor, "transparent"],
  });

  return (
    //todo: refactor piece templating and visuals duplication (e.g. fatigue and hex placement)
    <AbsoluteView pointerEvents={"none"}>
      <PieceImageAnimated
        type={pieceVisualData.type}
        color={animatedBodyColor}
        outlineColor={animatedOutlineColor}
        size={shape === SquareShape.Hex ? 0.9 * size : 1 * size}
        opacity={pieceVisualData.fatigued ? 0.4 : 1}
      />
    </AbsoluteView>
  );
};

export { PieceAnimation };
