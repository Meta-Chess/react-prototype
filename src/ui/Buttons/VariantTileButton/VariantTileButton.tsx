import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { SFC, Text, Colors } from "primitives";
import { futureVariantDetails } from "game";
import { TileBody } from "./TileBody";
import { TileImage } from "./TileImage";

interface Props {
  variant: futureVariantDetails;
  selected: boolean;
  clash: boolean;
  onPress: () => void;
}

export const VariantTileButton: SFC<Props> = ({
  style,
  variant,
  selected,
  clash,
  onPress,
}) => {
  const selectColor: string = clash ? Colors.ERROR.toString() : Colors.SUCCESS.toString();
  const Container = styled(View)`
    color: black;
    margin: 4px;
    background: ${selected ? selectColor : Colors.DARKISH.toString()};
    border-radius: 4px;
    width: 300px;
    height: 166px;
    flex-direction: row;
    overflow: hidden;
  `;

  return (
    <Container style={style}>
      <TouchableOpacity
        style={{ flex: 1, flexDirection: "column" }}
        onPress={onPress}
        accessibilityRole={"button"}
      >
        <Text
          cat="DisplayXS"
          weight="heavy"
          style={{
            marginHorizontal: 8,
            paddingVertical: 4,
            height: 30,
            textAlign: "center",
          }}
          color={Colors.TEXT.LIGHT.toString()}
          numberOfLines={1}
        >
          {variant.title}
        </Text>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <TileBody variant={variant} />
          <TileImage variant={variant} />
        </View>
      </TouchableOpacity>
      {!variant.implemented && (
        <View
          style={{
            width: 300,
            height: 166,
            position: "absolute",
            backgroundColor: Colors.BLACK.fade(0.25).toString(),
          }}
        />
      )}
    </Container>
  );
};
