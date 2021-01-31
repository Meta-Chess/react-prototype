import React from "react";
import { SFC, Text, Colors } from "primitives";
import { AdviceLevel, futureVariants, FutureVariantName } from "game";
import { CollapsableCard } from "ui";

interface Props {
  variantConflicts: { message: string; level: AdviceLevel }[];
  selectedVariants: FutureVariantName[];
}

const TEXT_COLORS = {
  NEUTRAL: Colors.TEXT.LIGHT,
  SUCCESS: Colors.SUCCESS,
  WARNING: Colors.WARNING,
  ERROR: Colors.ERROR,
};

export const AdviceCard: SFC<Props> = ({ variantConflicts, selectedVariants, style }) => {
  const totalComplexity = selectedVariants.reduce(
    (acc, variant) => acc + futureVariants[variant].complexity,
    0
  );

  // TODO: Maybe all advice should be calculated at a higher level, so we can use it to decide whether to show a warning modal?
  const advice: { message: string; level: AdviceLevel | "NEUTRAL" }[] = [
    ...variantConflicts,
    {
      message:
        totalComplexity === 0
          ? "Press on a card to select a variant"
          : totalComplexity <= 5
          ? "This looks like fun!"
          : totalComplexity <= 8
          ? "This looks a bit complicated!"
          : totalComplexity <= 12
          ? "This looks quite complicated!"
          : totalComplexity <= 18
          ? "This looks like a mind bender"
          : "Careful! This may break your brain a bit",
      level:
        totalComplexity === 0
          ? "NEUTRAL"
          : totalComplexity <= 8
          ? "SUCCESS"
          : totalComplexity <= 18
          ? "WARNING"
          : "ERROR",
    },
  ];
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
