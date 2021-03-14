import React, { FC } from "react";
import { View, Image } from "react-native";
import { Spinner } from "ui";
import { Colors, ErrorScreen, Text } from "primitives";
import { LobbyRow } from "./LobbyRow";
import styled from "styled-components/native";
import { LobbyQueryResult } from "./useLobbyQuery";

interface Props {
  lobbyQueryResult: LobbyQueryResult;
}

export const LobbyGameList: FC<Props> = ({ lobbyQueryResult }) => {
  const { data: lobbyGames, error } = lobbyQueryResult;

  if (error && !lobbyGames)
    return (
      <>
        <Image source={ErrorScreen} style={{ width: 100, height: 100 }} />
        <Text
          cat={"BodyXS"}
          color={Colors.TEXT.LIGHT_SECONDARY.toString()}
          alignment={"center"}
          style={{ marginTop: 12 }}
        >
          {"Error loading lobby games\nThis will reload automatically"}
        </Text>
      </>
    );

  if (!lobbyGames) return <Spinner />;

  if (!lobbyGames.length)
    return (
      <Text
        cat={"BodyXS"}
        color={Colors.TEXT.LIGHT_SECONDARY.toString()}
        alignment={"center"}
        style={{ marginTop: 12 }}
      >
        {"No games currently on offer\nCreate one for someone else to join!"}
      </Text>
    );

  return (
    <View style={{ width: "100%", height: "100%" }}>
      {lobbyGames.map((lobbyGame) => (
        <View key={lobbyGame.roomId}>
          <LobbyRow lobbyGame={lobbyGame} />
          <RowSeparator />
        </View>
      ))}
    </View>
  );
};

const RowSeparator = styled(View)`
  border-bottom-color: ${Colors.DARKEST.toString()};
  border-bottom-width: 1px;
`;
