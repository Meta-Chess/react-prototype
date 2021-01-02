import React from "react";
import { SFC } from "primitives";
import { View } from "react-native";

interface SquareTileProps {
  size: number;
  color: string;
}

const SquareTile: SFC<SquareTileProps> = ({ size, color }) => {
  return <View style={{ height: size, width: size, backgroundColor: color }} />;
};

export { SquareTile };
