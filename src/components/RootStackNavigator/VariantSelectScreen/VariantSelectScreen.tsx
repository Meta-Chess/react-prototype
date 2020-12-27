import React, { FC, useState } from "react";
import { View, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { Colors } from "primitives";
import { FutureVariantName } from "game/variants/variants";
import { TraitName } from "game/variants";
import { useNavigation, Screens } from "navigation";
import { VariantCardGrid } from "./VariantCardGrid";
import { TraitFilterBar } from "./TraitFilterBar";
import { calculateGameOptions } from "./calculateGameOptions";
import { determineIfVariantClash } from "./determineIfVariantClash";
import { getFilteredVariantsInDisplayOrder } from "./getFilteredVariantsInDisplayOrder";
import { Button, ButtonSecondary } from "ui";

const VariantSelectScreen: FC = () => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();

  const [activeFilters, setActiveFilters] = useState<TraitName[]>([]);
  const displayVariants: FutureVariantName[] = getFilteredVariantsInDisplayOrder(
    activeFilters
  );
  const [selectedVariants, setSelectedVariants] = useState<FutureVariantName[]>([]);
  const existsVariantsClash: boolean = determineIfVariantClash(selectedVariants);

  return (
    <ScreenContainer width={width} height={height}>
      <VariantCardGrid
        style={{ flex: 1 }}
        displayVariants={displayVariants}
        selectedVariants={selectedVariants}
        setSelectedVariants={setSelectedVariants}
        variantClash={existsVariantsClash}
      />
      <OptionContainer>
        <ButtonSecondary
          text="Back"
          onPress={(): void => navigation.goBack()}
          style={{ width: 200 }}
        />
        <TraitFilterBar
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          style={{ marginLeft: 64 }}
        />
        <Button
          text="Start Game"
          onPress={(): void =>
            navigation.navigate(Screens.GameScreen, {
              gameOptions: calculateGameOptions(selectedVariants),
            })
          }
          style={{ width: 200, marginLeft: 64 }}
        />
      </OptionContainer>
    </ScreenContainer>
  );
};

const ScreenContainer = styled(View)<{ height: number; width: number }>`
  display: flex;
  background-color: ${Colors.DARKEST.string()};
  justify-content: space-between;
  flex-direction: column;
  height: ${({ height }): number => height}px;
  width: ${({ width }): number => width}px;
  padding-horizontal: 16px;
  padding-vertical: 32px;
`;

const OptionContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  margin-top: 8px;
`;

export { VariantSelectScreen };
