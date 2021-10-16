import React, { ComponentProps } from "react";
import { SFC, Colors } from "primitives";
import { View } from "react-native";
import { FutureVariant } from "game";
import { traitGraphOrder, traitInfo } from "game/variants/traitInfo";
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
  const fillColors = traitGraphOrder.map((traitNames) =>
    traitNames.map((traitName) =>
      variant.traits.includes(traitName)
        ? traitInfo[traitName].color.toString()
        : undefined
    )
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
          {fillColors.map((colorList, i) => {
            return (
              <TraitNode
                key={i}
                {...transformTraitNodeProps(orientation)({
                  order: i,
                  cx: 0.5,
                  cy: 0.5 + i * 1.5,
                  fillColor: colorList[0] ?? colorList[1],
                  secondFillColor: colorList[0] ? colorList[1] : undefined,
                })}
              />
            );
          })}
        </>
      </Svg>
    </View>
  );
};

export { VariantTileGraph };
