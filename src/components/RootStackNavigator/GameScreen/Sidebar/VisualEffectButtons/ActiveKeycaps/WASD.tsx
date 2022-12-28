import React, { useContext } from "react";
import { View } from "react-native";
import { Row } from "ui";
import { KeyCap } from "./KeyCap";
import { SFC } from "primitives";
import { GameContext } from "components/shared";
import { getPossibleBoards } from "components/shared/Board/useBoardType";

export const WASD: SFC = ({ style }) => {
  const { gameMaster } = useContext(GameContext);

  //TODO: notice if the visual is circular and then change these keys accordingly
  const horizontalRotationAllowed = !!gameMaster?.getRuleNames().includes("cylindrical");
  const verticalRotationAllowed = !!gameMaster
    ?.getRuleNames()
    .includes("verticallyCylindrical");
  const multipleBoardsAllowed = getPossibleBoards(gameMaster).length > 1;

  if (!horizontalRotationAllowed && !verticalRotationAllowed && !multipleBoardsAllowed)
    return null;

  // TODO: WASD should be disabled when showing 3D boards (until 3D boards use WASD)
  return (
    <View style={style}>
      <Row>
        <KeyCap />
        <KeyCap letter={"W"} active={verticalRotationAllowed} />
        <KeyCap letter={"E"} active={multipleBoardsAllowed} />
      </Row>
      <Row>
        <KeyCap letter={"A"} active={horizontalRotationAllowed} />
        <KeyCap letter={"S"} active={verticalRotationAllowed} />
        <KeyCap letter={"D"} active={horizontalRotationAllowed} />
      </Row>
    </View>
  );
};
