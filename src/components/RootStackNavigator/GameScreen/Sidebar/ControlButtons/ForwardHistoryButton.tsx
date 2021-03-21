import React, { useContext, useEffect, useCallback } from "react";
import { ButtonSecondary } from "ui/Buttons";
import { SFC } from "primitives";
import { ArrowForwardIcon } from "primitives/icons";
import { GameContext } from "components/shared";

export const ForwardHistoryButton: SFC = ({ style }) => {
  const { gameMaster } = useContext(GameContext);
  const disabled = gameMaster?.stateIsCurrent();

  const onKeyDownEvent = useCallback((event) => {
    if (event.key === "ArrowRight") {
      gameMaster?.goForwardsInHistory();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDownEvent, false);
    return (): void => {
      document.removeEventListener("keydown", onKeyDownEvent, false);
    };
  }, []);

  return (
    <ButtonSecondary
      label={ArrowForwardIcon}
      style={style}
      disabled={disabled}
      onPress={(): void => gameMaster?.goForwardsInHistory()}
    />
  );
};
