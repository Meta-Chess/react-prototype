import React, { FC, useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { Button } from "ui";
import styled from "styled-components/native";
import { Colors } from "primitives";
import { FutureVariantName } from "game/variants";
import { TraitClasses } from "game/types";
import { useNavigation, Screens } from "navigation";
import { CardGrid } from "./CardGrid";
import { TraitFilterBar } from "./TraitFilterBar";
import { GameOptions } from "game/types";
import { CalcGameOptions } from "./CalcGameOptions";
import { CalcVariantClash } from "./CalcVariantClash";
import { CalcVariantFilterAndDisplayOrder } from "./CalcVariantFilterAndDisplayOrder";

const VariantSelectScreen: FC = () => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();

  const [activeFilters, setActiveFilters] = useState<TraitClasses[]>([]);
  const allVariants: FutureVariantName[] = CalcVariantFilterAndDisplayOrder(
    activeFilters
  );
  const [selectedVariants, setSelectedVariants] = useState<FutureVariantName[]>([]);
  const existsVariantsClash: boolean = CalcVariantClash(selectedVariants);
  const gameOptions: GameOptions = CalcGameOptions(selectedVariants);

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
          variantClash={existsVariantsClash}
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
