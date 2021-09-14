import React, { FC } from "react";
import { View, Linking, Platform, TouchableOpacity } from "react-native";
import { Colors, Text } from "primitives";
import { DiscordWithTextIcon } from "primitives/icons";
import { DISCORD_URL } from "primitives";

export const EmptyLobby: FC = () => {
  return (
    <>
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
          color={Colors.DISCORD.toString()}
          alignment={"center"}
        >
          {"There are players in the discord community\nClick to join!"}
        </Text>
      </TouchableOpacity>
    </>
  );
};
