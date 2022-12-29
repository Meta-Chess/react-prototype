import React, { useContext } from "react";
import {
  Colors,
  getSurfaceSquareGeometry,
  SFC,
  sphereProjection,
  torusProjection,
} from "primitives";
import { GameMaster, RuleName, Square, Token, TokenName } from "game";
import { useModals } from "ui";
import { GameContext, Piece3D } from "components/shared";
import { TileSchematic } from "ui/Tiles/TileProps";
import {
  CenterHighlights3D,
  getDisplayPiecesAndTokens,
  getHighlightColorsAndTypes,
} from "./Square";
import Color from "color";
import { BoardType3D } from "./useBoardType";

interface Props {
  square: Square | undefined;
  tileSchematic?: TileSchematic;
  numberOfRanks: number;
  numberOfFiles: number;
  type: BoardType3D;
}

const PROJECTIONS: { [k in BoardType3D]: Projection } = {
  spherical: sphereProjection,
  toroidal: torusProjection,
};

export const Square3D: SFC<Props> = ({
  square,
  numberOfRanks,
  numberOfFiles,
  type,
  // tileSchematic,
}) => {
  const modals = useModals();
  const { gameMaster } = useContext(GameContext);
  const rules = gameMaster?.getRuleNames();
  if (!gameMaster) return null;

  if (!square) return null;

  const backgroundColor = calculateBackgroundColor(gameMaster, square, rules);

  const piecesOrPieceAnimationsOnSquare: (string | Token)[] =
    getDisplayPiecesAndTokens(square);

  const { rank, file } = square.getCoordinates();
  const onPress = (): void => {
    modals.hideAll();
    gameMaster.onSquarePress(square.location);
  };

  const projection = PROJECTIONS[type];

  return (
    <>
      <mesh
        geometry={getSurfaceSquareGeometry(
          projection,
          file,
          rank,
          numberOfFiles,
          numberOfRanks,
          8,
          4
        )}
        onClick={onPress}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial
          attach="material"
          color={backgroundColor}
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>

      {piecesOrPieceAnimationsOnSquare.map(
        (pieceOrToken, index) =>
          typeof pieceOrToken === "string" ? (
            <Piece3D
              piece={gameMaster.game.board.findPieceById(pieceOrToken)}
              key={index}
              coordinates={{ rank, file, numberOfRanks, numberOfFiles }}
              projection={projection}
            />
          ) : null // TODO: implement animation tokens
      )}

      <CenterHighlights3D
        gameMaster={gameMaster}
        square={square}
        coordinates={{ rank, file, numberOfRanks, numberOfFiles }}
        projection={projection}
      />
    </>
  );
};

function calculateBackgroundColor(
  gameMaster: GameMaster,
  square: Square,
  rules?: RuleName[]
): string {
  let color = Colors.SQUARE[colorIndex({ ...square.getCoordinates() })].mix(
    Colors.DARK,
    shouldMixSquare(square, rules) ? 0.4 : 0
  );

  getHighlightColorsAndTypes({ gameMaster, square })
    .filter(({ type }) => type === "tile")
    .forEach(({ color: highlightColor }) => (color = color.mix(Color(highlightColor))));

  return color.toString();
}

function shouldMixSquare(square: Square, rules?: RuleName[]): boolean {
  return (
    !!rules?.includes("thinIce") &&
    (square.firstTokenWithName(TokenName.ThinIce)?.data?.thinIceData ?? 2) <= 1
  );
}

const colorIndex = ({ rank, file }: { rank: number; file: number }): number => {
  return (rank + file) % 2;
};
