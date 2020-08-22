import React from "react";
import { SFC } from "primitives";
import { HexBoard } from "./HexBoard";

const Board: SFC = ({ style }) => {
  return <HexBoard style={style} />;
};

export { Board };
