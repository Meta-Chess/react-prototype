import React, { useContext } from "react";
import {
  cylinderInverseProjection,
  getSurfaceSquareGeometry,
  InverseProjection,
  mobiusInverseProjection,
  SFC,
  sphereInverseProjection,
  torusInverseProjection,
} from "primitives";
import { Square, SquareShape, Token } from "game";
import { useModals } from "ui";
import { GameContext, Piece3D } from "components/shared";
import { TileSchematic } from "ui/Tiles/TileProps";
import { getDisplayPiecesAndTokens } from "./getDisplayPiecesAndTokens";
import { ThreeEvent } from "@react-three/fiber";
import { Highlights3D } from "./Highlight";
import { BoardType3D } from "../useBoardType";
import { useGetSquareBackgroundColor } from "./useGetSquareBackgroundColor";
import { BoardMaterial } from "components/shared/Board/Square/BoardMaterial";

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
}) => {
  const modals = useModals();
  const { gameMaster } = useContext(GameContext);
  const backgroundColor = useGetSquareBackgroundColor(square, SquareShape.Square);

  if (!gameMaster || !square) return null;

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
        <BoardMaterial color={backgroundColor} />
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

      <Highlights3D
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
