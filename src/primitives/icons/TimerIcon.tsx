import React, { FC } from "react";
import { Svg, Path } from "react-native-svg";
import { Colors } from "primitives/Colors";

interface Props {
  color?: string;
  size?: number;
}

export const TimerIcon: FC<Props> = ({
  color = Colors.TEXT.LIGHT_SECONDARY.toString(),
  size = 24,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M0 0h24v24H0V0z" fill="transparent" />
      <Path
        d="M15.07 1.01h-6v2h6v-2zm-4 13h2v-6h-2v6zm8.03-6.62l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.14 4.74 14.19 4 12.07 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.11-.74-4.06-1.97-5.61zm-7.03 12.62c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
        fill={color}
      />
    </Svg>
  );
};
