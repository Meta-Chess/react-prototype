import React, { useEffect, FC, useRef } from "react";
import { Animated, Easing, Platform } from "react-native";
import { AnimationComponentProps } from "./AnimationComponentProps";
import { Colors } from "primitives";
import { Piece } from "components/shared/Board";

const ChemicallyExcited: FC<AnimationComponentProps> = ({
  size,
  duration,
  pieceVisualData,
}) => {
  const colorValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    colorValue.setValue(0);
    Animated.sequence([
      Animated.timing(colorValue, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        isInteraction: false,
        useNativeDriver: Platform.OS === "ios",
      }),
      Animated.timing(colorValue, {
        toValue: 2,
        duration: 0,
        useNativeDriver: Platform.OS === "ios",
      }),
    ]).start();
  }, []);

  if (pieceVisualData === undefined) return null;

  const startingBodyColor = Colors.PLAYER[pieceVisualData.piece.owner].string();
  const startingOutlineColor = Colors.DARKEST.string(); // TODO: piece color scheme should be somewhere (either constant or as some visual type property in piece class)
  const endingBodyColor = pieceVisualData.bodyColorChange || startingBodyColor;
  const endingOutlineColor = pieceVisualData.outlineColorChange || startingOutlineColor;

  const animatedBodyColor = colorValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [startingBodyColor, endingBodyColor, "transparent"],
  });

  const animatedOutlineColor = colorValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [startingOutlineColor, endingOutlineColor, "transparent"],
  });

  return (
    <Piece
      piece={pieceVisualData.piece}
      animatedData={{
        animatedColor: animatedBodyColor,
        animatedOutlineColor: animatedOutlineColor,
      }}
      size={size ?? 0}
    />
  );
};

export { ChemicallyExcited };
