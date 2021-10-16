import React, { useContext } from "react";
import { Colors, SFC } from "primitives";
import { Block } from "ui/Containers/Block";
import { futureVariants as allVariants, formats } from "game";
import { boardVariants } from "game/boards";
import { LabelWithDetails, Row } from "ui";
import { View } from "react-native";
import { Text } from "primitives";
import { WASD } from "./ActiveKeycaps";
import { GameContext } from "components/shared";
import { GameVariantLabels } from "components/shared/Labels";

const VariantInfoCard: SFC = ({ style }) => {
  const { gameMaster } = useContext(GameContext);
  if (!gameMaster) return null;
  const format = formats[gameMaster.getFormatName()];
  const variants = gameMaster.getVariantNames().map((name) => allVariants[name]);
  const title =
    gameMaster.getFormatName() === "variantComposition"
      ? [
          ...variants
            .map((v) => v.title)
            .sort((v1, _v2) => (v1 in boardVariants ? 1 : 0)),
          "Chess",
        ].join(" ")
      : format.title;

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
        <GameVariantLabels gameMaster={gameMaster} marginTop={4} />
      </View>
    </Block>
  );
};
export { VariantInfoCard };
