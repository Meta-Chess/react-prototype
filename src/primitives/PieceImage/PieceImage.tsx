import React, { FC } from "react";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "./sprites";

interface Props {
  type: string;
  color: string;
  size: number;
}

const PieceImage: FC<Props> = ({ type, color, size }) => {
  switch (type) {
    case "Pawn":
      return <Pawn size={size} color={color} active={false} />;
    case "Rook":
      return <Rook size={size} color={color} active={false} />;
    case "Knight":
      return <Knight size={size} color={color} active={false} />;
    case "Bishop":
      return <Bishop size={size} color={color} active={false} />;
    case "King":
      return <King size={size} color={color} active={false} />;
    case "Queen":
      return <Queen size={size} color={color} active={false} />;
    default:
      return null;
  }
};

export { PieceImage };
