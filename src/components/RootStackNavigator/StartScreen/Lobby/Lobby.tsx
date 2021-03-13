import React from "react";
import { View, ScrollView } from "react-native";
import { AbsoluteView } from "ui";
import { SFC, Colors } from "primitives";
import { range } from "lodash";
import { LobbyRow } from "./LobbyRow";
import styled from "styled-components/native";
import { LobbyGame } from "../useLobbyQuery";

interface Props {
  lobbyGames?: LobbyGame[];
}

export const Lobby: SFC<Props> = ({ lobbyGames, style }) => {
  if (lobbyGames === undefined) return null; //make it a spinner
  return (
    <Container style={style}>
      <ScrollLobbyRows
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEventThrottle={100}
        showsVerticalScrollIndicator={false}
      >
        {range(0, Math.min(20, lobbyGames.length)).map(
          (i) =>
            lobbyGames.length > i && (
              <>
                <LobbyRow lobbyGame={lobbyGames[i]} />
                <RowSeparator />
              </>
            )
        )}
      </ScrollLobbyRows>
      <LobbyOutline pointerEvents={"none"} />
    </Container>
  );
};

const Container = styled(View)`
  height: 40%;
  width: 400px;
  background-color: ${Colors.DARKER.toString()};
`;

const LobbyOutline = styled(AbsoluteView)`
  border-color: ${Colors.DARKISH.toString()};
  border-width: 1px;
  border-radius: 4px;
`;

const RowSeparator = styled(View)`
  border-bottom-color: ${Colors.DARKEST.toString()};
  border-bottom-width: 1;
`;

const ScrollLobbyRows = ScrollView;
