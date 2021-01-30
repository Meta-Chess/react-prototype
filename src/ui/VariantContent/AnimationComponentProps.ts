import { SquareShape } from "game";
import { PieceVisualData } from "game/types";

export interface AnimationComponentProps {
  size: number;
  duration: number;
  shape?: SquareShape;
  delay?: number;
  pieceVisualData?: PieceVisualData;
  bodyColorChange?: string;
  outlineColorChange?: string;
}
