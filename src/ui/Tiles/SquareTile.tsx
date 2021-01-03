import React from "react";
import { SFC } from "primitives";
import { TileProps } from "./TileProps";
import { AbsoluteView } from "ui/Containers";

const SquareTile: SFC<TileProps> = ({ size, color }) => {
  return <AbsoluteView style={{ height: size, width: size, backgroundColor: color }} />;
};

export { SquareTile };
