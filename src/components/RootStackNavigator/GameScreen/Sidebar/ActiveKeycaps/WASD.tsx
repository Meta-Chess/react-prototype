import React, { useContext } from "react";
import { View } from "react-native";
import { Row } from "ui";
import { KeyCap } from "./KeyCap";
import { SFC } from "primitives";
import { GameContext } from "components/shared";

export const WASD: SFC = ({ style }) => {
  const { gameMaster } = useContext(GameContext);
  const horizontalRotationAllowed = !!gameMaster?.getRuleNames().includes("cylindrical");
  const verticalRotationAllowed = !!gameMaster
    ?.getRuleNames()
    .includes("verticallyCylindrical");
  if (!horizontalRotationAllowed && !verticalRotationAllowed) return null;
  return (
    <View style={style}>
      <Row>
        <KeyCap />
        <KeyCap letter={"W"} active={verticalRotationAllowed} />
        <KeyCap />
      </Row>
      <Row>
        <KeyCap letter={"A"} active={horizontalRotationAllowed} />
        <KeyCap letter={"S"} active={verticalRotationAllowed} />
        <KeyCap letter={"D"} active={horizontalRotationAllowed} />
      </Row>
    </View>
  );
};
