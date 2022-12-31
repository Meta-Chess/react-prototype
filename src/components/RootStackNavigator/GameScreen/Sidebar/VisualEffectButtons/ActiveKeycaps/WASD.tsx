import React, { useContext } from "react";
import { Row } from "ui";
import { KeyCap } from "./KeyCap";
import { SFC } from "primitives";
import { GameContext } from "components/shared";
import { getPossibleBoards } from "components/shared/Board/useBoardType";
import { Tooltip } from "ui/Tooltip";
import { isPresent } from "utilities";

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

  const tooltipContent = [
    multipleBoardsAllowed ? "Press E to change the view." : undefined,
    horizontalRotationAllowed && verticalRotationAllowed
      ? "Press W, A, S, or D to rotate the view."
      : horizontalRotationAllowed
      ? "Press A or D to rotate the view."
      : verticalRotationAllowed
      ? "Press W or S to rotate the view."
      : undefined,
  ]
    .filter(isPresent)
    .join("\n");

  return (
    <Tooltip content={tooltipContent} style={style}>
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
    </Tooltip>
  );
};
