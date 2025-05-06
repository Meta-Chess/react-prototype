import React from "react";
import { SFC } from "primitives";
import { Button, Card, Divider } from "ui";
import { Screens, useNavigation } from "navigation";
import { defaultNimbusGameOptions } from "../NimbusGameScreen";

export const PlayNow: SFC = ({ style }) => {
  const navigation = useNavigation();

  const handleCreateLocalGame = (): void => {
    navigation.navigate(Screens.NimbusGameScreen, {
      gameOptions: defaultNimbusGameOptions,
    });
  };

  return (
    <Card style={style} title={"Play now!"}>
      <Divider style={{ alignItems: "flex-end" }}>
        <Button
          label={"Create Local Game"}
          style={{ flex: 1 }}
          onPress={handleCreateLocalGame}
        />
      </Divider>
    </Card>
  );
};
