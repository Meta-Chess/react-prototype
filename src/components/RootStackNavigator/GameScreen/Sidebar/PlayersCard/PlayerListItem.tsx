import React, { useState, useContext } from "react";
import { AbsoluteView, Row } from "ui";
import { Colors, PieceImage, SFC, Text } from "primitives";
import { GameContext, PieceName, PlayerName } from "game";
import { Timer } from "components/shared";
import { View } from "react-native";
import { Player } from "game/Player/Player";
import styled from "styled-components/native";
import { randomChoice, randomInt } from "utilities";
import { RollingVariantsCounter } from "components/RootStackNavigator/GameScreen/Sidebar/PlayersCard/RollingVariantsCounter";

interface Props {
  player: Player;
  currentPlayerName?: PlayerName;
}

export const PlayerListItem: SFC<Props> = ({ player, currentPlayerName }) => {
  const [name] = useState(randomChoice(["Emmanuel", "Gus", "Angus", "Seb"]));
  const [rating] = useState(randomInt(100, 3000));

  const { gameMaster } = useContext(GameContext);
  if (gameMaster === undefined) return null;
  const ruleNames = gameMaster.getRuleNames();
  const assignedPlayer = gameMaster.assignedPlayer;
  const isYou = assignedPlayer === player.name;

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
          <Row style={{ alignItems: "baseline" }}>
            <Text cat={"BodyM"}>{name}</Text>
            {isYou && (
              <Text
                cat={"BodyS"}
                color={Colors.TEXT.LIGHT_SECONDARY.toString()}
                style={{ marginLeft: 8 }}
              >
                {"(You)"}
              </Text>
            )}
          </Row>
          <Text cat={"BodyXS"} color={Colors.TEXT.LIGHT_SECONDARY.toString()}>
            {rating}
          </Text>
        </View>
      </Row>
      <Row style={{ alignItems: "center" }}>
        {ruleNames.includes("rollingVariants") && (
          <RollingVariantsCounter count={player.getRuleData("rollingVariantsCounter")} />
        )}
        <Timer playerName={player.name} />
      </Row>
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
    active ? `background-color: ${Colors.WHITE.fade(0.92).toString()};` : ""}
`;
