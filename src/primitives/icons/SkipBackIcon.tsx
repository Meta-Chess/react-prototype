import React, { FC } from "react";
import { Svg, Path } from "react-native-svg";
import { Colors } from "primitives/Colors";

interface Props {
  color?: string;
  size?: number;
}

export const SkipBackIcon: FC<Props> = ({
  color = Colors.MCHESS_ORANGE.toString(),
  size = 24,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M 0 0 h 24 v 24 H 0 z" fill="transparent" />
      <Path
        d="M 11.67 3.87 L 9.9 2.1 L 0 12 l 9.9 9.9 l 1.77 -1.77 L 3.54 12 z"
        fill={color}
      />
      <Path
        d="M 21.67 3.87 L 19.9 2.1 L 10 12 l 9.9 9.9 l 1.77 -1.77 L 13.54 12 z"
        fill={color}
      />
    </Svg>
  );
};
