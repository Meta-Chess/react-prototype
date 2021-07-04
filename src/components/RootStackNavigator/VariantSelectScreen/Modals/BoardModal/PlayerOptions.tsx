import React from "react";
import { range } from "utilities";
import { SFC, Text } from "primitives";
import { OptionGroup } from "ui/Forms";

interface Props {
  numberOfPlayers: number;
  setNumberOfPlayers: (x: number) => void;
  allowedPlayers: number[];
}

const PlayerOptions: SFC<Props> = ({
  numberOfPlayers,
  setNumberOfPlayers,
  allowedPlayers,
  style,
}) => {
  const options = allowedPlayers.map((n) => {
    return {
      label: (
        <Text cat={"BodyL"} selectable={false}>
          {n}
        </Text>
      ),
      value: n,
    };
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
