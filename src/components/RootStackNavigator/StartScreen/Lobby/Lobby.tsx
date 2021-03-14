import React from "react";
import { ScrollView } from "react-native";
import { SFC } from "primitives";
import styled from "styled-components/native";
import { LobbyGameList } from "./LobbyGameList";
import { Button, ButtonSecondary, Card, Footer } from "ui";
import { Screens, useNavigation } from "navigation";
import { useLobbyQuery } from "./useLobbyQuery";
import { randomChoice } from "utilities";

export const Lobby: SFC = ({ style }) => {
  const lobbyQueryResult = useLobbyQuery({ pollInterval: 5000 });
  const navigation = useNavigation();

  return (
    <Container style={style} title={"Public Games"} subtitle={"Click to play"}>
      <ScrollLobbyRows
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={100}
      >
        <LobbyGameList lobbyQueryResult={lobbyQueryResult} />
      </ScrollLobbyRows>
      <Footer>
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
      </Footer>
    </Container>
  );
};

const Container = styled(Card)`
  height: 400px;
`;

const ScrollLobbyRows = ScrollView;
