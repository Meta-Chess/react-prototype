import React, { useContext } from "react";
import { Colors, SFC } from "primitives";
import { RuleName, Square, Token, TokenName } from "game";
import { useModals } from "ui";
import { GameContext, Piece3D } from "components/shared";
import { TileSchematic } from "ui/Tiles/TileProps";
import { Vector3 } from "three";
import { getDisplayPiecesAndTokens } from "components/shared/Board/Square/getDisplayPiecesAndTokens";
import { CenterHighlights3D } from "components/shared/Board/Square/Highlight/CenterHighlights3D";
import {
  getMercatorSquareGeometry,
  rankFileToSphereCoords,
} from "primitives/Shapes/MercatorSquare";

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
    gameMaster.onSquarePress(square.location);
  };

  const center = new Vector3(
    ...rankFileToSphereCoords(file + 0.5, rank + 0.5, numberOfFiles, numberOfRanks)
  ).setLength(0.99);

  return (
    <>
      <mesh
        geometry={getMercatorSquareGeometry(
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
