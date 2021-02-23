import React from "react";
import { SFC } from "primitives";
import { View, ViewStyle, StyleProp } from "react-native";
import { BoardMeasurements } from "components/shared";
import styled from "styled-components/native";
import { AbsoluteView } from "ui";

interface HexBackboardProps {
  color: string;
  measurements: BoardMeasurements;
  shadow?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const HexBackboard: SFC<HexBackboardProps> = ({
  color,
  measurements,
  shadow = false,
  children,
  containerStyle,
}) => {
  const extra = shadow ? 20 : 16;
  const centerWidth = measurements.width + extra;
  const endHalfWidth = (measurements.width + extra) / 2;
  const centerHeight = (measurements.height + extra) / 2;
  const endHeight = (measurements.height + extra) / 4;

  return (
    <View style={{ flexDirection: "column", padding: shadow ? -extra / 2 : 0 }}>
      <View
        style={{
          borderLeftWidth: endHalfWidth,
          borderRightWidth: endHalfWidth,
          borderBottomWidth: endHeight,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: color,
        }}
      />
      <View
        style={{
          width: centerWidth,
          height: centerHeight,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          borderLeftWidth: endHalfWidth,
          borderRightWidth: endHalfWidth,
          borderTopWidth: endHeight,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderTopColor: color,
        }}
      />
      <AbsoluteChildrenContainer style={containerStyle}>
        {children}
      </AbsoluteChildrenContainer>
    </View>
  );
};

const AbsoluteChildrenContainer = styled(AbsoluteView)`
  justify-content: center;
  align-items: center;
`;

export { HexBackboard };
