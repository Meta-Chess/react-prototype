import React, { FC } from "react";
import { Image } from "react-native";

interface Props {
  urlEnd: string;
}

export const TrackingPixel: FC<Props> = ({ urlEnd }) => {
  return (
    <Image
      style={{ position: "absolute", width: 1, height: 1 }}
      source={{ uri: "https://mchess.goatcounter.com/count?p=/" + urlEnd }}
    />
  );
};
