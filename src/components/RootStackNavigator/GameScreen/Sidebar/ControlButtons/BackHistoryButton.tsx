import React, { useContext, useCallback, useEffect } from "react";
import { ButtonSecondary } from "ui";
import { SFC } from "primitives";
import { ArrowBackIcon } from "primitives/icons";
import { GameContext } from "components/shared";

export const BackHistoryButton: SFC = ({ style }) => {
  const { gameMaster } = useContext(GameContext);
  const disabled = !gameMaster?.positionInHistory;

  const onKeyDownEvent = useCallback((event) => {
    if (event.key === "ArrowLeft") {
      gameMaster?.goBackwardsInHistory();
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
      label={ArrowBackIcon}
      style={style}
      disabled={disabled}
      onPress={(): void => gameMaster?.goBackwardsInHistory()}
    />
  );
};
