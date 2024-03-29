import React, { useContext } from "react";
import { Colors, SFC } from "primitives";
import { Block } from "ui/Containers/Block";
import { futureVariants as allVariants, formats } from "game";
import { LabelWithDetails, Row } from "ui";
import { View } from "react-native";
import { Text } from "primitives";
import { WASD } from "./VisualEffectButtons";
import { VariantLabel, NoCheckLabel, ChessLabel } from "components/shared/Labels";
import { VariantLabelInfo } from "game/types";
import Color from "color";
import { GameContext } from "components/shared";

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
    <Block style={style}>
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
          style={{ marginRight: 4, marginTop: 4 }}
        />
        {!noCheck && variants.length === 0 && (
          <ChessLabel style={{ marginRight: 4, marginTop: 4 }} />
        )}
        {noCheck && <NoCheckLabel style={{ marginRight: 4, marginTop: 4 }} />}
        {variants.map((variant, index) => (
          <VariantLabel
            key={variant.title}
            variant={variant}
            ruleNamesWithParams={gameMaster.gameOptions.ruleNamesWithParams}
            color={VARIANT_LABEL_COLORS[gameMaster.formatVariantLabelColors[index]]}
            style={{ marginRight: 4, marginTop: 4 }}
          />
        ))}
      </View>
    </Block>
  );
};
export { VariantInfoCard };
