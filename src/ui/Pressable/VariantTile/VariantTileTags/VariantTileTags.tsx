import React from "react";
import { SFC } from "primitives";
import { View } from "react-native";
import { FutureVariant } from "game";
import { traitOrder } from "game/variants/traitInfo";
import { TraitLabel } from "components/shared/Labels";

const VariantTileTags: SFC<{ variant: FutureVariant }> = ({ variant, style }) => {
  return (
    <View
      style={[
        style,
        {
          width: "100%",
          flexDirection: "row-reverse",
        },
      ]}
    >
      {variant.traits
        .sort((t1, t2) => (traitOrder.indexOf(t1) > traitOrder.indexOf(t2) ? -1 : 1))
        .map((trait, i) => {
          {
            return <TraitLabel key={i} trait={trait} style={{ marginLeft: 6 }} />;
          }
        })}
    </View>
  );
};

export { VariantTileTags };
