import React, { FC } from "react";
import { Svg, Path } from "react-native-svg";
import { Colors } from "primitives/Colors";

interface Props {
  color?: string;
  size?: number;
}

export const ArrowForwardIcon: FC<Props> = ({
  color = Colors.MCHESS_ORANGE.toString(),
  size = 24,
}) => {
  return (
    <Svg width={size} height={size} viewBox="12 0 24 24">
      <Path d="M24 0h-24v24H24z" fill="transparent" />
      <Path
        d="M 19.33 3.87 L 21.1 2.1 L 31 12 l -9.9 9.9 l -1.77 -1.77 L 27.46 12 z"
        fill={color}
      />
    </Svg>
  );
};
