import React from "react";
import { SFC, Text, Colors } from "primitives";
import { View } from "react-native";
import { FutureVariant } from "game";
import styled from "styled-components/native";
import { TraitName, traitInfo } from "game/variants/traitInfo";
import { LabelWithDetails } from "ui";
import { Svg, Circle, Line } from "react-native-svg";
import { TraitNode } from "./TraitNode";

interface VariantTileGraphProps {
  variant: FutureVariant;
}

const VariantTileGraph: SFC<VariantTileGraphProps> = ({ variant, style }) => {
  const nodeOrder: TraitName[] = [
    "Geometry",
    "Movement",
    "Reaction",
    "Ending",
    "Special",
  ];
  const fillColors = nodeOrder.map((traitName) =>
    variant.traits.includes(traitName) ? traitInfo[traitName].color.toString() : undefined
  );

  return (
    <View style={{ width: 100 }}>
      <Svg style={{ backgroundColor: "none" }} viewBox="0 0 7 1">
        <Line
          x1={0.5}
          x2={2}
          y1={0.5}
          y2={0.5}
          strokeWidth={0.2}
          stroke={Colors.BLACK.toString()}
        />
        <Line
          x1={2}
          x2={3.5}
          y1={0.5}
          y2={0.5}
          strokeWidth={0.2}
          stroke={Colors.BLACK.toString()}
        />
        <Line
          x1={3.5}
          x2={5}
          y1={0.5}
          y2={0.5}
          strokeWidth={0.2}
          stroke={Colors.BLACK.toString()}
        />
        <>
          {fillColors.map((color, i) => {
            return <TraitNode key={i} cx={0.5 + i * 1.5} cy={0.5} fillColor={color} />;
          })}
        </>
        {variant.traits.includes("Restriction") && (
          <Line
            x1={2 + 0.4 + 0.1 + (variant.traits.includes("Movement") ? 0.1 : 0)}
            x2={2 + 0.4 + 0.1 + (variant.traits.includes("Movement") ? 0.1 : 0)}
            y1={0}
            y2={1}
            strokeWidth={0.2}
            stroke={Colors.BLACK.toString()}
          />
        )}
      </Svg>
    </View>
  );
};

/*
<Circle cx={0.5} cy={0.5} r={0.4} fill={Colors.BLACK.toString()} />
        <Circle
          cx={2}
          cy={0.5}
          r={0.4}
          stroke={Colors.BLACK.toString()}
          strokeWidth={0.2}
          fill={Colors.TRAIT.ABILITY.mix(Colors.DARK, 0.2).toString()}
        />
        <Circle cx={3.5} cy={0.5} r={0.4} fill={Colors.BLACK.toString()} />
        <Circle cx={5} cy={0.5} r={0.4} fill={Colors.BLACK.toString()} />
        <Circle cx={6.5} cy={0.5} r={0.4} fill={Colors.BLACK.toString()} />
*/

export { VariantTileGraph };
