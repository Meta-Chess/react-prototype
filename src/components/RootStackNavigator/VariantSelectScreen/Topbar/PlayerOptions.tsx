import React from "react";
import { range } from "utilities";
import { SFC, Text } from "primitives";
import { OptionGroup } from "ui/Forms";
import { allPossiblePlayerNames } from "game/types";

interface Props {
  numberOfPlayers: number;
  setNumberOfPlayers: (x: number) => void;
}

const PlayerOptions: SFC<Props> = ({ numberOfPlayers, setNumberOfPlayers, style }) => {
  const options = range(2, Math.min(3, allPossiblePlayerNames.length - 1)).map((n) => {
    return { label: <Text cat={"BodyL"}>{n}</Text>, value: n };
  });

  return (
    <OptionGroup
      options={options}
      setSelected={setNumberOfPlayers}
      selected={numberOfPlayers}
      style={style}
      title={"Players"}
    />
  );
};

export { PlayerOptions };
