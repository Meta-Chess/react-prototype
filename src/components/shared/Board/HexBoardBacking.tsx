import React from "react";
import { SFC } from "primitives";
import { View } from "react-native";

interface HexBoardBackingProps {
  color: string;
  padding: number;
  boardWidth: number;
  boardHeight: number;
}

const HexBoardBacking: SFC<HexBoardBackingProps> = ({
  style,
  color,
  padding,
  boardWidth,
  boardHeight,
}) => {
  const centerWidth = boardWidth;
  const endHalfWidth = boardWidth / 2;
  const centerHeight = boardHeight / 2;
  const endHeight = boardHeight / 4;

  return (
    <View
      style={[
        style,
        {
          flexDirection: "column",
          position: "absolute",
          marginVertical: -padding / 2,
          marginHorizontal: -padding / 2,
        },
      ]}
    >
      <View
        style={{
          borderLeftWidth: endHalfWidth,
          borderRightWidth: endHalfWidth,
          borderBottomWidth: endHeight,
          borderStyle: "solid",
          backgroundColor: "transparent",
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
          borderStyle: "solid",
          backgroundColor: "transparent",
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderTopColor: color,
        }}
      />
    </View>
  );
};

export { HexBoardBacking };
