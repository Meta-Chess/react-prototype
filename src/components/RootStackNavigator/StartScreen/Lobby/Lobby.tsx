import React from "react";
import { ScrollView } from "react-native";
import { SFC } from "primitives";
import styled from "styled-components/native";
import { LobbyGameList } from "./LobbyGameList";
import { Button, ButtonSecondary, Card, Divider } from "ui";
import { Screens, useNavigation } from "navigation";
import { useLobbyQuery } from "./useLobbyQuery";
import { randomChoice } from "utilities";

export const Lobby: SFC = ({ style }) => {
  const lobbyQueryResult = useLobbyQuery({ pollInterval: 5000 });
  const navigation = useNavigation();

  return (
    <Container
      style={style}
      title={"Public Games"}
      subtitle={
        !lobbyQueryResult.data
          ? "Connecting to games"
          : !lobbyQueryResult.data.length
          ? "No public games are currently available"
          : "Click to play"
      }
    >
      <ScrollLobbyRows
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <LobbyGameList lobbyQueryResult={lobbyQueryResult} />
      </ScrollLobbyRows>
      <Divider>
        <ButtonSecondary
          label={"Join Random"}
          onPress={(): void =>
            navigation.navigate(Screens.GameScreen, {
              roomId: randomChoice(lobbyQueryResult.data || []).roomId,
            })
          }
          // disabled={!lobbyQueryResult.data}
          style={{ flex: 1 }}
        />
        <Button
          label={"Create Game"}
          onPress={(): void =>
            navigation.navigate(Screens.VariantSelectScreen, { playWithFriends: false })
          }
          style={{ flex: 1, marginLeft: 8 }}
        />
      </Divider>
    </Container>
  );
};

const Container = styled(Card)`
  height: 400px;
`;

const ScrollLobbyRows = ScrollView;
