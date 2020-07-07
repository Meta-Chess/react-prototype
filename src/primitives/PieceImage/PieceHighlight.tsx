import React, { FC } from "react";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "./sprites";

interface Props {
  type: string;
  color: string;
  size: number;
}

const PieceHighlight: FC<Props> = ({ type, color, size }) => {
  switch (type) {
    case "Pawn":
      return <Pawn size={size} color={color} active={true} />;
    case "Rook":
      return <Rook size={size} color={color} active={true} />;
    case "Knight":
      return <Knight size={size} color={color} active={true} />;
    case "Bishop":
      return <Bishop size={size} color={color} active={true} />;
    case "King":
      return <King size={size} color={color} active={true} />;
    case "Queen":
      return <Queen size={size} color={color} active={true} />;
    default:
      return null;
  }
};

export { PieceHighlight };
