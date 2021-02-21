import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { View, Animated, Platform, Easing } from "react-native";
import styled from "styled-components/native";
import { SFC, Colors } from "primitives";
import { objectMatches, range, wrapToCylinder } from "utilities";
import { GameContext, SquareShape, TokenName } from "game";
import { Square } from "./Square";
import { BoardProps } from "components/shared/Board/Board";
import { Styles } from "primitives/Styles";
import { BoardMeasurements } from "components/shared";
import { AbsoluteView } from "ui";

const ROTATION_TIME = 100;

const SquareBoard: SFC<BoardProps> = ({
  backboard = true,
  measurements,
  flipBoard = false,
}) => {
  const { gameMaster } = useContext(GameContext);
  const horizontalRotationAllowed = gameMaster?.getRuleNames().includes("cylindrical");
  const verticalRotationAllowed = gameMaster
    ?.getRuleNames()
    .includes("verticallyCylindrical");

  // TODO: handle screen resizing better
  const animationOffset = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const animationTargetX = useRef(0);
  const animationTargetY = useRef(0);

  const onKeyDownEvent = useCallback((event) => {
    switch (event.key) {
      case "w":
        if (verticalRotationAllowed)
          animationTargetY.current = animationTargetY.current - 1;

        break;
      case "a":
        if (horizontalRotationAllowed)
          animationTargetX.current = animationTargetX.current + 1;
        break;
      case "s":
        if (verticalRotationAllowed)
          animationTargetY.current = animationTargetY.current + 1;
        break;
      case "d":
        if (horizontalRotationAllowed)
          animationTargetX.current = animationTargetX.current - 1;
        break;
    }
    console.log(
      animationTargetX.current,
      animationTargetY.current,
      measurements.squareSize
    );
    Animated.timing(animationOffset, {
      toValue: { x: animationTargetX.current, y: animationTargetY.current },
      duration: ROTATION_TIME,
      easing: Easing.out(Easing.ease),
      useNativeDriver: Platform.OS === "ios",
    }).start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.addEventListener("keydown", onKeyDownEvent, false);
    return (): void => {
      document.removeEventListener("keydown", onKeyDownEvent, false);
    };
  }, [onKeyDownEvent]);

  const game = gameMaster?.game;
  if (!game) return null;

  const { minRank, maxRank, minFile, maxFile } = measurements.rankAndFileBounds;
  const numberOfFiles = useMemo(() => maxFile - minFile + 1, [minFile, maxFile]);
  const numberOfRanks = useMemo(() => maxRank - minRank + 1, [minRank, maxRank]);
  const fileCoordinates = useMemo(() => range(minFile, 2 * numberOfFiles), [
    minFile,
    numberOfFiles,
  ]);
  const rankCoordinates = useMemo(() => range(minRank, 2 * numberOfRanks), [
    minRank,
    numberOfRanks,
  ]);
  const squareSize = measurements.squareSize;
  const doubleSquareSize = useMemo(() => 2 * squareSize, [squareSize]);
  const squaresWidth = useMemo(() => squareSize * numberOfFiles, [
    squareSize,
    numberOfFiles,
  ]);
  const squaresHeight = useMemo(() => squareSize * numberOfRanks, [
    squareSize,
    numberOfRanks,
  ]);

  const wrappedAnimationOffsetX = Animated.subtract(
    squaresWidth,
    Animated.multiply(Animated.modulo(animationOffset.x, numberOfFiles), doubleSquareSize)
  );
  const wrappedAnimationOffsetY = Animated.subtract(
    squaresHeight,
    Animated.multiply(Animated.modulo(animationOffset.y, numberOfRanks), doubleSquareSize)
  );

  const horizontalWrap = wrapToCylinder(minFile, maxFile);
  const verticalWrap = wrapToCylinder(minRank, maxRank);

  return (
    <BoardContainer measurements={measurements} backboard={backboard}>
      <AbsoluteView
        style={{ overflow: "hidden", margin: measurements.boardPaddingHorizontal }}
      >
        <Animated.View
          style={{
            marginLeft: wrappedAnimationOffsetX,
            marginBottom: wrappedAnimationOffsetY,
          }}
        >
          <View
            key={"board_container"}
            style={{
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
          </View>
        </Animated.View>
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

export { SquareBoard };
