import React from "react";
import { TouchableOpacity, View } from "react-native";
import { SFC, Text, Colors, DISCORD_URL, openURL } from "primitives";
import { Card, Divider } from "ui";
import { DiscordWithTextIcon, KickstarterTextIcon } from "primitives/icons";
import styled from "styled-components/native";

const KICKSTARTER_AFFILIATE_URL =
  "https://www.kickstarter.com/projects/neuralforge/1096080664?ref=c3085j";

export const Links: SFC = ({ style }) => {
  return (
    <Card style={style} title={"Links"}>
      <Divider style={{ padding: 0 }} />
      <View>
        <LinkContainer onPress={(): void => openURL(DISCORD_URL)}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DiscordWithTextIcon size={300} />
          </View>

          <Text
            cat="BodyXS"
            color={Colors.TEXT.LIGHT_SECONDARY.toString()}
            alignment="center"
          >
            Looking for opponents? Try the mchess Discord
          </Text>
        </LinkContainer>
        <Divider style={{ padding: 0 }} />

        <LinkContainer onPress={(): void => openURL(KICKSTARTER_AFFILIATE_URL)}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <KickstarterTextIcon size={300} />
          </View>

          <Text
            cat="BodyXS"
            color={Colors.TEXT.LIGHT_SECONDARY.toString()}
            alignment="center"
          >
            Campaign for the Nimbus board game starting soon!
          </Text>
        </LinkContainer>
      </View>
    </Card>
  );
};

const LinkContainer = styled(TouchableOpacity)`
  height: 88px;
  background-color: ${Colors.DARKER.toString()};
  padding: 4px;
  margin: 4px;
`;
