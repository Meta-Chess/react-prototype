import React, { useContext } from "react";
import { ButtonSecondary } from "ui/Buttons";
import { SFC } from "primitives";
import { ArrowForward } from "primitives/icons";
import { GameContext } from "game";

export const ForwardHistoryButton: SFC = ({ style }) => {
  const { gameMaster } = useContext(GameContext);
  return (
    <ButtonSecondary
      label={<ArrowForward />}
      style={style}
      onPress={(): void =>
        gameMaster?.setPositionInHistory(gameMaster.positionInHistory + 1)
      }
    />
  );
};
