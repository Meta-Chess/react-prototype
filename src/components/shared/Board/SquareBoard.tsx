import React, { useContext, useState, useCallback, useEffect, useRef } from "react";
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

const ROTATION_TIME = 50;

const SquareBoard: SFC<BoardProps> = ({
  backboard = true,
  measurements,
  flipBoard = false,
}) => {
  const [verticalRotation, setVerticalRotation] = useState(0);
  const [horizontalRotation, setHorizontalRotation] = useState(0);
  const verticalRef = useRef(0);
  const horizontalRef = useRef(0);
  const animationIsRunningRef = useRef(false);

  const { gameMaster } = useContext(GameContext);
  const horizontalRotationAllowed = gameMaster?.getRuleNames().includes("cylindrical");
  const verticalRotationAllowed = gameMaster
    ?.getRuleNames()
    .includes("verticallyCylindrical");

  const animationOffset = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const onKeyDownEvent = useCallback((event) => {
    let animateToValue = { x: 0, y: 0 };
    switch (event.key) {
      case "w":
        if (verticalRotationAllowed) {
          verticalRef.current += 1;
          animateToValue = { x: 0, y: 2 * measurements.squareSize };
        }
        break;
      case "a":
        if (horizontalRotationAllowed) {
          horizontalRef.current -= 1;
          animateToValue = { x: -2 * measurements.squareSize, y: 0 };
        }
        break;
      case "s":
        if (verticalRotationAllowed) {
          verticalRef.current -= 1;
          animateToValue = { x: 0, y: -2 * measurements.squareSize };
        }
        break;
      case "d":
        if (horizontalRotationAllowed) {
          horizontalRef.current += 1;
          animateToValue = { x: 2 * measurements.squareSize, y: 0 };
        }
        break;
    }
    if (!animationIsRunningRef.current) {
      animationIsRunningRef.current = true;
      Animated.timing(animationOffset, {
        toValue: animateToValue,
        duration: ROTATION_TIME,
        easing: Easing.out(Easing.ease),
        useNativeDriver: Platform.OS === "ios",
      }).start(() => {
        setTimeout(() => {
          if (animateToValue.y) setVerticalRotation(verticalRef.current);
          if (animateToValue.x) setHorizontalRotation(horizontalRef.current);
          animationOffset.setValue({ x: 0, y: 0 });
          animationIsRunningRef.current = false;
        }, 5);
      });
    }
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
  const fileCoordinates = range(minFile - 1, maxFile - minFile + 3);
  const rankCoordinates = range(minRank - 1, maxRank - minFile + 3);

  const horizontalWrap = wrapToCylinder(minFile, maxFile);
  const verticalWrap = wrapToCylinder(minRank, maxRank);

  return (
    <BoardContainer measurements={measurements} backboard={backboard}>
      <AbsoluteView
        style={{ overflow: "hidden", margin: measurements.boardPaddingHorizontal }}
      >
        <Animated.View
          style={{
            marginLeft: animationOffset.x,
            marginBottom: animationOffset.y,
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
                          rank: verticalWrap(rank - verticalRotation),
                          file: horizontalWrap(file - horizontalRotation),
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
