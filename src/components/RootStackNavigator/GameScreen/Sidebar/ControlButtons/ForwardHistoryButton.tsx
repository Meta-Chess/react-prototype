import React, { useContext } from "react";
import { ButtonSecondary } from "ui/Buttons";
import { SFC } from "primitives";
import { ArrowForwardIcon } from "primitives/icons";
import { GameContext } from "components/shared";

export const ForwardHistoryButton: SFC = ({ style }) => {
  const { gameMaster } = useContext(GameContext);
  const disabled = gameMaster?.stateIsCurrent();
  return (
    <ButtonSecondary
      label={ArrowForwardIcon}
      style={style}
      disabled={disabled}
      onPress={(): void => gameMaster?.goForwardsInHistory()}
    />
  );
};
