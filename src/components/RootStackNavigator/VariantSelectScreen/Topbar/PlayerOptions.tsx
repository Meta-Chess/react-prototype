import React from "react";
import { range } from "utilities";
import { SFC, Text } from "primitives";
import { OptionGroup } from "ui/Forms";

interface Props {
  numberOfPlayers: number;
  setNumberOfPlayers: (x: number) => void;
  disabledPlayers: number[];
}

const PlayerOptions: SFC<Props> = ({
  numberOfPlayers,
  setNumberOfPlayers,
  disabledPlayers,
  style,
}) => {
  const options = range(2, 3).map((n) => {
    return {
      label: (
        <Text cat={"BodyL"} selectable={false}>
          {n}
        </Text>
      ),
      value: n,
      disabled: disabledPlayers.includes(n),
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
