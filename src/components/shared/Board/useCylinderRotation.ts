import { useContext, useEffect, useMemo, useRef, useCallback } from "react";
import { GameContext } from "game";
import { BoardMeasurements } from "components/shared";
import { Animated, Platform, Easing } from "react-native";

const ROTATION_TIME = 100;

export const useCylinderRotation = (
  measurements: BoardMeasurements
): {
  rotationMarginLeft: Animated.Animated | number;
  rotationMarginBottom: Animated.Animated | number;
  verticalRotationAllowed: boolean;
  horizontalRotationAllowed: boolean;
} => {
  const { gameMaster } = useContext(GameContext);
  const horizontalRotationAllowed = !!gameMaster?.getRuleNames().includes("cylindrical");
  const verticalRotationAllowed = !!gameMaster
    ?.getRuleNames()
    .includes("verticallyCylindrical");

  const animationOffset = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const animationTargetX = useRef(0);
  const animationTargetY = useRef(0);

  const onKeyDownEvent = useCallback((event) => {
    switch (event.key) {
      case "w":
        if (verticalRotationAllowed)
          animationTargetY.current = animationTargetY.current - 1;
        break;
      case "a":
        if (horizontalRotationAllowed)
          animationTargetX.current = animationTargetX.current + 1;
        break;
      case "s":
        if (verticalRotationAllowed)
          animationTargetY.current = animationTargetY.current + 1;
        break;
      case "d":
        if (horizontalRotationAllowed)
          animationTargetX.current = animationTargetX.current - 1;
        break;
    }
    Animated.timing(animationOffset, {
      toValue: { x: animationTargetX.current, y: animationTargetY.current },
      duration: ROTATION_TIME,
      easing: Easing.out(Easing.ease),
      useNativeDriver: Platform.OS === "ios",
    }).start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.addEventListener("keydown", onKeyDownEvent, false);
    return (): void => {
      document.removeEventListener("keydown", onKeyDownEvent, false);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const squareSize = measurements.squareSize;
  const { minRank, maxRank, minFile, maxFile } = measurements.rankAndFileBounds;
  const numberOfFiles = useMemo(() => maxFile - minFile + 1, [minFile, maxFile]);
  const numberOfRanks = useMemo(() => maxRank - minRank + 1, [minRank, maxRank]);

  const wrappedAnimationOffsetX = Animated.subtract(
    squareSize * numberOfFiles,
    Animated.multiply(Animated.modulo(animationOffset.x, numberOfFiles), 2 * squareSize)
  );
  const wrappedAnimationOffsetY = Animated.subtract(
    squareSize * numberOfRanks,
    Animated.multiply(Animated.modulo(animationOffset.y, numberOfRanks), 2 * squareSize)
  );

  return {
    rotationMarginLeft: horizontalRotationAllowed ? wrappedAnimationOffsetX : 0,
    rotationMarginBottom: verticalRotationAllowed ? wrappedAnimationOffsetY : 0,
    verticalRotationAllowed,
    horizontalRotationAllowed,
  };
};