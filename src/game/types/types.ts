import { ReactElement } from "react";
import { Direction } from "./Direction";
import { VariantName } from "game";
import { Path } from "game/Pather/Path";

export interface Gait {
  pattern: Direction[];
  repeats?: boolean;
  interruptable?: boolean;
  nonBlocking?: boolean;
  mustNotCapture?: boolean;
  mustCapture?: boolean;
  interceptable?: boolean;
}

export interface Move {
  pieceId: string;
  location: string;
  pieceDeltas: PieceDelta[];
  player: Player;
  interceptable?: boolean;
}

export interface PieceDelta {
  pId: string;
  path: Path;
}

export enum Player {
  White,
  Black,
}

export enum PieceName {
  Pawn,
  Rook,
  King,
  Queen,
  Bishop,
  Knight,
}

export interface GaitParams {
  tokens: Token[];
}

export interface Token {
  name: TokenName;
  expired: (turn: number) => boolean;
  data: undefined | TokenData;
}

export enum TokenName {
  PawnDoubleStep,
  PolarToken,
  MoveHistory,
  InvisibilityToken,
  Shape,
  ActiveCastling,
  PassiveCastling,
  CaptureToken,
  Fatigue,
}

interface TokenData {
  history?: string[];
  shape?: SquareShape;
  pieceId?: string;
}

export interface RankAndFileBounds {
  minRank: number;
  maxRank: number;
  minFile: number;
  maxFile: number;
}

export enum SquareShape {
  Square,
  Hex,
}

export interface GameOptions {
  variant: VariantName;
  time: number | undefined;
  checkEnabled: boolean;
  fatigueEnabled: boolean;
  atomicEnabled: boolean;
  flipBoard: boolean;
  overTheBoard: boolean;
  roomId?: string;
  online: boolean;
  interceptionEnabled: boolean;
}

export interface Modal {
  id: number;
  top: number;
  left: number;
  content?: ReactElement;
}
