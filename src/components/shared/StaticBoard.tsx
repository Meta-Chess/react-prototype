import React from "react";
import { Board, calculateBoardMeasurements } from "components/shared/Board";
import { Colors, SFC, useHover } from "primitives";
import { AbsoluteTouchableOpacity } from "ui";
import { GameMaster, TokenName } from "game";
import { View } from "react-native";
import { SimpleGameProvider } from "./GameContext";

interface Props {
  gameMaster: GameMaster;
  flipBoard?: boolean;
  circularBoard?: boolean;
  onPress?: () => void;
  maxWidth?: number;
  maxHeight?: number;
}

export const StaticBoard: SFC<Props> = ({
  gameMaster,
  flipBoard,
  circularBoard,
  onPress,
  maxWidth = 200,
  maxHeight = 200,
  style,
}) => {
  const [ref, hovered] = useHover();
  const shape = gameMaster.game.board.firstTokenWithName(TokenName.Shape)?.data?.shape;
  const boardMeasurements = calculateBoardMeasurements({
    board: gameMaster.game.board,
    boardAreaWidth: maxWidth,
    boardAreaHeight: maxHeight,
    shape,
    backboard: false,
  });

  return (
    <View style={[style, { overflow: "hidden" }]}>
      <SimpleGameProvider gameMaster={gameMaster}>
        <Board
          measurements={boardMeasurements}
          flipBoard={flipBoard}
          circularBoard={circularBoard}
          backboard={false}
        />
      </SimpleGameProvider>
      <AbsoluteTouchableOpacity
        onPress={onPress}
        ref={ref}
        style={{
          backgroundColor: hovered ? Colors.DARKISH.fade(0.8).toString() : "transparent",
        }}
      />
    </View>
  );
};
