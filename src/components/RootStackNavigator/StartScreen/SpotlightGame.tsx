import React from "react";
import { SFC } from "primitives";
import { Button, Card, Footer } from "ui";
import { calculateGameOptions } from "game";
import { rollableVariants } from "game/formats/rollableVariants";
import { Screens, useNavigation } from "navigation";

const SPOTLIGHT_GAME_OPTIONS = calculateGameOptions(
  {
    checkEnabled: true,
    numberOfPlayers: 2,
    format: "rollingVariants",
    time: 300000,
    online: true,
    publicGame: true,
    spotlight: true,
  },
  rollableVariants
);

export const SpotlightGame: SFC = ({ style }) => {
  const navigation = useNavigation();

  return (
    <Card style={style} title={"Spotlight: Rolling Variants"}>
      <Footer>
        <Button
          label={"Play Now!"}
          style={{ flex: 1 }}
          onPress={(): void => {
            navigation.navigate(Screens.GameScreen, {
              gameOptions: SPOTLIGHT_GAME_OPTIONS,
            });
          }}
        />
      </Footer>
    </Card>
  );
};
