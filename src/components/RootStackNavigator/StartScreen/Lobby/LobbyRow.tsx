import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { AbsoluteView, LabelWithDetails, TextIcon, Row } from "ui";
import { PlayerIcon, TimerIcon, NoTimerIcon } from "primitives/icons";
import { SFC, Colors, Text, useHover } from "primitives";
import { futureVariants as allVariants, formats } from "game";
import { FutureVariantName } from "game/variants";
import { FormatName } from "game/formats";
import { FormatIcon } from "components/shared";
import { NoCheckLabel } from "components/shared/Labels";
import styled from "styled-components/native";

export interface LobbyRowInfo {
  format: FormatName;
  variants: FutureVariantName[];
  check: boolean;
  time?: number;
  players: number;
}

interface Props {
  lobbyRowInfo: LobbyRowInfo;
}

export const LobbyRow: SFC<Props> = ({ lobbyRowInfo }) => {
  const [hoverRef, hovered] = useHover();
  const format = formats[lobbyRowInfo.format];
  const variants = lobbyRowInfo.variants.map((variantName) => allVariants[variantName]);
  return (
    <Container ref={hoverRef}>
      <FormatIconContainer>
        <FormatIcon format={lobbyRowInfo.format} size={20} />
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
              {lobbyRowInfo.time ? (
                <>
                  <Text cat={"BodyM"}>{lobbyRowInfo.time}</Text>
                  <TextIcon Icon={TimerIcon} />
                </>
              ) : (
                <TextIcon Icon={NoTimerIcon} />
              )}
            </InfoContainer>
            <InfoContainer style={{ marginRight: 2 }}>
              <Text cat={"BodyM"}>{lobbyRowInfo.players}</Text>
              <TextIcon Icon={PlayerIcon} />
            </InfoContainer>
          </EndContainer>
        </TopRow>
        <ScrollLabelRow
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingBottom: 8 }}
        >
          {!lobbyRowInfo.check && <NoCheckLabel style={{ marginRight: 4 }} />}
          {variants.map((variant) => (
            <LabelWithDetails
              label={variant.title}
              details={variant.shortDescription}
              key={variant.title}
              style={{ marginRight: 4 }}
            />
          ))}
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
