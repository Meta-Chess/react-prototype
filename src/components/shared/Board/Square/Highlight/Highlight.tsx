import React, { FC } from "react";
import { GameMaster, Square, SquareShape } from "game";
import { Tile } from "ui";
import { TileSchematic } from "ui/Tiles/TileProps";
import { CenterHighlight } from "./CenterHighlight";
import { getHighlightColorsAndTypes } from "./getHighlightColorsAndTypes";

interface Props {
  gameMaster: GameMaster;
  square: Square;
  size?: number;
  shape: SquareShape;
  tileSchematic?: TileSchematic;
}

export const Highlight: FC<Props> = ({
  gameMaster,
  square,
  size,
  shape,
  tileSchematic,
}) => {
  return (
    <>
      {getHighlightColorsAndTypes({ gameMaster, square }).map(({ color, type }, index) =>
        type === "tile" ? (
          <Tile
            color={color}
            shape={shape}
            size={size}
            tileSchematic={tileSchematic}
            key={index}
          />
        ) : (
          <CenterHighlight
            color={color}
            shape={shape}
            tileSchematic={tileSchematic}
            key={index}
          />
        )
      )}
    </>
  );
};
