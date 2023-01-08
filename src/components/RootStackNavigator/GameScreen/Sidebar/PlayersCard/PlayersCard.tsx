import React, { useContext } from "react";
import { SFC, Text } from "primitives";
import { Block } from "ui/Containers/Block";
import styled from "styled-components/native";
import { PlayerListItem } from "components/RootStackNavigator/GameScreen/Sidebar/PlayersCard/PlayerListItem";
import { GameContext } from "components/shared";

const PlayersCard: SFC = ({ style }) => {
  const { gameMaster } = useContext(GameContext);
  const players = gameMaster?.game.players;
  const currentPlayerName = gameMaster?.game.getCurrentPlayerName();

  if (!players || !players.length || !gameMaster.isOnline()) return null;

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

const StyledCard = styled(Block)`
  padding-bottom: 8px;
  padding-left: 0;
  padding-right: 0;
`;

export { PlayersCard };
