import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import styled from "styled-components/native";
import { SFC, Text, Colors } from "primitives";
import * as VariantImages from "primitives/VariantImage";
import { futureVariantDetails } from "game";
import { TraitLabel } from "ui/Buttons";

interface Props {
  variant: futureVariantDetails;
  selected: boolean;
  onPress: () => void;
}

export const VariantTileButton: SFC<Props> = ({ style, variant, selected, onPress }) => {
  const Container = styled(View)`
    color: black;
    margin: 4px;
    background: ${selected ? Colors.BLACK.toString() : Colors.DARKISH.toString()};
    border-radius: 4px;
    width: 300px;
    height: 166px;
    flex-direction: row;
    overflow: hidden;
  `;
  const currentImage = VariantImages[variant.imageName];

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
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              backgroundColor: Colors.DARK.toString(),
            }}
          >
            <View style={{ marginVertical: 8 }}>
              <Text
                cat="BodyXS"
                color={Colors.TEXT.LIGHT.toString()}
                style={{ marginHorizontal: 12 }}
                numberOfLines={4}
              >
                {variant.shortDescription}
              </Text>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 12,
                  marginVertical: 6,
                }}
              >
                {variant.traitClasses.map((trait: string, index: number) => (
                  <TraitLabel
                    key={index}
                    trait={trait}
                    style={{ marginRight: 8, marginBottom: 4 }}
                  />
                ))}
              </View>
            </View>
          </View>
          <View
            style={{
              width: 136,
              height: 136,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.DARK.toString(),
            }}
          >
            <View
              style={{
                width: 120,
                height: 120,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
                backgroundColor: Colors.DARKER.toString(),
              }}
            >
              <Image
                source={currentImage}
                style={{
                  width: "80%",
                  height: "80%",
                }}
              />
            </View>
          </View>
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
