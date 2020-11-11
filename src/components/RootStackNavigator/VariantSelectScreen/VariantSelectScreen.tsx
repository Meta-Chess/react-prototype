import React, { FC, useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { Button } from "ui";
import styled from "styled-components/native";
import { Colors } from "primitives";
import { FutureVariantName, futureVariants } from "game/variants";
import { sortStr } from "utilities";
import { TraitClasses } from "game/types";
import { useNavigation, Screens } from "navigation";
import { CardGrid } from "./CardGrid";
import { TraitFilterBar } from "./TraitFilterBar";
import { GameOptions } from "game/types";
import { VariantName } from "game";

const VariantSelectScreen: FC = () => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();

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

  const [selectedVariants, setSelectedVariants] = useState<FutureVariantName[]>([]);
  const gameOptions: GameOptions = {
    variant: "Chess" as VariantName,
    time: undefined,
    checkEnabled: true,
    fatigueEnabled: false,
    atomicEnabled: false,
    flipBoard: false,
    overTheBoard: false,
    online: false,
  };

  return (
    <ScreenContainer>
      <View
        style={{
          justifyContent: "space-between",
          alignContent: "stretch",
          height,
          width,
          flexDirection: "column",
        }}
      >
        <CardGrid
          allVariants={allVariants}
          selectedVariants={selectedVariants}
          setSelectedVariants={setSelectedVariants}
        />
        <View
          style={{
            width,
            flexDirection: "row",
            justifyContent: "center",
            minHeight: 165,
            paddingBottom: 6,
          }}
        >
          <Button
            text="Back"
            cat="DisplayM"
            onPress={(): void => {
              navigation.goBack();
            }}
            style={{
              alignSelf: "center",
              flex: 1,
              marginRight: 64,
              maxWidth: 200,
            }}
          />
          <TraitFilterBar
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />
          <Button
            text="Start Game"
            cat="DisplayM"
            onPress={(): void => {
              navigation.navigate<Screens.GameScreen>(Screens.GameScreen, {
                gameOptions,
              });
            }}
            style={{
              alignSelf: "center",
              flex: 1,
              marginLeft: 64,
              maxWidth: 200,
            }}
          />
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
