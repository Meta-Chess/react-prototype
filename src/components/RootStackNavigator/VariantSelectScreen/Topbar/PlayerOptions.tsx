import React from "react";
import { range } from "utilities";
import { SFC, Text } from "primitives";
import { OptionGroup } from "ui/Forms";
import { allPossiblePlayerNames } from "game/types";

interface Props {
  selectedPlayers: number;
  setSelectedPlayers: (x: number) => void;
}

const PlayerOptions: SFC<Props> = ({ selectedPlayers, setSelectedPlayers, style }) => {
  const options = range(2, allPossiblePlayerNames.length - 1).map((n) => {
    return { label: <Text cat={"BodyL"}>{n}</Text>, value: n };
  });

  return OptionGroup<number>({
    options: options,
    setSelected: setSelectedPlayers,
    selected: selectedPlayers,
    style: style,
    title: "Players",
  });
};

export { PlayerOptions };
