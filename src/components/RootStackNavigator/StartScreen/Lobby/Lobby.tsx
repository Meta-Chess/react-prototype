import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Screens, useNavigation } from "navigation";
import { AbsoluteView, LabelWithDetails, TextIcon, Row } from "ui";
import { PlayerIcon, TimerIcon, NoTimerIcon } from "primitives/icons";
import { SFC, Colors, Text, useHover } from "primitives";
import { range } from "lodash";
import { futureVariants as allVariants, formats } from "game";
import { FutureVariantName } from "game/variants";
import { FormatName } from "game/formats";
import { FormatIcon } from "components/shared";
import { NoCheckLabel } from "components/shared/Labels";
import { LobbyRow, LobbyRowInfo } from "./LobbyRow";
import styled from "styled-components/native";

const Row1: LobbyRowInfo = {
  format: "rollingVariants",
  variants: ["atomic", "crazyhouse", "chemicallyExcitedKnight", "pull"],
  check: true,
  time: 5,
  players: 2,
};

const Row2: LobbyRowInfo = {
  format: "variantComposition",
  variants: ["toroidal", "fatigue", "morphlings"],
  check: false,
  time: 10,
  players: 3,
};

const Row3: LobbyRowInfo = {
  format: "variantComposition",
  variants: ["hex"],
  check: true,
  time: undefined,
  players: 2,
};

const lobbyRowsInfo = [Row1, Row2, Row3];

export const Lobby: SFC = ({ style }) => {
  return (
    <Container style={style}>
      <ScrollLobbyRows
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEventThrottle={100}
        showsVerticalScrollIndicator={false}
      >
        {range(0, lobbyRowsInfo.length).map(
          (i) =>
            lobbyRowsInfo.length > i && (
              <>
                <LobbyRow lobbyRowInfo={lobbyRowsInfo[i]} />
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
  height: 60%;
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
