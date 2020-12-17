import React, { FC } from "react";
import { Platform, Image } from "react-native";
import MChessLogoPNG from "./MChessLogo.png";

export const MChessLogo: FC = () => {
  const size = Platform.OS === "web" ? 240 : 210; // TODO: Calculate sizes based on screen size rather than platform
  return <Image style={{ width: size, height: size }} source={MChessLogoPNG} />;
};
