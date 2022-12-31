import React, { FC, useContext, useEffect, useRef } from "react";
import { Animated, Platform } from "react-native";
import { SquareShape, TokenName } from "game";
import { HexBoard } from "./HexBoard";
import { BoardMeasurements } from "./calculateBoardMeasurements";
import { GameContext } from "components/shared";
import { CircularBoard } from "./CircularBoard";
import { useBoardType } from "./useBoardType";
import { SquareBoard } from "./SquareBoard";
import { Board3D } from "./Board3D";
import { Colors, Text } from "primitives";
import { AbsoluteView } from "ui";

export interface BoardProps {
  backboard?: boolean;
  measurements: BoardMeasurements; // TODO: the measurements should maybe care about the board type?
  flipBoard?: boolean;
  circularBoard?: boolean;
}

export const Board: FC<BoardProps> = (props) => {
  const { gameMaster } = useContext(GameContext);
  const shapeToken = gameMaster?.game.board.firstTokenWithName(TokenName.Shape);

  // Animated modal opacity
  const modalOpacity = useRef(new Animated.Value(0.75)).current;
  useEffect(() => {
    // modalOpacity.setValue(0.5);
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(modalOpacity, {
        toValue: 0,
        duration: 1500,
        isInteraction: false,
        useNativeDriver: Platform.OS === "ios",
      }),
    ]).start();
  }, []);

  const boardTypeOverride =
    props.circularBoard === true
      ? "circular"
      : props.circularBoard === false
      ? "flat"
      : undefined;

  const { boardType, possibleBoards } = useBoardType(boardTypeOverride);

  return (
    <>
      {boardType === "circular" ? (
        <CircularBoard {...props} />
      ) : boardType === "flat" && shapeToken?.data?.shape === SquareShape.Hex ? (
        <HexBoard {...props} />
      ) : boardType === "flat" ? (
        <SquareBoard {...props} />
      ) : (
        <Board3D {...props} type={boardType} />
      )}
      {possibleBoards.length > 1 && (
        <AbsoluteView pointerEvents="none">
          <Animated.View
            style={{
              width: 240,
              padding: 16,
              backgroundColor: Colors.DARKER.toString(),
              opacity: modalOpacity,
              borderRadius: 12,
            }}
            pointerEvents="none"
          >
            <Text alignment={"center"}>Press E to change view</Text>
          </Animated.View>
        </AbsoluteView>
      )}
    </>
  );
};
