import React, { FC } from "react";
import { Image, Platform } from "react-native";
import NimbusLogoPNG from "./NimbusLogo.png";

interface Props {
  size?: number;
}

export const NimbusLogo: FC<Props> = ({ size }) => {
  size = size ? size : Platform.OS === "web" ? 280 : 210; // TODO: Calculate sizes based on screen size rather than platform
  return (
    <Image
      style={{ width: size, height: size }}
      source={NimbusLogoPNG}
      resizeMode="contain"
    />
  );
};
