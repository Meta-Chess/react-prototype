import React, { FC } from "react";
import { Screens, useNavigation } from "navigation";
import { Button } from "ui";

const StartButton: FC = () => {
  const navigation = useNavigation();
  const onPress = (): void => {
    navigation.navigate<Screens.GameScreen>(Screens.GameScreen, {
      gameType: "Some interesting game type or something",
    });
  };

  return <Button onPress={onPress} text={"m-Chess"} />;
};

export { StartButton };
