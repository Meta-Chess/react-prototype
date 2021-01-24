import React, { FC } from "react";
import { Svg, Path } from "react-native-svg";

interface Props {
  color: string;
  size?: number;
}

export const DownCaretIcon: FC<Props> = ({ color, size = 20 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" fill={color} />
    </Svg>
  );
};
