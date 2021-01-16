import React from "react";
import { Board, calculateBoardMeasurements } from "components/shared/Board";
import { Colors, SFC, useHover } from "primitives";
import { AbsoluteTouchableOpacity } from "ui";
import { GameMaster, SimpleGameProvider, TokenName } from "game";
import { View } from "react-native";

interface Props {
  gameMaster: GameMaster;
  onPress?: () => void;
  width?: number;
  height?: number;
}

export const StaticBoard: SFC<Props> = ({
  gameMaster,
  onPress,
  width = 200,
  height = 200,
  style,
}) => {
  const [ref, hovered] = useHover();
  const shape = gameMaster.game.board.firstTokenWithName(TokenName.Shape)?.data?.shape;
  const boardMeasurements = calculateBoardMeasurements({
    board: gameMaster.game.board,
    boardAreaWidth: width,
    boardAreaHeight: height,
    shape,
    backboard: false,
  });

  return (
    <View style={[style, { width, height, overflow: "hidden" }]}>
      <SimpleGameProvider gameMaster={gameMaster}>
        <Board measurements={boardMeasurements} backboard={false} />
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
