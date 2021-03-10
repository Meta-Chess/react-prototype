import React, { useContext } from "react";
import { Colors, SFC } from "primitives";
import { Card } from "ui/Containers/Card";
import { GameContext, futureVariants as allVariants, formats } from "game";
import { LabelWithDetails, Row } from "ui";
import { View } from "react-native";
import { Text } from "primitives";
import { WASD } from "./ActiveKeycaps";
import { VariantLabelInfo } from "game/types";
import Color from "color";

const VARIANT_LABEL_COLORS: { [key in VariantLabelInfo]: Color } = {
  [VariantLabelInfo.VariantLeaving]: Colors.HIGHLIGHT.ERROR,
  [VariantLabelInfo.NewVariant]: Colors.HIGHLIGHT.SUCCESS,
};

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
      <Row style={{ justifyContent: "space-between" }}>
        <Text cat="DisplayM">{title}</Text>
        <WASD style={{ marginLeft: 8, marginTop: 4 }} />
      </Row>
      <View style={{ flexWrap: "wrap", flexDirection: "row", marginTop: 8 }}>
        <LabelWithDetails
          label={format.title}
          details={format.description}
          key={format.title}
          color={Colors.MCHESS_ORANGE}
        />
        {variants.map((variant, index) => (
          <LabelWithDetails
            label={variant.title}
            details={variant.shortDescription}
            key={variant.title}
            color={VARIANT_LABEL_COLORS[gameMaster.formatVariantLabelColors[index]]}
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
