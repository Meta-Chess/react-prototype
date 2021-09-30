import React, { FC } from "react";
import { Colors } from "primitives";
import { Square, SquareShape, GameMaster, SquareInfo } from "game";
import Color from "color";
import { Tile } from "ui";
import { TileSchematic } from "ui/Tiles/TileProps";
import { CenterHighlight } from "./CenterHighlight";

interface Props {
  gameMaster: GameMaster;
  square: Square;
  size?: number;
  shape: SquareShape;
  tileSchematic?: TileSchematic;
}

const Highlight: FC<Props> = ({ gameMaster, square, size, shape, tileSchematic }) => {
  return (
    <>
      {gameMaster.squaresInfo
        .get(square.location) // TODO: sort highlights?
        .map((info, index) =>
          ![
            SquareInfo.PossibleMovePassiveEndPoint,
            SquareInfo.PossibleMoveAggressiveEndPoint,
            SquareInfo.PossibleOtherPlayerMoveEndPoint,
          ].includes(info) || square.hasPiece() ? (
            <Tile
              color={HIGHLIGHT_COLORS[info].fade(0.3).toString()}
              shape={shape}
              size={size}
              tileSchematic={tileSchematic}
              key={index}
            />
          ) : (
            <CenterHighlight
              color={HIGHLIGHT_COLORS[info]}
              shape={shape}
              tileSchematic={tileSchematic}
              key={index}
            />
          )
        )}
    </>
  );
};

const HIGHLIGHT_COLORS: { [key in SquareInfo]: Color } = {
  [SquareInfo.PossibleMovePassiveEndPoint]: Colors.HIGHLIGHT.SUCCESS,
  [SquareInfo.PossibleMoveAggressiveEndPoint]: Colors.HIGHLIGHT.ERROR,
  [SquareInfo.PossibleOtherPlayerMoveEndPoint]: Colors.HIGHLIGHT.INFO,
  [SquareInfo.SelectedCurrentPlayerPiece]: Colors.HIGHLIGHT.WARNING,
  [SquareInfo.SelectedOtherPlayerPiece]: Colors.HIGHLIGHT.INFO,
  [SquareInfo.LastMoveStartPoint]: Colors.HIGHLIGHT.WARNING_LIGHT.fade(0.3),
  [SquareInfo.LastMoveEndPoint]: Colors.HIGHLIGHT.WARNING_LIGHT.fade(0.3),
  [SquareInfo.LastMovePath]: Colors.HIGHLIGHT.WARNING_LIGHT.fade(0.5),
};

export { Highlight };
