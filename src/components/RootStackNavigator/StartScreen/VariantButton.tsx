import React from "react";
import { Screens, useNavigation } from "navigation";
import { Button } from "ui";
import { SFC } from "primitives";
import { GameOptions } from "game/types";

interface Props {
  gameOptions: GameOptions;
}
const VariantButton: SFC<Props> = ({ gameOptions, style }) => {
  const navigation = useNavigation();
  const onPress = (): void => {
    navigation.navigate<Screens.VariantSelectScreen>(Screens.VariantSelectScreen, {
      gameOptions,
    });
  };

  return <Button onPress={onPress} text={"M"} style={style} />;
};

export { VariantButton };
