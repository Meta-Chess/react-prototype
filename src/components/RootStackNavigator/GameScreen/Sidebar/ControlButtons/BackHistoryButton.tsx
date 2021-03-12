import React, { useContext } from "react";
import { ButtonSecondary } from "ui";
import { SFC } from "primitives";
import { ArrowBackIcon } from "primitives/icons";
import { GameContext } from "game";

export const BackHistoryButton: SFC = ({ style }) => {
  const { gameMaster } = useContext(GameContext);
  return (
    <ButtonSecondary
      label={<ArrowBackIcon />}
      style={style}
      onPress={(): void =>
        gameMaster?.setPositionInHistory(gameMaster.positionInHistory - 1)
      }
    />
  );
};
