import React, { FC } from "react";
import { Text } from "primitives";
import { Card } from "ui/Containers/Card";
import { VariantName, variants } from "game";

interface Props {
  variant?: VariantName;
}

const VariantInfoCard: FC<Props> = ({ variant }) => {
  if (!variant) return null;

  // Later: This should maybe be a more complicated way of calculating a name
  // for the current combination of rules and combining descriptions?
  // Or maybe just a list?
  const variantDescription = variants[variant].description;

  return (
    <Card>
      <Text cat="DisplayL">{variant}</Text>
      <Text cat="BodyL" style={{ marginTop: 8 }}>
        {variantDescription}
      </Text>
    </Card>
  );
};
export { VariantInfoCard };
