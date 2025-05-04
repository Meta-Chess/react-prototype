import React from "react";
import { SFC } from "primitives";
import { Button, Card, Divider } from "ui";
import { Screens, useNavigation } from "navigation";
import { calculateGameOptions } from "game";

export const PlayNow: SFC = ({ style }) => {
  const navigation = useNavigation();

  const handleCreateLocalGame = (): void => {
    const gameOptions = calculateGameOptions(
      { checkEnabled: false, time: undefined, online: false, flipBoard: false },
      ["nimbus"]
    );
    navigation.navigate(Screens.GameScreen, { gameOptions });
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
