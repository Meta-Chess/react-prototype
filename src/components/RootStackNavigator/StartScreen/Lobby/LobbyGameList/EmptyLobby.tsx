import React, { FC } from "react";
import { View, Linking, Platform, TouchableOpacity } from "react-native";
import { Colors, Text } from "primitives";
import { DiscordWithTextIcon } from "primitives/icons";
import { DISCORD_URL } from "primitives";

export const EmptyLobby: FC = () => {
  return (
    <>
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: 16,
        }}
      >
        <Text
          cat={"BodyXS"}
          color={Colors.TEXT.LIGHT_SECONDARY.toString()}
          alignment={"center"}
        >
          {"No public games are currently available"}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={(): void => {
          if (Platform.OS == "web") window.open(DISCORD_URL, "_blank");
          else Linking.openURL(DISCORD_URL);
        }}
      >
        <View style={{ height: 80 }}>
          <DiscordWithTextIcon size={240} />
        </View>
        <Text
          style={{ marginBottom: 16 }}
          cat={"BodyXS"}
          color={"#7289DA"}
          alignment={"center"}
        >
          {"There are players in the discord community\nClick to join!"}
        </Text>
      </TouchableOpacity>
    </>
  );
};
