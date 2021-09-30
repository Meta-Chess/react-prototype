import { SquareShape } from "game";
import { PieceVisualData } from "game/types";
import { TileSchematic } from "ui/Tiles/TileProps";

export interface AnimationComponentProps {
  size?: number;
  tileSchematic?: TileSchematic;
  duration: number;
  shape?: SquareShape;
  delay?: number;
  pieceVisualData?: PieceVisualData;
  bodyColorChange?: string;
  outlineColorChange?: string;
}
