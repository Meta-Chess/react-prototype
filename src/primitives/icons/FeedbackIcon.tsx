import React, { FC } from "react";
import { Svg, Path } from "react-native-svg";
import { Colors } from "primitives/Colors";

interface Props {
  color?: string;
  size?: number;
}

export const FeedbackIcon: FC<Props> = ({
  color = Colors.MCHESS_ORANGE.toString(),
  size = 24,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M4 4h16v12H5.17L4 17.17V4m0-2c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4zm2 10h8v2H6v-2zm0-3h12v2H6V9zm0-3h12v2H6V6z"
        fill={color}
      />
    </Svg>
  );
};
