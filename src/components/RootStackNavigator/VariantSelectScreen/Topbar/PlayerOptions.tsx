import React from "react";
import { range } from "utilities";
import { SFC, Text } from "primitives";
import { TopbarOption } from "ui/Pressable";
import { OptionGroup } from "./OptionGroup";
import { allPossiblePlayerNames } from "game/types";

interface Props {
  selectedPlayers: number;
  setSelectedPlayers: (x: number) => void;
}

const PlayerOptions: SFC<Props> = ({ selectedPlayers, setSelectedPlayers, style }) => {
  return (
    <OptionGroup title={"Players"} style={style}>
      {range(2, allPossiblePlayerNames.length - 1).map((n) => {
        return (
          <TopbarOption
            key={n}
            active={n === selectedPlayers}
            onPress={(): void => setSelectedPlayers(n)}
          >
            {<Text cat={"BodyL"}>{n}</Text>}
          </TopbarOption>
        );
      })}
    </OptionGroup>
  );
};

export { PlayerOptions };
