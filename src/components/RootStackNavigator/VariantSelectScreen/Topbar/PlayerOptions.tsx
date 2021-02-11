import React from "react";
import { SFC, Text } from "primitives";
import { TopbarOption } from "ui/Pressable";
import { OptionGroup } from "./OptionGroup";
import { Players, PlayersType } from "../VariantSelectScreen";

interface Props {
  selectedPlayers: PlayersType;
  setSelectedPlayers: (x: PlayersType) => void;
}

const PlayerOptions: SFC<Props> = ({ selectedPlayers, setSelectedPlayers, style }) => {
  return (
    <OptionGroup title={"Players"} style={style}>
      {Players.map((n) => {
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
