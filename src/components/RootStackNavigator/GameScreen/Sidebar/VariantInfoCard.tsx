import React, { FC, useContext } from "react";
import { Text } from "primitives";
import { Card } from "ui/Card";
import { GameContext, variants } from "game";

const VariantInfoCard: FC = () => {
  const { gameMaster } = useContext(GameContext);
  if (!gameMaster) return null;

  // Later: This should maybe be a more complicated way of calculating a name
  // for the current combination of rules and combining descriptions?
  // Or maybe just a list?
  const variantName = gameMaster.variant;
  const variantDescription = variants[variantName].description;

  return (
    <Card>
      <Text cat="DisplayL">{variantName}</Text>
      <Text cat="BodyL" style={{ marginTop: 8 }}>
        {variantDescription}
      </Text>
    </Card>
  );
};
export { VariantInfoCard };
