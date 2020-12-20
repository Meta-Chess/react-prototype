import React, { FC } from "react";
import { Platform, Image } from "react-native";
import MChessLogoPNG from "./MChessLogo.png";

interface Props {
  size?: number;
}

export const MChessLogo: FC<Props> = ({ size }) => {
  size = size ? size : Platform.OS === "web" ? 240 : 210; // TODO: Calculate sizes based on screen size rather than platform
  return <Image style={{ width: size, height: size }} source={MChessLogoPNG} />;
};
