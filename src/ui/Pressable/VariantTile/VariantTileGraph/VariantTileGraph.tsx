import React, { ComponentProps } from "react";
import { SFC, Colors } from "primitives";
import { View } from "react-native";
import { FutureVariant } from "game";
import { TraitName, traitInfo } from "game/variants/traitInfo";
import { Svg, Line } from "react-native-svg";
import { TraitNode } from "./TraitNode";

type Orientation = "horizontal" | "vertical";
interface VariantTileGraphProps {
  variant: FutureVariant;
  orientation: Orientation;
}

const transformLineProps =
  (orientation: Orientation) =>
  (props: ComponentProps<Line>): ComponentProps<Line> =>
    orientation === "vertical"
      ? props
      : {
          ...props,
          x1: props.y1,
          x2: props.y2,
          y1: props.x1,
          y2: props.x2,
        };

const transformTraitNodeProps =
  (orientation: Orientation) =>
  (props: ComponentProps<typeof TraitNode>): ComponentProps<typeof TraitNode> =>
    orientation === "vertical"
      ? props
      : {
          ...props,
          cx: props.cy,
          cy: props.cx,
        };

const VariantTileGraph: SFC<VariantTileGraphProps> = ({
  variant,
  style,
  orientation = "vertical",
}) => {
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
    <View style={style}>
      <Svg
        style={{ backgroundColor: "none" }}
        viewBox={orientation === "vertical" ? "0 0 1 7" : "0 0 7 1"}
      >
        <Line
          {...transformLineProps(orientation)({
            x1: 0.5,
            x2: 0.5,
            y1: 0.5,
            y2: 2,
            strokeWidth: 0.15,
            stroke: Colors.DARKEST.toString(),
          })}
        />
        <Line
          {...transformLineProps(orientation)({
            x1: 0.5,
            x2: 0.5,
            y1: 2,
            y2: 3.5,
            strokeWidth: 0.15,
            stroke: Colors.DARKEST.toString(),
          })}
        />
        <Line
          {...transformLineProps(orientation)({
            x1: 0.5,
            x2: 0.5,
            y1: 3.5,
            y2: 5,
            strokeWidth: 0.15,
            stroke: Colors.DARKEST.toString(),
          })}
        />
        <>
          {fillColors.map((color, i) => {
            return (
              <TraitNode
                key={i}
                {...transformTraitNodeProps(orientation)({
                  cx: 0.5,
                  cy: 0.5 + i * 1.5,
                  fillColor: color,
                })}
              />
            );
          })}
        </>

        {variant.traits.includes("Restriction") && (
          <>
            <Line
              {...transformLineProps(orientation)({
                x1: 0,
                x2: 1,
                y1: 2 + 0.3 + 0.1 + (variant.traits.includes("Movement") ? 0.1 : 0),
                y2: 2 + 0.3 + 0.1 + (variant.traits.includes("Movement") ? 0.1 : 0),
                strokeWidth: 0.2,
                stroke: Colors.DARKEST.toString(),
              })}
            />
            <Line
              {...transformLineProps(orientation)({
                x1: 0.1,
                x2: 0.9,
                y1: 2 + 0.3 + 0.11 + (variant.traits.includes("Movement") ? 0.1 : 0),
                y2: 2 + 0.3 + 0.11 + (variant.traits.includes("Movement") ? 0.1 : 0),
                strokeWidth: 0.05,
                stroke: Colors.TRAIT.RESTRICTION.toString(),
              })}
            />
          </>
        )}
      </Svg>
    </View>
  );
};

/*
<Circle cx:0.5} cy={0.5} r={0.4} fill={Colors.BLACK.toString()} />
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
