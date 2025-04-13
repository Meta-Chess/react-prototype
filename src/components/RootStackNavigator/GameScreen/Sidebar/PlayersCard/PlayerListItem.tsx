import React, { useContext, useState } from "react";
import { AbsoluteView, Row } from "ui";
import { Colors, DrawIcon, PieceImage, SFC, Text } from "primitives";
import { OnlineGameMaster, PieceName, PlayerName } from "game";
import { GameContext, Timer } from "components/shared";
import { View } from "react-native";
import { Player } from "game/Player/Player";
import styled from "styled-components/native";
import { randomChoice, randomInt } from "utilities";
import { RollingVariantsCounter } from "components/RootStackNavigator/GameScreen/Sidebar/PlayersCard/RollingVariantsCounter";
import { PlayerPieceAdvantage } from "./PlayerPieceAdvantage";
import Color from "color";
import { LoginContext } from "components";

interface Props {
  player: Player;
  currentPlayerName?: PlayerName;
}

export const PlayerListItem: SFC<Props> = ({ player, currentPlayerName }) => {
  const { user, loading: userIsLoading } = useContext(LoginContext);
  const [defaultName] = useState(
    randomChoice([
      "Emmanuel",
      "Gus",
      "Angus",
      "Seb",
      "StockFish",
      "Random Move Ai",
      "King",
      "Knight",
      "Pawn",
      "Bishop",
      "Rook",
    ])
  );
  const [rating] = useState(randomInt(100, 3000));
  const { gameMaster } = useContext(GameContext);
  if (gameMaster === undefined) return null;
  const assignedPlayers = gameMaster.assignedPlayers;
  const isYou = assignedPlayers.includes(player.name);
  const everyoneIsYou = assignedPlayers.length === gameMaster.game.getPlayers().length;
  const name = isYou ? user?.username ?? defaultName : defaultName;
  const ruleNames = gameMaster.getRuleNames();
  const rowActive = player.name === currentPlayerName;
  const offeringDraw = player.wantsToDraw;

  return (
    <View>
      <Container style={{ paddingTop: 8 }} active={rowActive}>
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
              <Text cat={"BodyM"} loading={isYou && userIsLoading}>
                {name}
              </Text>
              {isYou && !everyoneIsYou && (
                <Text
                  cat={"BodyS"}
                  color={Colors.TEXT.LIGHT_SECONDARY.toString()}
                  style={{ marginLeft: 8 }}
                >
                  {"(You)"}
                </Text>
              )}
            </Row>
            <Row>
              {gameMaster instanceof OnlineGameMaster && (
                <Dot
                  color={player.connected ? Colors.SUCCESS : Colors.WARNING}
                  style={{ marginRight: 8 }}
                />
              )}
              <Text cat={"BodyXS"} color={Colors.TEXT.LIGHT_SECONDARY.toString()}>
                {rating}
              </Text>
              {offeringDraw && (
                <View style={{ marginLeft: 8 }}>
                  <DrawIcon color={Colors.SUCCESS.toString()} size={14} />
                </View>
              )}
            </Row>
          </View>
        </Row>
        <Row style={{ alignItems: "center" }}>
          {ruleNames.includes("rollingVariants") && (
            <RollingVariantsCounter
              count={player.getRuleData("rollingVariantsCounter")}
            />
          )}
          <Timer playerName={player.name} />
        </Row>
      </Container>
      <Container style={{ paddingBottom: 8 }} active={rowActive}>
        <PlayerPieceAdvantage player={player} />
      </Container>
      {!player.alive && (
        <AbsoluteView style={{ backgroundColor: Colors.DARK.fade(0.2).toString() }} />
      )}
    </View>
  );
};

const Container = styled(Row)<{ active: boolean }>`
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 16px;
  ${({ active }): string =>
    active ? `background-color: ${Colors.WHITE.fade(0.92).toString()};` : ""}
`;

const Dot = styled(View)<{ color: Color }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ color }): string => color.toString()};
`;
