import React, { useContext } from "react";
import {
  Colors,
  cylinderInverseProjection,
  getSurfaceSquareGeometry,
  InverseProjection,
  mobiusInverseProjection,
  SFC,
  sphereInverseProjection,
  torusInverseProjection,
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
import { BoardType3D } from "./useBoardType";
import { ThreeEvent } from "@react-three/fiber";

interface Props {
  square: Square | undefined;
  tileSchematic?: TileSchematic;
  positionRank: number;
  positionFile: number;
  numberOfRanks: number;
  numberOfFiles: number;
  type: BoardType3D;
}

const INVERSE_PROJECTIONS: { [k in BoardType3D]: InverseProjection } = {
  spherical: sphereInverseProjection,
  toroidal: torusInverseProjection,
  mobius: mobiusInverseProjection,
  cylindrical: cylinderInverseProjection,
};

export const Square3D: SFC<Props> = ({
  square,
  positionRank,
  positionFile,
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

  const onClick = (event: ThreeEvent<MouseEvent>): void => {
    event.stopPropagation();
    modals.hideAll();
    gameMaster.onSquarePress(square.location);
  };

  const inverseProjection = INVERSE_PROJECTIONS[type];

  return (
    <>
      <mesh
        geometry={getSurfaceSquareGeometry({
          inverseProjection,
          file: positionFile,
          rank: positionRank,
          numberOfFiles,
          numberOfRanks,
          fileGranularity: 64,
          rankGranularity: 64,
        })}
        onClick={onClick}
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
              coordinates={{
                rank: positionRank,
                file: positionFile,
                numberOfRanks,
                numberOfFiles,
              }}
              onClick={onClick}
              inverseProjection={inverseProjection}
            />
          ) : null // TODO: implement animation tokens
      )}

      <CenterHighlights3D
        gameMaster={gameMaster}
        square={square}
        coordinates={{
          rank: positionRank,
          file: positionFile,
          numberOfRanks,
          numberOfFiles,
        }}
        inverseProjection={inverseProjection}
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
    .forEach(({ color: highlightColor }) => (color = color.mix(highlightColor)));

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
