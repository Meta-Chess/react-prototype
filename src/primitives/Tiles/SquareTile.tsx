import React from "react";
import { SFC } from "primitives";
import { View } from "react-native";
import { TileProps } from "./TileProps";

const SquareTile: SFC<TileProps> = ({ size, color }) => {
  return <View style={{ height: size, width: size, backgroundColor: color }} />;
};

export { SquareTile };
