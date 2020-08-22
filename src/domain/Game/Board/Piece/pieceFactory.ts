import * as gaits from "./defaultGaits";
import { Piece } from "./Piece";
import { Gait, PieceName, Player, TokenName, Token, GaitParams } from "domain/Game/types";

export function createRook(location: string, owner: Player): Piece {
  return new Piece(location, PieceName.Rook, () => gaits.ROOK_GAITS, owner);
}

export function createBishop(location: string, owner: Player): Piece {
  return new Piece(location, PieceName.Bishop, () => gaits.BISHOP_GAITS, owner);
}

export function createQueen(location: string, owner: Player): Piece {
  return new Piece(location, PieceName.Queen, () => gaits.QUEEN_GAITS, owner);
}

export function createKnight(location: string, owner: Player): Piece {
  return new Piece(location, PieceName.Knight, () => gaits.KNIGHT_GAITS, owner);
}

export function createKing(location: string, owner: Player): Piece {
  return new Piece(location, PieceName.King, () => gaits.KING_GAITS, owner);
}

export function createPawn(location: string, owner: Player): Piece {
  return owner === Player.White
    ? new Piece(location, PieceName.Pawn, () => gaits.WHITE_PAWN_GAITS, owner, [
        { name: TokenName.PawnDoubleStep, validTo: undefined, data: undefined },
      ])
    : new Piece(location, PieceName.Pawn, () => gaits.BLACK_PAWN_GAITS, owner, [
        { name: TokenName.PawnDoubleStep, validTo: undefined, data: undefined },
      ]);
}

export function createPiece(input: {
  location: string;
  owner: Player;
  name: PieceName;
  gaits?: Gait[];
  gaitGenerators?: (() => Gait[])[];
  tokens?: Token[];
}): Piece {
  const gaitGenerators = [
    ...(input.gaitGenerators || []),
    ...(input.gaits ? [(): Gait[] => input.gaits] : []),
  ];
  const gaitGenerator =
    gaitGenerators === []
      ? defaultGaitGenerator({ name, owner: input.owner })
      : (p: GaitParams): Gait[] => gaitGenerators.map((generator) => generator(p)).flat();
}

const defaultGaitGenerator = ({
  name,
  owner,
}: {
  name: PieceName;
  owner: Player;
}): (() => Gait[]) => {
  if (name === PieceName.Pawn) {
    if (owner === Player.White) return (): Gait[] => gaits.WHITE_PAWN_GAITS;
    if (owner === Player.Black) return (): Gait[] => gaits.BLACK_PAWN_GAITS;
  }
  if (name === PieceName.Knight) return (): Gait[] => gaits.KNIGHT_GAITS;
  if (name === PieceName.Bishop) return (): Gait[] => gaits.BISHOP_GAITS;
  if (name === PieceName.Rook) return (): Gait[] => gaits.ROOK_GAITS;
  if (name === PieceName.King) return (): Gait[] => gaits.KING_GAITS;
  if (name === PieceName.Queen) return (): Gait[] => gaits.QUEEN_GAITS;
  throw new Error(
    `No default gait generator for this piece name ${name} and owner ${owner}`
  );
};
