import React, { useState } from "react";
import { View } from "react-native";
import { SFC } from "primitives";
import { ButtonLight, ButtonSecondaryLight, Card, Divider, TextInput } from "ui";
import { Screens, useNavigation } from "navigation";
import { calculateGameOptions } from "game";

export const PlayOnline: SFC = ({ style }) => {
  const navigation = useNavigation();
  const [roomId, setRoomId] = useState("");

  const handleCreateGame = (): void => {
    const gameOptions = calculateGameOptions(
      {
        checkEnabled: false,
        time: 1200000,
        online: true,
        flipBoard: false,
        publicGame: false,
      },
      ["nimbus"]
    );
    navigation.navigate(Screens.GameScreen, { gameOptions });
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
            navigation.navigate(Screens.GameScreen, { roomId });
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
