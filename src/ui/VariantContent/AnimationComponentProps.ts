import { SquareShape } from "game";
import { PieceVisualData } from "game/types";

export interface AnimationComponentProps {
  shape: SquareShape;
  size: number;
  duration: number;
  delay?: number;
  pieceVisualData?: PieceVisualData;
  bodyColorChange?: string;
  outlineColorChange?: string;
}
