import React, { useContext } from "react";
import { View } from "react-native";
import { Row } from "ui";
import { KeyCap } from "./KeyCap";
import { SFC } from "primitives";
import { GameContext } from "components/shared";
import { isCircularBoardPossible } from "components/shared/Board/useCircularBoard";

export const WASD: SFC = ({ style }) => {
  const { gameMaster } = useContext(GameContext);

  //TODO: notice if the visual is circular and then change these keys accordingly
  const horizontalRotationAllowed = !!gameMaster?.getRuleNames().includes("cylindrical");
  const verticalRotationAllowed = !!gameMaster
    ?.getRuleNames()
    .includes("verticallyCylindrical");

  const circularBoardAllowed = isCircularBoardPossible(gameMaster);
  if (!horizontalRotationAllowed && !verticalRotationAllowed && !circularBoardAllowed)
    return null;

  return (
    <View style={style}>
      <Row>
        <KeyCap />
        <KeyCap letter={"W"} active={verticalRotationAllowed} />
        <KeyCap letter={"E"} active={circularBoardAllowed} />
      </Row>
      <Row>
        <KeyCap letter={"A"} active={horizontalRotationAllowed} />
        <KeyCap letter={"S"} active={verticalRotationAllowed} />
        <KeyCap letter={"D"} active={horizontalRotationAllowed} />
      </Row>
    </View>
  );
};
