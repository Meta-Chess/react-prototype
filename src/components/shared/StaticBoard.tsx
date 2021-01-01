import React, { ReactElement } from "react";
import { Board, calculateBoardMeasurements } from "components/shared/Board";
import { Colors, SFC } from "primitives";
import { AbsoluteView } from "ui";
import { TokenName } from "game/types";
import { GameMaster, SimpleGameProvider } from "game";
import { View, Pressable } from "react-native";
import styled from "styled-components/native";
import { PressableState } from "ui/Pressable/PressableState";

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
  const shape = gameMaster.game.board.firstTokenWithName(TokenName.Shape)?.data?.shape;
  const boardMeasurements = calculateBoardMeasurements({
    board: gameMaster.game.board,
    boardAreaWidth: width,
    boardAreaHeight: height,
    shape,
    backboard: false,
  });

  return (
    <Container style={[style, { width, height }]}>
      <Pressable onPress={onPress}>
        {({ pressed, hovered, focused }: PressableState): ReactElement => (
          <>
            <SimpleGameProvider gameMaster={gameMaster}>
              <Board measurements={boardMeasurements} backboard={false} />
            </SimpleGameProvider>
            <AbsoluteView
              style={{
                backgroundColor: pressed
                  ? Colors.DARKISH.fade(0.5).toString()
                  : hovered || focused
                  ? Colors.DARKISH.fade(0.3).toString()
                  : "transparent",
              }}
            />
          </>
        )}
      </Pressable>
    </Container>
  );
};

const Container = styled(View)`
  overflow: hidden;
`;
