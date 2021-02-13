import React, { useContext } from "react";
import { Colors, SFC, Text } from "primitives";
import { Card } from "ui/Containers/Card";
import { GameContext, futureVariants as allVariants, formats } from "game";
import { LabelWithDetails } from "ui";
import { View } from "react-native";

const VariantInfoCard: SFC = ({ style }) => {
  const { gameMaster } = useContext(GameContext);
  if (!gameMaster) return null;
  const format = formats[gameMaster.getFormatName()];
  const variants = gameMaster.getVariantNames().map((name) => allVariants[name]);
  const title =
    gameMaster.getFormatName() === "variantComposition"
      ? [...variants.map((v) => v.title), "Chess"].join(" ")
      : format.title;
  const noCheck = !gameMaster.getRuleNames().includes("check");

  return (
    <Card style={style}>
      <Text cat="DisplayM">{title}</Text>
      <View style={{ flexWrap: "wrap", flexDirection: "row", marginTop: 8 }}>
        <LabelWithDetails
          label={format.title}
          details={format.description}
          key={format.title}
          color={Colors.MCHESS_ORANGE}
        />
        {variants.map((variant) => (
          <LabelWithDetails
            label={variant.title}
            details={variant.shortDescription}
            key={variant.title}
          />
        ))}
        {noCheck && (
          <LabelWithDetails
            label={"No Check"}
            details={"Check and Checkmate do not apply to this game!"}
            key={"noCheck"}
            color={Colors.GREY}
          />
        )}
      </View>
    </Card>
  );
};
export { VariantInfoCard };
