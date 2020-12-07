import React, { FC, useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { Colors } from "primitives";
import { FutureVariantName } from "game/variants";
import { TraitClass } from "game/types";
import { useNavigation, Screens } from "navigation";
import { CardGrid } from "./CardGrid";
import { TraitFilterBar } from "./TraitFilterBar";
import { StartButton } from "./StartButton";
import { BackButton } from "./BackButton";
import { calculateGameOptions } from "./calculateGameOptions";
import { determineIfVariantClash } from "./determineIfVariantClash";
import { getFilteredVariantsInDisplayOrder } from "./getFilteredVariantsInDisplayOrder";

const VariantSelectScreen: FC = () => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();

  const [activeFilters, setActiveFilters] = useState<TraitClass[]>([]);
  const displayVariants: FutureVariantName[] = getFilteredVariantsInDisplayOrder(
    activeFilters
  );
  const [selectedVariants, setSelectedVariants] = useState<FutureVariantName[]>([]);
  const existsVariantsClash: boolean = determineIfVariantClash(selectedVariants);

  return (
    <ScreenContainer>
      <GridContainer width={width} height={height}>
        <CardGrid
          style={styles.CardGrid}
          displayVariants={displayVariants}
          selectedVariants={selectedVariants}
          setSelectedVariants={setSelectedVariants}
          variantClash={existsVariantsClash}
        />
        <OptionContainer width={width}>
          <BackButton
            style={styles.BackButton}
            onPress={(): void => {
              navigation.goBack();
            }}
          />
          <TraitFilterBar
            style={styles.TraitFilterBar}
            filterBarHeight={48}
            filterBarWidth={375}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />
          <StartButton
            style={styles.StartButton}
            onPress={(): void => {
              navigation.navigate<Screens.GameScreen>(Screens.GameScreen, {
                gameOptions: calculateGameOptions(selectedVariants),
              });
            }}
          />
        </OptionContainer>
      </GridContainer>
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

interface GridContainerProps {
  height: number;
  width: number;
}

const GridContainer = styled(View)<GridContainerProps>`
  justify-content: space-between;
  align-content: stretch;
  flex-direction: column;
  height: ${({ height }): number => height};
  width: ${({ width }): number => width};
`;

interface OptionContainerProps {
  width: number;
}

const OptionContainer = styled(View)<OptionContainerProps>`
  flex-direction: row;
  justify-content: center;
  width: ${({ width }): number => width};
  min-height: 165px;
  padding-bottom: 6px;
`;

const styles = StyleSheet.create({
  CardGrid: {
    height: "72%",
    alignSelf: "center",
    marginHorizontal: 12,
    marginTop: 36,
    flex: 1,
  },
  BackButton: {
    alignSelf: "center",
    marginTop: 32,
    marginRight: 64,
    width: 200,
  },
  StartButton: {
    alignSelf: "center",
    marginTop: 32,
    marginLeft: 64,
    width: 200,
  },
  TraitFilterBar: {
    alignSelf: "center",
    marginVertical: 24,
    paddingBottom: 6,
  },
});

export { VariantSelectScreen };
