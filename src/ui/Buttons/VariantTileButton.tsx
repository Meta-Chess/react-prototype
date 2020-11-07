import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import styled from "styled-components/native";
import { SFC, Text, Colors } from "primitives";
import * as VariantImages from "primitives/VariantImage";
import { traitColors } from "game";
import { variantInterface } from "game";
import { contrast } from "utilities";

interface Props {
  // TODO: get the right type
  variant: variantInterface; // eslint-disable-line @typescript-eslint/no-explicit-any
  onPress: () => void;
}

export const VariantTileButton: SFC<Props> = ({ style, variant, onPress }) => {
  const Container = styled(View)`
    color: black;
    margin: 4px;
    background: ${Colors.DARKISH.toString()};
    border-radius: 4px;
    box-shadow: 0px 2px 4px ${Colors.BLACK.toString()};
    width: 300px;
    height: 166px;
    flex-direction: row;
    overflow: hidden;
  `;
  const currentImage = VariantImages[variant.icon_name];

  return (
    <Container style={style}>
      <View style={{ flex: 1, flexDirection: "column" }}>
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

        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
          }}
          onPress={onPress}
          accessibilityRole={"button"}
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
                {variant.short_description}
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
                {variant.trait_classes.map((trait: string, index: number) => (
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
        </TouchableOpacity>
      </View>
    </Container>
  );
};

// TODO: move this to its own file
interface TraitLabelProps {
  trait: string;
}
const TraitLabel: SFC<TraitLabelProps> = ({ trait, style }) => {
  const color = traitColors[trait as keyof typeof traitColors].toString();
  return (
    <View
      style={[
        style,
        {
          backgroundColor: color,
          borderRadius: 6,
          width: 12,
          height: 12,
        },
      ]}
    >
      <Text cat={"BodyXS"} color={contrast(color)}>
        {}
      </Text>
    </View>
  );
};
