import React, { useCallback } from "react";
import { View } from "react-native";
import { Text, Colors, PieceImage, SFC } from "primitives";
import { OptionGroup } from "ui";
import { PieceName, PlayerType } from "game/types";
import { Row } from "ui";

const playerTypeOptions: { label: string; value: PlayerType; flex?: number }[] = [
  { label: "AI", value: "local_ai", flex: 1 },
  { label: "Local", value: "local_human", flex: 1 },
  { label: "Online", value: "online_human", flex: 1 },
];

interface Props {
  playerTypes: PlayerType[];
  setNumberOfPlayers: (x: number) => void;
  setPlayerTypes: (x: PlayerType[]) => void;
}

export const PlayerOptions: SFC<Props> = ({
  playerTypes,
  setNumberOfPlayers,
  setPlayerTypes,
  style,
}) => {
  const setPlayerType = useCallback(
    (playerIndex: number, type: PlayerType) => {
      const newPlayerTypes = playerTypes;
      newPlayerTypes[playerIndex] = type;
      setPlayerTypes(newPlayerTypes);
    },
    [setPlayerTypes]
  );

  return (
    <View style={style}>
      <Text cat="DisplayXS" style={{ marginBottom: 4 }}>
        {"Players"}
      </Text>
      {playerTypes.map((type, index) => {
        return (
          <Row key={index} style={{ alignItems: "center", marginBottom: "4px" }}>
            <PieceImage
              type={PieceName.Pawn}
              color={Colors.PLAYER[index].toString()}
              size={32}
              style={{ marginBottom: 2 }}
            />
            <OptionGroup
              options={playerTypeOptions}
              setSelected={(type): void => setPlayerType(index, type)}
              selected={type}
              style={{ flex: 1 }}
            />
          </Row>
        );
      })}
    </View>
  );
};
