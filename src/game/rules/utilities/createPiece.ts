import { standardGaits, hexGaits } from "../constants";
import { Piece } from "game/Board";
import { Gait, PieceName, PlayerName, Token, GaitParams } from "game/types";

type GaitGenerator = (p?: GaitParams) => Gait[];

export enum PieceSet {
  Standard,
  HexStandard,
}

interface PieceCreationInput {
  location?: string;
  owner: PlayerName;
  name: PieceName;
  gaits?: Gait[];
  gaitGenerators?: GaitGenerator[];
  tokens?: Token[];
  set?: PieceSet;
}

export function createPiece(input: PieceCreationInput): Piece {
  const { location, owner, name, tokens } = input;
  const gaitGenerator = determineGaitGenerator(input);
  return new Piece(name, gaitGenerator, owner, location, tokens);
}

export function determineGaitGenerator(input: PieceCreationInput): GaitGenerator {
  const gaitGenerators = input.gaitGenerators || [];
  const gaits = input.gaits;
  if (gaits) gaitGenerators.push(() => gaits);

  return gaitGenerators.length === 0
    ? defaultGaitGenerator({ name: input.name, owner: input.owner, set: input.set })
    : (params: GaitParams | undefined): Gait[] =>
        gaitGenerators.map((generator) => generator(params)).flat();
}

const defaultGaitGenerator = ({
  name,
  owner,
  set,
}: {
  name: PieceName;
  owner: PlayerName;
  set: PieceSet | undefined;
}): (() => Gait[]) => {
  const gaits = set !== undefined ? allGaits[set] : allGaits[PieceSet.Standard];

  if (name === PieceName.Pawn) {
    if (owner === PlayerName.White) return (): Gait[] => gaits.WHITE_PAWN_GAITS;
    if (owner === PlayerName.Black) return (): Gait[] => gaits.BLACK_PAWN_GAITS;
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

const allGaits = {
  [PieceSet.Standard]: standardGaits,
  [PieceSet.HexStandard]: hexGaits,
};
