import React, { useContext } from "react";
import { Colors, getSurfaceSquareGeometry, SFC, sphereProjection } from "primitives";
import { GameMaster, RuleName, Square, Token, TokenName } from "game";
import { useModals } from "ui";
import { GameContext, Piece3D } from "components/shared";
import { TileSchematic } from "ui/Tiles/TileProps";
import { Vector3 } from "three";
import {
  CenterHighlights3D,
  getDisplayPiecesAndTokens,
  getHighlightColorsAndTypes,
} from "./Square";
import Color from "color";

interface Props {
  square: Square | undefined;
  tileSchematic?: TileSchematic;
  numberOfRanks: number;
  numberOfFiles: number;
}

const SphericalSquareComponent: SFC<Props> = ({
  square,
  numberOfRanks,
  numberOfFiles,
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

  const { position: positionArray, normal: normalArray } = sphereProjection(
    file + 0.5,
    rank + 0.5,
    numberOfFiles,
    numberOfRanks
  );
  const centerPosition = new Vector3(...positionArray);
  const centerNormal = new Vector3(...normalArray);

  return (
    <>
      <mesh
        geometry={getSurfaceSquareGeometry(
          sphereProjection,
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
              position={centerPosition}
              normal={centerNormal}
            />
          ) : null // TODO: implement animation tokens
      )}

      <CenterHighlights3D
        gameMaster={gameMaster}
        square={square}
        position={centerPosition}
        normal={centerNormal}
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

export { SphericalSquareComponent as SphericalSquare };
