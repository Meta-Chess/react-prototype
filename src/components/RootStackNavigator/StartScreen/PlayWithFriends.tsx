import React, { useState } from "react";
import { View } from "react-native";
import { SFC } from "primitives";
import { ButtonSecondaryLight, Card, Divider, TextInput } from "ui";
import { Screens, useNavigation } from "navigation";
import { ButtonLight } from "ui/Buttons/ButtonLight";

export const PlayWithFriends: SFC = ({ style }) => {
  const navigation = useNavigation();
  const [roomId, setRoomId] = useState("");

  // TODO: "room not found" if room not found
  return (
    <Card style={style} title={"Play with friends!"}>
      <Divider style={{ alignItems: "flex-end" }}>
        <View style={{ flex: 2 }}>
          <TextInput
            value={roomId}
            onChangeText={(value): void => setRoomId(value.toUpperCase())}
            style={{ marginTop: 2 }}
            placeholder={"Room"}
          />
        </View>
        <ButtonSecondaryLight
          label={"Join Game"}
          style={{ flex: 3, marginLeft: 8 }}
          disabled={roomId.length < 3}
          onPress={(): void => {
            navigation.navigate(Screens.GameScreen, { roomId });
          }}
        />
        <ButtonLight
          label={"Create Game"}
          style={{ flex: 3, marginLeft: 8 }}
          onPress={(): void => {
            navigation.navigate(Screens.VariantSelectScreen, { playWithFriends: true });
          }}
        />
      </Divider>
    </Card>
  );
};
