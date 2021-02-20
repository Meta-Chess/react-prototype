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

  const animationOffset = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const onKeyDownEvent = useCallback(
    (event) => {
      switch (event.key) {
        case "w":
          setVerticalRotation(verticalRotation + 1);
          animationOffset.setValue({ x: 0, y: -2 * measurements.squareSize });
          break;
        case "a":
          setHorizontalRotation(horizontalRotation - 1);
          animationOffset.setValue({ x: 2 * measurements.squareSize, y: 0 });
          break;
        case "s":
          setVerticalRotation(verticalRotation - 1);
          animationOffset.setValue({ x: 0, y: 2 * measurements.squareSize });
          break;
        case "d":
          setHorizontalRotation(horizontalRotation + 1);
          animationOffset.setValue({ x: -2 * measurements.squareSize, y: 0 });
          break;
      }
      Animated.timing(animationOffset, {
        toValue: { x: 0, y: 0 },
        duration: ROTATION_TIME,
        easing: Easing.out(Easing.ease),
        useNativeDriver: Platform.OS === "ios",
      }).start();
    },
    [horizontalRotation, verticalRotation]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDownEvent, false);
    return () => {
      document.removeEventListener("keydown", onKeyDownEvent, false);
    };
  }, [onKeyDownEvent]);

  const { gameMaster } = useContext(GameContext);
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
            flexDirection: flipBoard ? "row-reverse" : "row",
            marginLeft: animationOffset.x,
            marginBottom: animationOffset.y,
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
