import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { AbsoluteView, LabelWithDetails, TextIcon, Row } from "ui";
import { PlayerIcon, TimerIcon, NoTimerIcon } from "primitives/icons";
import { SFC, Colors, Text, useHover } from "primitives";
import { futureVariants as allVariants, formats } from "game";
import { FormatIcon } from "components/shared";
import { NoCheckLabel, ChessLabel } from "components/shared/Labels";
import styled from "styled-components/native";
import { LobbyGame } from "../useLobbyQuery";

interface Props {
  lobbyGame: LobbyGame;
}

export const LobbyRow: SFC<Props> = ({ lobbyGame }) => {
  const [hoverRef, hovered] = useHover();
  const check = lobbyGame.gameOptions.checkEnabled;
  const formatName = lobbyGame.gameOptions.format;
  const format = formats[formatName];
  const deck = lobbyGame.gameOptions.deck;
  const variants =
    deck === undefined
      ? lobbyGame.gameOptions.baseVariants.map((variantName) => allVariants[variantName])
      : deck.map((variantName) => allVariants[variantName]);
  const time = lobbyGame.gameOptions.time;
  const players = lobbyGame.gameOptions.players?.length;
  if (players === undefined || variants === undefined) return null;
  return (
    <Container ref={hoverRef}>
      <FormatIconContainer>
        <FormatIcon format={formatName} size={20} />
      </FormatIconContainer>
      <FlexContainer>
        <TopRow>
          <FlexContainer>
            <LabelWithDetails
              label={format.title}
              details={format.description}
              key={format.title}
              color={Colors.MCHESS_ORANGE}
              style={{ alignSelf: "flex-start" }}
            />
          </FlexContainer>
          <EndContainer>
            <InfoContainer style={{ marginRight: 6 }}>
              {time ? (
                <>
                  <Text cat={"BodyM"}>{time / 60000}</Text>
                  <TextIcon Icon={TimerIcon} />
                </>
              ) : (
                <TextIcon Icon={NoTimerIcon} />
              )}
            </InfoContainer>
            <InfoContainer style={{ marginRight: 2 }}>
              <Text cat={"BodyM"}>{players}</Text>
              <TextIcon Icon={PlayerIcon} />
            </InfoContainer>
          </EndContainer>
        </TopRow>
        <ScrollLabelRow
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingBottom: 8 }}
        >
          {!check && <NoCheckLabel style={{ marginRight: 4 }} />}
          {variants.map((variant) => (
            <LabelWithDetails
              label={variant.title}
              details={variant.shortDescription}
              key={variant.title}
              style={{ marginRight: 4 }}
            />
          ))}
          {check && variants.length === 0 && <ChessLabel />}
        </ScrollLabelRow>
      </FlexContainer>
      {hovered && <LobbyRowCover pointerEvents={"none"} />}
    </Container>
  );
};

const Container = styled(TouchableOpacity)`
  flex-direction: row;
  background-color: ${Colors.DARK.toString()};
  padding: 0px 8px 0px 8px;
`;

const FormatIconContainer = styled(View)`
  justify-content: center;
  padding: 0px 8px 0px 0px;
`;

const FlexContainer = styled(View)`
  flex: 1;
`;

const TopRow = styled(Row)`
  padding: 8px 0px 4px 0px;
`;

const EndContainer = styled(Row)`
  align-self: flex-end;
  align-items: center;
  margin-right: 2;
`;

const InfoContainer = styled(Row)`
  align-items: center;
`;

const LobbyRowCover = styled(AbsoluteView)`
  background-color: ${Colors.BLACK.fade(0.8).toString()};
`;

const ScrollLabelRow = ScrollView;
