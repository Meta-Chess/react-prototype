import React, { FC } from "react";
import { Svg, Path } from "react-native-svg";
import { Colors } from "primitives/Colors";

interface Props {
  color?: string;
  size?: number;
}

export const MinusIcon: FC<Props> = ({
  color = Colors.MCHESS_ORANGE.toString(),
  size = 24,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M0 0h24v24H0V0z" fill={"transparent"} />
      <Path d="M19 13H5v-2h14v2z" fill={color} />
    </Svg>
  );
};
