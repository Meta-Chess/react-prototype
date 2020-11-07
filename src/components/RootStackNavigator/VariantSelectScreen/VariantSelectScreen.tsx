import React, { FC, useState } from "react";
import { View, useWindowDimensions, ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Colors, MChessLogo, SFC, Text } from "primitives";
import { VariantTile } from "./VariantTile";
//import { VerticalSeparatorLong } from "ui/Separators";
import { defaultGameOptions, GameOptionControls } from "./GameOptionControls";
import { GameOptions } from "game/types";
import { FutureVariantName, futureVariants } from "game/variants";
import { isPresent } from "utilities";
import { traitColors } from "game";

const VariantSelectScreen: FC = () => {
  const padding = 12;

  const { height, width } = useWindowDimensions();
  const portrait = height > width;

  const [gameOptions, setGameOptions] = useState<GameOptions>(defaultGameOptions);

  const allVariants: FutureVariantName[] = Object.values(
    FutureVariantName
  ) as FutureVariantName[];

  interface TraitLabelProps {
    trait: string;
  }

  const TraitLabel: SFC<TraitLabelProps> = ({ trait, style }) => {
    const color = traitColors[trait as keyof typeof traitColors].toString();
    return (
      <TouchableOpacity
        style={[
          style,
          {
            backgroundColor: color,
            borderRadius: 12,
            width: 24,
            height: 24,
          },
        ]}
      ></TouchableOpacity>
    );
  };

  const [selectedVariants, setSelectedVariants] = useState<FutureVariantName[]>([]); //VariantNames[]
  return portrait ? (
    <ScreenContainer style={{ padding }}>
      <Text>{"Portrait Templating Todo"}</Text>
    </ScreenContainer>
  ) : (
    <ScreenContainer>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          alignSelf: "center",
          height,
          width,
          flexDirection: "column",
        }}
      >
        <View
          style={{
            height: padding * 2 + 166 * 3,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            marginTop: 12,
            marginHorizontal: 12,
          }}
        >
          <ScrollView
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "row",
                flexWrap: "wrap",
                alignContent: "flex-start",
                marginVertical: -1,
              }}
            >
              {allVariants
                .filter((ekey) => isPresent(futureVariants[ekey]))
                .map((ekey) => {
                  return (
                    <VariantTile
                      key={ekey}
                      text={ekey}
                      onPress={(): void =>
                        setSelectedVariants([...selectedVariants, ekey])
                      }
                      style={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        alignContent: "flex-start",
                      }}
                    />
                  );
                })}
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            height: 48,
            marginVertical: 24,
            backgroundColor: Colors.DARKER.toString(),
            justifyContent: "flex-start",
            alignSelf: "center",
            borderRadius: 6,
            shadowColor: Colors.BLACK.toString(),
            shadowRadius: 4,
            shadowOffset: {
              width: 0,
              height: 2,
            },
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 12,
              marginVertical: 12,
            }}
          >
            {[
              "piece",
              "restriction",
              "ability",
              "game end",
              "interaction",
              "geometry",
              "world",
              "algorithm",
            ].map((trait: string, index: number) => (
              <TraitLabel key={index} trait={trait} style={{ marginHorizontal: 12 }} />
            ))}
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

const ScreenContainer = styled(View)`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  background-color: ${Colors.DARKEST.string()};
`;

export { VariantSelectScreen };
