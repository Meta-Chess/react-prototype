import { Piece } from "./Piece";
import { LocationPrefix } from "./location";

export enum PieceStatus {
  "NotGraveyard",
  "Graveyard",
  "Dead",
}

// todo (when required): unify shared conditional logic
// e.g. graveyard means graveyard, but not piece bank - establish defined piece bank condition
export const pieceStatusRules: { [status in PieceStatus]: (piece: Piece) => boolean } = {
  [PieceStatus.Graveyard]: (piece: Piece) => {
    return (
      piece.location.charAt(0) === LocationPrefix.graveyard &&
      piece.location.slice(0, 3) !== LocationPrefix.pieceBank
    );
  },
  [PieceStatus.NotGraveyard]: (piece: Piece) => {
    return (
      piece.location.charAt(0) !== LocationPrefix.graveyard ||
      piece.location.slice(0, 3) === LocationPrefix.pieceBank
    );
  },
  [PieceStatus.Dead]: (piece: Piece) => {
    return piece.location.charAt(0) === LocationPrefix.graveyard;
  },
};
