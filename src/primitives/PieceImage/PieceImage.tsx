import React, { FC } from "react";
import { PieceType } from "domain/State/types";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "./sprites";

interface Props {
  type: PieceType;
  color: string;
  size: number;
}

const PieceImage: FC<Props> = ({ type, color, size }) => {
  switch (type) {
    case PieceType.Pawn:
      return <Pawn size={size} color={color} active={false} />;
    case PieceType.Rook:
      return <Rook size={size} color={color} active={false} />;
    case PieceType.Knight:
      return <Knight size={size} color={color} active={false} />;
    case PieceType.Bishop:
      return <Bishop size={size} color={color} active={false} />;
    case PieceType.King:
      return <King size={size} color={color} active={false} />;
    case PieceType.Queen:
      return <Queen size={size} color={color} active={false} />;
    default:
      return null;
  }
};

export { PieceImage };
