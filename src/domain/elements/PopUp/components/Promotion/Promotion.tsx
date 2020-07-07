import React, { FC } from "react";
import { PieceType, PopUpMeta } from "domain/types";
import { PromotionPiece } from "./components";

interface Props {
  meta: PopUpMeta;
}

const Promotion: FC<Props> = ({ meta }) => {
  if (!meta.piece) return null;
  return (
    <div style={{ flexDirection: "row", display: "flex" }}>
      <PromotionPiece
        piece={meta.piece}
        promoteTo={PieceType.Queen}
        size={100}
      />
      <PromotionPiece
        piece={meta.piece}
        promoteTo={PieceType.Rook}
        size={100}
      />
      <PromotionPiece
        piece={meta.piece}
        promoteTo={PieceType.Bishop}
        size={100}
      />
      <PromotionPiece
        piece={meta.piece}
        promoteTo={PieceType.Knight}
        size={100}
      />
    </div>
  );
};

export { Promotion };
