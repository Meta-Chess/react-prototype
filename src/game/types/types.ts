import { ReactElement } from "react";
import { Direction } from "./Direction";
import { VariantName } from "game";

export interface Gait {
  pattern: Direction[];
  repeats?: boolean;
  interruptable?: boolean;
  nonBlocking?: boolean;
  mustNotCapture?: boolean;
  mustCapture?: boolean;
}

export interface Move {
  location: string;
  pieceDeltas: PieceDelta[];
  player: Player;
}

export interface PieceDelta {
  pId: string;
  destination: string;
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
  flipBoard: boolean;
  overTheBoard: boolean;
  roomId?: string;
  online: boolean;
}

export interface Modal {
  top: number;
  left: number;
  content?: ReactElement;
  onShow: () => void;
  onHide: () => void;
}
