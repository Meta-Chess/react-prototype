import React from "react";
import { Board, calculateBoardMeasurements } from "components/shared/Board";
import { Colors, SFC, useHover } from "primitives";
import { AbsoluteTouchableOpacity } from "ui";
import { GameMaster, SimpleGameProvider, TokenName } from "game";
import { View } from "react-native";

interface Props {
  gameMaster: GameMaster;
  flipBoard?: boolean;
  onPress?: () => void;
  maxWidth?: number;
  maxHeight?: number;
}

export const StaticBoard: SFC<Props> = ({
  gameMaster,
  flipBoard,
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
        <Board measurements={boardMeasurements} flipBoard={flipBoard} backboard={false} />
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
