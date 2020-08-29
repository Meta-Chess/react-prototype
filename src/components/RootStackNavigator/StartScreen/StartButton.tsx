import React, { FC } from "react";
import { Screens, useNavigation } from "navigation";
import { Button } from "ui";
import { VariantName } from "game";

interface Props {
  variant: VariantName;
}
const StartButton: FC<Props> = ({ variant }) => {
  const navigation = useNavigation();
  const onPress = (): void => {
    navigation.navigate<Screens.GameScreen>(Screens.GameScreen, { variant });
  };

  return <Button onPress={onPress} text={"m-Chess"} />;
};

export { StartButton };
