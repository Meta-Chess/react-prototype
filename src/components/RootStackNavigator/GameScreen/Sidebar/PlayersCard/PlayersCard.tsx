import React, { useContext } from "react";
import { SFC, Text } from "primitives";
import { Card } from "ui/Containers/Card";
import { GameContext } from "game";
import styled from "styled-components/native";
import { PlayerListItem } from "components/RootStackNavigator/GameScreen/Sidebar/PlayersCard/PlayerListItem";

const PlayersCard: SFC = ({ style }) => {
  const { gameMaster } = useContext(GameContext);
  const players = gameMaster?.game.players;
  const currentPlayerName = gameMaster?.game.getCurrentPlayerName();

  if (!players || !players.length) return null;

  return (
    <StyledCard style={style}>
      <Text cat="DisplayM" style={{ marginLeft: 16, marginBottom: 12 }}>
        Players
      </Text>
      {players.map((player) => (
        <PlayerListItem
          player={player}
          currentPlayerName={currentPlayerName}
          key={player.name}
        />
      ))}
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  padding-bottom: 8px;
  padding-left: 0;
  padding-right: 0;
`;

export { PlayersCard };
