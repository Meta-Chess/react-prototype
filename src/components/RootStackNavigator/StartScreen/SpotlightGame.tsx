import React from "react";
import { SFC } from "primitives";
import { Button, Card, Footer } from "ui";
import { calculateGameOptions, GameOptions } from "game";
import { rollableVariants } from "game/formats/rollableVariants";
import { Screens, useNavigation } from "navigation";

const calculateSpotLightGameOptions = (): GameOptions =>
  calculateGameOptions(
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
              gameOptions: calculateSpotLightGameOptions(),
            });
          }}
        />
      </Footer>
    </Card>
  );
};
