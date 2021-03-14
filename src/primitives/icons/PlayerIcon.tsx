import React, { FC } from "react";
import { Svg, Path } from "react-native-svg";
import { Colors } from "primitives/Colors";

interface Props {
  color?: string;
  size?: number;
}

export const PlayerIcon: FC<Props> = ({
  color = Colors.TEXT.LIGHT_SECONDARY.toString(),
  size = 24,
}) => {
  return (
    <Svg width={size} height={size} viewBox="1 1 23 22">
      <Path d="M0 0h24v24H0V0z" fill="transparent" />
      <Path
        d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 9c2.7 0 5.8 1.29 6 2v1H6v-.99c.2-.72 3.3-2.01 6-2.01m0-11C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"
        fill={color}
      />
    </Svg>
  );
};
