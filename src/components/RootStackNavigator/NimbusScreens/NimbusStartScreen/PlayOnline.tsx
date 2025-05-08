import React, { useState } from "react";
import { View } from "react-native";
import { SFC } from "primitives";
import { ButtonLight, ButtonSecondaryLight, Card, Divider, TextInput } from "ui";
import { Screens, useNavigation } from "navigation";
import { calculateGameOptions, defaultGameOptions } from "game";

export const PlayOnline: SFC = ({ style }) => {
  const navigation = useNavigation();
  const [roomId, setRoomId] = useState("");

  const handleCreateGame = (): void => {
    const onlineNimbusGameOptions = {
      ...defaultGameOptions,
      ...{
        checkEnabled: false,
        time: 1200000,
        online: true,
        flipBoard: false,
        publicGame: false,
      },
    };
    const gameOptions = calculateGameOptions(onlineNimbusGameOptions, ["nimbus"]);
    navigation.navigate(Screens.NimbusGameScreen, {
      gameOptions,
    });
  };

  return (
    <Card style={style} title={"Play online with friends"}>
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
            navigation.navigate(Screens.NimbusGameScreen, { roomId });
          }}
        />
        <ButtonLight
          label={"Create Game"}
          style={{ flex: 3, marginLeft: 8 }}
          onPress={handleCreateGame}
        />
      </Divider>
    </Card>
  );
};
