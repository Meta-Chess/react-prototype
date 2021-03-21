import React from "react";
import { SFC, Text, Colors } from "primitives";
import { AdviceLevel, FutureVariantName, GameOptions } from "game";
import { CollapsableCard } from "ui";

interface Props {
  variantConflicts: { message: string; level: AdviceLevel }[];
  selectedVariants: FutureVariantName[];
  gameOptions: GameOptions;
}

const TEXT_COLORS = {
  NEUTRAL: Colors.TEXT.LIGHT,
  SUCCESS: Colors.SUCCESS,
  WARNING: Colors.WARNING,
  ERROR: Colors.ERROR,
};

export const AdviceCard: SFC<Props> = ({ variantConflicts, style }) => {
  const advice: { message: string; level: AdviceLevel }[] = [...variantConflicts];
  return (
    <CollapsableCard title={"Advice"} style={style}>
      {advice.map((point, index) => (
        <Text
          cat="BodyXS"
          color={TEXT_COLORS[point.level].toString()}
          style={{ margin: 4 }}
          key={index}
        >
          {point.message}
        </Text>
      ))}
    </CollapsableCard>
  );
};
