import React, { FC } from "react";
import { Svg, Path, Circle } from "react-native-svg";
import { Colors } from "primitives/Colors";

interface Props {
  color?: string;
  size?: number;
}

export const RandomVariantsIcon: FC<Props> = ({
  color = Colors.WHITE.toString(),
  size = 25,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M0 0h24v24H0z" fill={"none"} />
      <Path
        d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"
        fill={color}
      />
      <Circle cx="7.5" cy="16.5" r="1.5" fill={color} />
      <Circle cx="7.5" cy="7.5" r="1.5" fill={color} />
      <Circle cx="12" cy="12" r="1.5" fill={color} />
      <Circle cx="16.5" cy="16.5" r="1.5" fill={color} />
      <Circle cx="16.5" cy="7.5" r="1.5" fill={color} />
    </Svg>
  );
};
