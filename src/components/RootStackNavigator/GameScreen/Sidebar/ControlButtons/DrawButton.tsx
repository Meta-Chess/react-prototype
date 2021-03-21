import React, { useContext } from "react";
import { Button } from "ui";
import { SFC } from "primitives";
import { DrawIcon } from "primitives/icons";
import { GameContext } from "components/shared";

interface Props {
  onPress: () => void;
}

export const DrawButton: SFC<Props> = ({ onPress, style }) => {
  const { gameMaster } = useContext(GameContext);
  const depressed = gameMaster?.game
    .getPlayers()
    .find((p) => p.name === gameMaster.assignedPlayer)?.wantsToDraw;
  return (
    <Button label={DrawIcon} style={style} onPress={onPress} depressed={depressed} />
  );
};
