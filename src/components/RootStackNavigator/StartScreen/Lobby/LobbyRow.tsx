import React, { useMemo } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { AbsoluteView, LabelWithDetails, Row, TextIcon } from "ui";
import { NoTimerIcon, PlayerIcon, TimerIcon } from "primitives/icons";
import { Colors, SFC, Text, useHover } from "primitives";
import { formats, FutureVariant, futureVariants as allVariants } from "game";
import { FormatIcon } from "components/shared";
import styled from "styled-components/native";
import { LobbyGame } from "./useLobbyQuery";
import { Screens, useNavigation } from "navigation";
import { shuffleInPlace } from "utilities/random";
import { GameVariantLabels } from "components/shared/Labels";

interface Props {
  lobbyGame: LobbyGame;
}

export const LobbyRow: SFC<Props> = ({ lobbyGame }) => {
  const navigation = useNavigation();
  const [hoverRef, hovered] = useHover();
  const formatName = lobbyGame.gameOptions.format;
  const format = formats[formatName];
  const deck = lobbyGame.gameOptions.deck;
  const baseVariants = lobbyGame.gameOptions.baseVariants;
  const variants: FutureVariant[] = useMemo((): FutureVariant[] => {
    const v = (formatName === "variantComposition" ? baseVariants : deck || []).map(
      (variantName) => allVariants[variantName]
    );
    if (formatName === "rollingVariants") shuffleInPlace(v);
    return v;
  }, []);
  const time = lobbyGame.gameOptions.time;
  const players = lobbyGame.gameOptions.players?.length;

  if (players === undefined || variants === undefined) return null;

  return (
    <Container
      ref={hoverRef}
      onPress={(): void => {
        navigation.navigate(Screens.GameScreen, {
          gameOptions: lobbyGame.gameOptions,
          roomId: lobbyGame.roomId,
        });
      }}
    >
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
          <GameVariantLabels givenGameOptions={lobbyGame.gameOptions} marginTop={0} />
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
  margin-right: 2px;
`;

const InfoContainer = styled(Row)`
  align-items: center;
`;

const LobbyRowCover = styled(AbsoluteView)`
  background-color: ${Colors.BLACK.fade(0.8).toString()};
`;

const ScrollLabelRow = ScrollView;
