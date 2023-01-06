import React, { useContext, useEffect, useMemo } from "react";
import {
  Colors,
  getCylinderCapsGeometry,
  getMobiusStripEdgeGeometry,
  getSpherePolarCapsGeometry,
  SFC,
  TILE_GRANULARITY,
} from "primitives";
import { objectMatches, range, wrapToCylinder } from "utilities";
import { SquareShape, TokenName } from "game";
import { BoardProps } from "components/shared/Board/Board";
import { GameContext } from "components/shared/GameContext";
import { AbsoluteView } from "ui";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Square3D } from "./Square";
import { BoardVisualisation3D } from "./useBoardVisualisation";
import { use3dCylinderRotation } from "./use3dCylinderRotation";
import { Lighting } from "./Lighting";
import { SquareBackboard } from "./SquareBackboard";
import { BoardViewContext } from "components/shared";

export const Board3D: SFC<BoardProps & { type: BoardVisualisation3D }> = ({
  backboard = true,
  measurements,
  type,
  // flipBoard = false, // TODO
}) => {
  const { gameMaster } = useContext(GameContext);
  useEffect(() => gameMaster?.game.board.setVisualShapeToken(SquareShape.Square));
  const game = gameMaster?.game;

  const { autoRotateCamera, initialCameraPosition, backgroundColor } =
    useContext(BoardViewContext);

  const boardSize = Math.min(measurements.boardAreaWidth, measurements.boardAreaHeight);
  measurements.width = boardSize;
  measurements.height = boardSize;

  const { minRank, maxRank, minFile, maxFile } = measurements.rankAndFileBounds;
  const numberOfFiles = useMemo(() => maxFile - minFile + 1, [minFile, maxFile]);
  const numberOfRanks = useMemo(() => maxRank - minRank + 1, [minRank, maxRank]);
  const fileCoordinates = useMemo(
    () => range(minFile, numberOfFiles),
    [minFile, numberOfFiles]
  );
  const rankCoordinates = useMemo(
    () => range(minRank, numberOfRanks),
    [minRank, numberOfRanks]
  );
  const { rankOffset, fileOffset } = use3dCylinderRotation();

  if (!game) return null;

  const horizontalWrap = wrapToCylinder(minFile, maxFile);
  const verticalWrap = wrapToCylinder(minRank, maxRank);

  const extraGeometry =
    type === "spherical"
      ? getSpherePolarCapsGeometry({
          numberOfFiles,
          numberOfRanks,
          fileGranularity: TILE_GRANULARITY,
        })
      : type === "cylindrical"
      ? getCylinderCapsGeometry({
          numberOfFiles,
          numberOfRanks,
          fileGranularity: TILE_GRANULARITY,
        })
      : type === "mobius"
      ? getMobiusStripEdgeGeometry({
          numberOfRanks,
          numberOfFiles,
          rankGranularity: TILE_GRANULARITY,
        })
      : null;

  return (
    <SquareBackboard measurements={measurements} backboard={backboard}>
      <AbsoluteView
        style={{ overflow: "hidden", margin: measurements.boardPaddingHorizontal }}
      >
        <Canvas
          style={{ background: backgroundColor.toString() }}
          camera={{ fov: 4, position: initialCameraPosition }}
          shadows
        >
          <Lighting />
          {fileCoordinates.map((file) =>
            rankCoordinates.map((rank) => {
              return (
                <Square3D
                  key={JSON.stringify([rank, file])}
                  square={game.board.firstSquareSatisfyingRule(
                    (square) =>
                      objectMatches({
                        rank: verticalWrap(rank),
                        file: horizontalWrap(file),
                      })(square.coordinates) &&
                      !square.hasTokenWithName(TokenName.InvisibilityToken)
                  )}
                  positionRank={verticalWrap(rank + rankOffset)}
                  positionFile={horizontalWrap(file + fileOffset)}
                  numberOfRanks={numberOfRanks}
                  numberOfFiles={numberOfFiles}
                  type={type}
                />
              );
            })
          )}
          {extraGeometry && (
            <mesh geometry={extraGeometry} receiveShadow>
              <meshStandardMaterial
                attach="material"
                color={Colors.WHITE.toString()}
                emissive={Colors.WHITE.toString()}
                emissiveIntensity={1}
                roughness={0.5}
              />
            </mesh>
          )}
          <OrbitControls autoRotate={autoRotateCamera} />
        </Canvas>
      </AbsoluteView>
    </SquareBackboard>
  );
};
