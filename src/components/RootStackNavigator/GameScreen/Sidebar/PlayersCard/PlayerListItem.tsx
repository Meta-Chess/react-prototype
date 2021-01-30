import React, { useState } from "react";
import { AbsoluteView, Row } from "ui";
import { Colors, PieceImage, SFC, Text } from "primitives";
import { PieceName, PlayerName } from "game";
import { Timer } from "components/shared";
import { View } from "react-native";
import { Player } from "game/Player";
import styled from "styled-components/native";
import { randomChoice, randomInt } from "utilities";

interface Props {
  player: Player;
  currentPlayerName?: PlayerName;
}

export const PlayerListItem: SFC<Props> = ({ player, currentPlayerName }) => {
  const [name] = useState(randomChoice(["Emmanuel", "Gus", "Angus", "Seb", "Matt"]));
  const [rating] = useState(randomInt(400, 2000));

  return (
    <Container active={player.name === currentPlayerName}>
      <Row style={{ alignItems: "center" }}>
        <PieceImage
          type={PieceName.King}
          color={Colors.PLAYER[player.name].toString()}
          size={40}
          key={player.name}
          style={{ marginBottom: 4 }}
        />
        <View style={{ marginLeft: 8 }}>
          <Text cat={"BodyM"}>{name}</Text>
          <Text cat={"BodyXS"} color={Colors.TEXT.LIGHT_SECONDARY.toString()}>
            {rating}
          </Text>
        </View>
      </Row>
      <Timer playerName={player.name} />
      {!player.alive && (
        <AbsoluteView style={{ backgroundColor: Colors.DARK.fade(0.2).toString() }} />
      )}
    </Container>
  );
};

const Container = styled(Row)<{ active: boolean }>`
  justify-content: space-between;
  align-items: center;
  padding-vertical: 8px;
  padding-horizontal: 16px;
  ${({ active }): string =>
    active ? `background-color: ${Colors.WHITE.fade(0.95).toString()};` : ""}
`;
