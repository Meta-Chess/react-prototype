import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { Colors, DISCORD_URL, Text, openURL } from "primitives";
import { DiscordWithTextIcon } from "primitives/icons";

export const JoinDiscordButton: FC<{ buttonText: string }> = ({ buttonText }) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={(): void => openURL(DISCORD_URL)}
    >
      <View style={{ height: 80 }}>
        <DiscordWithTextIcon size={240} />
      </View>
      <Text
        style={{ marginBottom: 16 }}
        cat={"BodyXS"}
        color={Colors.TEXT.LIGHT_SECONDARY.toString()}
        alignment={"center"}
      >
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};
