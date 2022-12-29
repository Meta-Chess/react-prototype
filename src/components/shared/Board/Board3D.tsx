import React, { useContext, useEffect, useMemo } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Colors, SFC } from "primitives";
import { objectMatches, range, wrapToCylinder } from "utilities";
import { SquareShape, TokenName } from "game";
import { BoardProps } from "components/shared/Board/Board";
import { Styles } from "primitives/Styles";
import { GameContext } from "components/shared/GameContext";
import { AbsoluteView } from "ui";
import { BoardMeasurements } from "./calculateBoardMeasurements";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Vector2 } from "three";
import { Square3D } from "./Square3D";
import { getCapCirclesGeometry } from "primitives/Shapes";
import { BoardType3D } from "./useBoardType";

export const Board3D: SFC<BoardProps & { type: BoardType3D }> = ({
  backboard = true,
  measurements,
  type,
  // flipBoard = false, // TODO
}) => {
  const { gameMaster } = useContext(GameContext);
  useEffect(() => gameMaster?.game.board.setVisualShapeToken(SquareShape.Square));
  const game = gameMaster?.game;

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

  if (!game) return null;

  const horizontalWrap = wrapToCylinder(minFile, maxFile);
  const verticalWrap = wrapToCylinder(minRank, maxRank);

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
    <BoardContainer measurements={measurements} backboard={backboard}>
      <AbsoluteView
        style={{ overflow: "hidden", margin: measurements.boardPaddingHorizontal }}
      >
        <Canvas
          style={{ background: Colors.BLACK.toString() }}
          camera={{ fov: 4, position: [0, 0, -40] }}
          shadows
        >
          <ambientLight intensity={0.45} />
          <directionalLight position={[20, 0, 0]} color={0xffcccc} castShadow={true} />
          <directionalLight position={[-10, 0, 17]} color={0xccccff} castShadow={true} />
          <directionalLight position={[-10, 0, -17]} color={0xe5cce5} castShadow={true} />

          {fileCoordinates.map((file) =>
            rankCoordinates.map((rank) => (
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
                numberOfRanks={numberOfRanks}
                numberOfFiles={numberOfFiles}
                type={type}
              />
            ))
          )}
          <mesh
            geometry={getCapCirclesGeometry(numberOfFiles, numberOfRanks, 8)}
            receiveShadow
          >
            <meshStandardMaterial
              attach="material"
              color={Colors.WHITE.toString()}
              emissive={Colors.WHITE.toString()}
              emissiveIntensity={1}
              roughness={0.5}
            />
          </mesh>
          <OrbitControls />
        </Canvas>
      </AbsoluteView>
    </BoardContainer>
  );
};

const BoardContainer = styled(View)<{
  backboard: boolean;
  measurements: BoardMeasurements;
}>`
  position: relative;
  ${({ backboard }): string => (backboard ? Styles.BOX_SHADOW_STRONG : "")}
  ${({ backboard }): string =>
    backboard ? `background-color: ${Colors.DARK.toString()}` : ""}
          height: ${({ measurements }): number => measurements.height}px;
  width: ${({ measurements }): number => measurements.width}px;
  padding-horizontal: ${({ measurements }): number =>
    measurements.boardPaddingHorizontal}px;
  padding-vertical: ${({ measurements }): number => measurements.boardPaddingVertical}px;
`;
