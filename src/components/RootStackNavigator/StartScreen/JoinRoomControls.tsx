import React, { useState } from "react";
import { Screens, useNavigation } from "navigation";
import { Button } from "ui";
import { SFC } from "primitives";
import { GameOptions } from "game/types";
import { TextInput } from "ui";
import { View } from "react-native";

interface Props {
  gameOptions: GameOptions;
}
const JoinRoomControls: SFC<Props> = ({ gameOptions, style }) => {
  const navigation = useNavigation();
  const [roomId, setRoomId] = useState<string | undefined>();
  const onPress = (): void => {
    navigation.navigate<Screens.GameScreen>(Screens.GameScreen, {
      gameOptions: {
        ...gameOptions,
        roomId,
      },
      gameId: Math.random(),
    });
  };

  return (
    <View style={style}>
      <TextInput
        placeholder={"Please enter a room id"}
        onChangeText={(text: string): void => setRoomId(text)}
      />
      <Button onPress={onPress} text={"Play Online"} style={{ marginTop: 32 }} />
    </View>
  );
};

export { JoinRoomControls };
