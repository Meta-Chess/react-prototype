import React, { FC } from "react";
import { Animated } from "react-native";
import { G, Svg, Path } from "react-native-svg";
import { AnimatedGroup } from "primitives";

interface Props {
  size: number;
  color?: string;
  animatedColor?: Animated.AnimatedInterpolation | undefined;
}

const TilePath: FC = () => {
  return (
    <Path d="M 148,183.138438763306 L 52,183.138438763306 L 4,100 L52,16.8615612366939 L 148,16.8615612366939 L 196,100 L 148,183.138438763306 " />
  );
};

export const hexSvgScaleFactor = 1.41;

export const HexTileSvg: FC<Props> = ({ size, color, animatedColor }) => {
  //the below animated size exception is to ensure there aren't gaps for adjacent transparent animations
  //remove if grid is not flush or on canvas board refactor
  const tileSize = animatedColor
    ? (hexSvgScaleFactor + 0.02) * size
    : hexSvgScaleFactor * size;
  return (
    <Svg width={tileSize} height={tileSize} viewBox="0 0 200 200">
      {animatedColor ? (
        <AnimatedGroup fill={animatedColor}>
          <TilePath />
        </AnimatedGroup>
      ) : (
        <G fill={color}>
          <TilePath />
        </G>
      )}
    </Svg>
  );
};
