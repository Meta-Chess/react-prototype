import React, { useContext, useCallback, useEffect } from "react";
import { ButtonSecondary } from "ui";
import { SFC } from "primitives";
import { SkipBackIcon } from "primitives/icons";
import { GameContext } from "components/shared";

export const BackHistoryButton: SFC = ({ style }) => {
  const { gameMaster } = useContext(GameContext);
  const disabled = !gameMaster?.positionInHistory;

  const backCommand = useCallback(() => gameMaster?.resetToStartOfGame(), []);
  const onKeyDownEvent = useCallback((event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      backCommand();
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
      label={SkipBackIcon}
      style={style}
      disabled={disabled}
      onPress={backCommand}
    />
  );
};
