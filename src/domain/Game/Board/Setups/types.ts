import { Square } from "../Square";
import { Piece } from "../Piece";
import { Adjacency } from "../Adjacencies";
import { Location } from "domain/Game/types";

export interface Setup {
  squares?: { location: Location; square: Square }[];
  adjacenciesRule?: (square: Square) => Adjacency[];
  piecesRule?: (square: Square) => Piece[];
}
