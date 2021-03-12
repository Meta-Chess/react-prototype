import React, { FC } from "react";
import { Svg, Path } from "react-native-svg";
import { Colors } from "primitives/Colors";

interface Props {
  color?: string;
  size?: number;
}

export const ArrowForward: FC<Props> = ({
  color = Colors.MCHESS_ORANGE.toString(),
  size = 24,
}) => {
  return (
    <Svg width={size} height={size} viewBox="12 0 12 24">
      <Path d="M24 0h-24v24H24z" fill="transparent" />
      <Path d="M12.33 3.87 14.1 2.1 24 12l-9.9 9.9-1.77-1.77L20.46 12z" fill={color} />
    </Svg>
  );
};
