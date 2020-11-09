import React, { FC, useState } from "react";
import { View, useWindowDimensions, ScrollView } from "react-native";
import { Button } from "ui";
import styled from "styled-components/native";
import { Colors, Text } from "primitives";
import { VariantTile } from "./VariantTile";
import { defaultGameOptions } from "./GameOptionControls";
import { GameOptions } from "game/types";
import { FutureVariantName, futureVariants } from "game/variants";
import { isPresent, sortStr } from "utilities";
import { traitColors, TraitClasses } from "game";
import { TraitFilter } from "./TraitFilter";
import { useNavigation, Screens } from "navigation";

const VariantSelectScreen: FC = () => {
  const padding = 12;

  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const portrait = height > width;

  const [activeFilters, setActiveFilters] = useState<TraitClasses[]>([]);

  const allVariants: FutureVariantName[] = Object.keys(futureVariants)
    .filter((key) => futureVariants[key].implemented === true)
    .sort((n1, n2) => sortStr(n1, n2))
    .concat(
      Object.keys(futureVariants)
        .filter((key) => futureVariants[key].implemented !== true)
        .sort((n1, n2) => sortStr(n1, n2))
    )
    .filter(
      (key) =>
        activeFilters.length === 0 ||
        futureVariants[key].traitClasses.some((x: string) =>
          activeFilters.some((y) => y === x)
        )
    );

  const [gameOptions, setGameOptions] = useState<GameOptions>(defaultGameOptions);
  const [selectedVariants, setSelectedVariants] = useState<FutureVariantName[]>([]);

  return portrait ? ( // currently have not done any templating for portrait
    <ScreenContainer style={{ padding }}>
      <Text>{"Portrait Templating Todo"}</Text>
      <Button
        text={"setGameOptions"}
        onPress={(): void => setGameOptions(defaultGameOptions)}
      ></Button>
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
                      selected={selectedVariants.some((x) => x === ekey)}
                      onPress={(): void =>
                        selectedVariants.some((x) => x === ekey)
                          ? setSelectedVariants(
                              selectedVariants.filter((x) => x !== ekey)
                            )
                          : setSelectedVariants([...selectedVariants, ekey])
                      }
                      style={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        alignContent: "flex-start",
                        shadowColor: Colors.BLACK.toString(),
                        shadowRadius: 4,
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                      }}
                    />
                  );
                })}
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            width,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            alignContent: "center",
            alignSelf: "center",
          }}
        >
          <View style={{ alignSelf: "center", flex: 1, margin: 32, marginRight: 64 }}>
            <Button
              text="Back"
              cat="DisplayM"
              onPress={(): void => {
                navigation.goBack();
              }}
              style={{ alignSelf: "flex-end", width: 200 }}
            />
          </View>
          <View
            style={{
              height: 48,
              maxWidth: 375,
              minWidth: 375,
              marginVertical: 24,
              backgroundColor: Colors.DARKER.toString(),
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              flexDirection: "row",
              alignSelf: "center",
              flex: 1,
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
              {Object.keys(traitColors).map((trait: string, index: number) => (
                <TraitFilter
                  key={index}
                  trait={trait}
                  style={{ marginHorizontal: 10 }}
                  unselected={!activeFilters.some((filt) => filt === trait)}
                  onPress={(): void =>
                    activeFilters.some((filt) => filt === trait)
                      ? setActiveFilters([])
                      : setActiveFilters([trait as TraitClasses])
                  }
                />
              ))}
            </View>
          </View>
          <View style={{ alignSelf: "center", flex: 1, margin: 32, marginLeft: 64 }}>
            <Button
              text="Start Game"
              cat="DisplayM"
              onPress={(): void => {
                navigation.navigate<Screens.GameScreen>(Screens.GameScreen, {
                  gameOptions,
                });
              }}
              style={{ alignSelf: "flex-start", width: 200 }}
            />
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
