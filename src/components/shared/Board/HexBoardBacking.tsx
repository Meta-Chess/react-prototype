import React from "react";
import { SFC } from "primitives";
import { View } from "react-native";

interface HexBoardBackingProps {
  colorString: string;
  padding: number;
  boardWidth: number;
  boardHeight: number;
}

const HexBoardBacking: SFC<HexBoardBackingProps> = ({
  colorString,
  padding,
  boardWidth,
  boardHeight,
}) => {
  const centerWidth = boardWidth;
  const endHalfWidth = boardWidth / 2;
  const centerHeight = boardHeight / 2;
  const endHeight = boardHeight / 4;

  //const box-shadow: 0px 1px 8px ${Colors.BLACK.fade(0.5).string()}
  return (
    <View
      style={{
        flexDirection: "column",
        alignSelf: "center",
        justifyContent: "flex-start",
        position: "absolute",
        marginVertical: -padding / 2,
        marginHorizontal: -padding / 2,
      }}
    >
      <View
        style={{
          alignSelf: "center",
          width: 0,
          height: 0,
          borderLeftWidth: endHalfWidth,
          borderRightWidth: endHalfWidth,
          borderBottomWidth: endHeight,
          borderStyle: "solid",
          backgroundColor: "transparent",
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: colorString,
        }}
      />
      <View
        style={{
          alignSelf: "center",
          width: centerWidth,
          height: centerHeight,
          backgroundColor: colorString,
        }}
      />
      <View
        style={{
          alignSelf: "center",
          width: 0,
          height: 0,
          borderLeftWidth: endHalfWidth,
          borderRightWidth: endHalfWidth,
          borderTopWidth: endHeight,
          borderStyle: "solid",
          backgroundColor: "transparent",
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderTopColor: colorString,
        }}
      />
    </View>
  );
};

export { HexBoardBacking };
