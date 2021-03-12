import React, { useContext } from "react";
import { ButtonSecondary } from "ui/Buttons";
import { SFC } from "primitives";
import { GameContext } from "game";
import { ArrowForwardIcon } from "primitives/icons";
import { GameContext } from "game";

export const ForwardHistoryButton: SFC = ({ style }) => {
  const { gameMaster } = useContext(GameContext);
  return (
    <ButtonSecondary
      label={<ArrowForwardIcon />}
      style={style}
      onPress={(): void =>
        gameMaster?.setPositionInHistory(gameMaster.positionInHistory + 1)
      }
    />
  );
};
