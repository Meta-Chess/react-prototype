import React, { useContext, useEffect, useMemo } from "react";
import { Animated, View } from "react-native";
import styled from "styled-components/native";
import { SFC } from "primitives";
import { objectMatches, range, wrapToCylinder } from "utilities";
import { SquareShape, TokenName } from "game";
import { Square } from "./Square";
import { BoardProps } from "components/shared/Board/Board";
import { GameContext } from "components/shared/GameContext";
import { AbsoluteView } from "ui";
import { useCylinderRotation } from "./useCylinderRotation";
import { SquareBackboard } from "./SquareBackboard";

const SquareBoard: SFC<BoardProps> = ({
  backboard = true,
  measurements,
  flipBoard = false,
}) => {
  const { gameMaster } = useContext(GameContext);
  useEffect(() => gameMaster?.game.board.setVisualShapeToken(SquareShape.Square));
  const {
    rotationMarginLeft,
    rotationMarginBottom,
    verticalRotationAllowed,
    horizontalRotationAllowed,
  } = useCylinderRotation(measurements);
  const game = gameMaster?.game;

  const { minRank, maxRank, minFile, maxFile } = measurements.rankAndFileBounds;
  const numberOfFiles = useMemo(() => maxFile - minFile + 1, [minFile, maxFile]);
  const numberOfRanks = useMemo(() => maxRank - minRank + 1, [minRank, maxRank]);
  const fileCoordinates = useMemo(
    () => range(minFile, horizontalRotationAllowed ? 2 * numberOfFiles : numberOfFiles),
    [minFile, numberOfFiles, horizontalRotationAllowed]
  );
  const rankCoordinates = useMemo(
    () => range(minRank, verticalRotationAllowed ? 2 * numberOfRanks : numberOfRanks),
    [minRank, numberOfRanks, verticalRotationAllowed]
  );

  if (!game) return null;

  const horizontalWrap = wrapToCylinder(minFile, maxFile);
  const verticalWrap = wrapToCylinder(minRank, maxRank);

  return (
    <SquareBackboard measurements={measurements} backboard={backboard}>
      <AbsoluteView
        style={{ overflow: "hidden", margin: measurements.boardPaddingHorizontal }}
      >
        <Animated.View
          style={{
            marginLeft: rotationMarginLeft,
            marginBottom: rotationMarginBottom,
            flexDirection: flipBoard ? "row-reverse" : "row",
          }}
        >
          {fileCoordinates.map((file) => (
            <ColumnContainer flipBoard={flipBoard} key={file}>
              {rankCoordinates.map((rank) => (
                <Square
                  size={measurements.squareSize}
                  shape={SquareShape.Square}
                  square={game.board.firstSquareSatisfyingRule(
                    (square) =>
                      objectMatches({
                        rank: verticalWrap(rank),
                        file: horizontalWrap(file),
                      })(square.coordinates) &&
                      !square.hasTokenWithName(TokenName.InvisibilityToken)
                  )}
                  key={JSON.stringify([rank, file])}
                />
              ))}
            </ColumnContainer>
          ))}
        </Animated.View>
      </AbsoluteView>
    </SquareBackboard>
  );
};

const ColumnContainer = styled(View)<{ flipBoard: boolean }>`
  flex-direction: ${({ flipBoard }): string => (flipBoard ? "column" : "column-reverse")};
`;

export { SquareBoard };
