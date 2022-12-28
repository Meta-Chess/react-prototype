import React, { useContext } from "react";
import { Colors, SFC } from "primitives";
import { RuleName, Square, Token, TokenName } from "game";
import { useModals } from "ui";
import { GameContext, Piece3D } from "components/shared";
import { TileSchematic } from "ui/Tiles/TileProps";
import { Vector2, Vector3 } from "three";
import Color from "color";
import { getDisplayPiecesAndTokens } from "components/shared/Board/Square/getDisplayPiecesAndTokens";
import { CenterHighlights3D } from "components/shared/Board/Square/Highlight/CenterHighlights3D";

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

  const backgroundColor = calculateBackgroundColor(square, rules);

  const piecesOrPieceAnimationsOnSquare: (string | Token)[] =
    getDisplayPiecesAndTokens(square);

  const { rank, file } = square.getCoordinates();
  const onPress = (): void => {
    modals.hideAll();
    console.log(rank, file);
    gameMaster.onSquarePress(square.location);
  };

  // TODO Spherical: extract and increase resolution
  const vertices = new Float32Array([
    ...toVertexCoords(file, rank, numberOfFiles, numberOfRanks),
    ...toVertexCoords(file, rank + 0.5, numberOfFiles, numberOfRanks),
    ...toVertexCoords(file, rank + 1, numberOfFiles, numberOfRanks),
    ...toVertexCoords(file + 0.5, rank, numberOfFiles, numberOfRanks),
    ...toVertexCoords(file + 0.5, rank + 0.5, numberOfFiles, numberOfRanks),
    ...toVertexCoords(file + 0.5, rank + 1, numberOfFiles, numberOfRanks),
    ...toVertexCoords(file + 1, rank, numberOfFiles, numberOfRanks),
    ...toVertexCoords(file + 1, rank + 0.5, numberOfFiles, numberOfRanks),
    ...toVertexCoords(file + 1, rank + 1, numberOfFiles, numberOfRanks),
  ]);
  const normals = vertices;
  const col = Color(backgroundColor);
  const colors = new Float32Array(
    [0, 0, 0, 0].flatMap(() => [col.red() / 256, col.green() / 256, col.blue() / 256])
  );
  const center = new Vector3(
    ...toVertexCoords(file + 0.5, rank + 0.5, numberOfFiles, numberOfRanks)
  );
  // Each group of three indices of vertices determines a triangular face and its orientation
  const indices = new Uint16Array([
    0, 1, 3, 4, 3, 1, 1, 2, 4, 5, 4, 2, 3, 4, 6, 7, 6, 4, 4, 5, 7, 8, 7, 5,
  ]);

  const pawnPoints = [
    new Vector2(0, 0),
    new Vector2(0.1, 0),
    new Vector2(0.1, 0.03),
    new Vector2(0, 0.03),
  ];
  for (let i = 0; i < 21; i++) {
    pawnPoints.push(
      new Vector2(
        0.08 * Math.sin((i * Math.PI) / 20),
        0.11 - 0.08 * Math.cos((i * Math.PI) / 20)
      )
    );
  }

  return (
    <>
      <mesh onClick={onPress} receiveShadow castShadow>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={vertices}
            count={vertices.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-normal"
            array={normals}
            count={normals.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={colors}
            count={colors.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="index"
            array={indices}
            itemSize={1}
            count={indices.length}
          />
        </bufferGeometry>
        <meshStandardMaterial attach="material" color={backgroundColor} roughness={0.5} />
      </mesh>

      {piecesOrPieceAnimationsOnSquare.map(
        (pieceOrToken, index) =>
          typeof pieceOrToken === "string" ? (
            <Piece3D
              piece={gameMaster.game.board.findPieceById(pieceOrToken)}
              size={1} // TODO
              key={index}
              position={center}
            />
          ) : null // TODO
      )}

      <CenterHighlights3D
        gameMaster={gameMaster}
        square={square}
        position={center}
        normal={center}
      />
    </>
  );
};

function toVertexCoords(
  file: number,
  rank: number,
  numberOfFiles: number,
  numberOfRanks: number
): [number, number, number] {
  const vector = new Vector3().setFromSphericalCoords(
    1,
    ((rank - 0.5) * Math.PI) / (numberOfRanks + 1), // the +1 is to leave room at the poles
    (file * 2 * Math.PI) / numberOfFiles
  );
  return [vector.x, vector.y, vector.z];
}

function calculateBackgroundColor(square: Square, rules?: RuleName[]): string {
  return Colors.SQUARE[colorIndex({ ...square.getCoordinates() })]
    .mix(Colors.DARK, shouldMixSquare(square, rules) ? 0.4 : 0)
    .string();
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
