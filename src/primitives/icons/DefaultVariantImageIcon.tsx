import React, { FC } from "react";
import { Svg, Path } from "react-native-svg";
import { Colors } from "primitives/Colors";

interface Props {
  color?: string;
  size?: number;
}

export const DefaultVariantImageIcon: FC<Props> = ({
  color = Colors.TEXT.LIGHT_SECONDARY.toString(),
  size = 24,
}) => {
  return (
    <Svg fill={color} width={size} height={size} viewBox="0 0 24 24">
      <Path d="M2.513 12.833l9.022 5.04a.995.995 0 00.973.001l8.978-5a1 1 0 00-.002-1.749l-9.022-5a1 1 0 00-.968-.001l-8.978 4.96a1 1 0 00-.003 1.749z" />
      <Path d="M3.485 15.126l-.971 1.748 9 5a1 1 0 00.971 0l9-5-.971-1.748L12 19.856l-8.515-4.73zM20 8V6h2V4h-2V2h-2v2h-2v2h2v2z" />
    </Svg>
  );
};
