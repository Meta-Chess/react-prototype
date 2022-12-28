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
import { SphericalSquare } from "components/shared/Board/SphericalSquare";

const SphericalBoard: SFC<BoardProps> = ({
  backboard = true,
  measurements,
  flipBoard = false,
}) => {
  const { gameMaster } = useContext(GameContext);
  useEffect(() => gameMaster?.game.board.setVisualShapeToken(SquareShape.Square));
  const game = gameMaster?.game;

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
        <Canvas style={{ background: Colors.BLACK.toString() }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[0, 20, 10]} intensity={1.5} />
          {fileCoordinates.map((file) =>
            rankCoordinates.map((rank) => (
              <SphericalSquare
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
              />
            ))
          )}
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

const ColumnContainer = styled(View)<{ flipBoard: boolean }>`
  flex-direction: ${({ flipBoard }): string => (flipBoard ? "column" : "column-reverse")};
`;

export { SphericalBoard };
