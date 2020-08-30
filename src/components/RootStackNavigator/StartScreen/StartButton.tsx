import React from "react";
import { Screens, useNavigation } from "navigation";
import { Button } from "ui";
import { VariantName } from "game";
import { SFC } from "primitives";

interface Props {
  variant: VariantName;
}
const StartButton: SFC<Props> = ({ variant, style }) => {
  const navigation = useNavigation();
  const onPress = (): void => {
    navigation.navigate<Screens.GameScreen>(Screens.GameScreen, {
      variant,
      gameId: Math.random(),
    });
  };

  return <Button onPress={onPress} text={"Play"} style={style} />;
};

export { StartButton };
