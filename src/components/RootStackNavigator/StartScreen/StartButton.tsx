import React from "react";
import { Screens, useNavigation } from "navigation";
import { Button } from "ui";
import { SFC } from "primitives";
import { GameOptions } from "game/types";

interface Props {
  gameOptions: GameOptions;
}
const StartButton: SFC<Props> = ({ gameOptions, style }) => {
  const navigation = useNavigation();
  const onPress = (): void => {
    navigation.navigate<Screens.GameScreen>(Screens.GameScreen, {
      gameOptions,
      gameId: Math.random(),
    });
  };

  return <Button onPress={onPress} text={"Play Locally"} style={style} />;
};

export { StartButton };
