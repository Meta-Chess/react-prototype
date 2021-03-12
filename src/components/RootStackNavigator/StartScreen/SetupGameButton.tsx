import React from "react";
import { Screens, useNavigation } from "navigation";
import { ButtonSecondary } from "ui";
import { SFC } from "primitives";

export const SetupGameButton: SFC = ({ style }) => {
  const navigation = useNavigation();
  const onPress = (): void => {
    navigation.navigate(Screens.VariantSelectScreen);
  };

  return <ButtonSecondary onPress={onPress} label={"Advanced"} style={style} />;
};
