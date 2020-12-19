import React, { FC, useState, ReactElement } from "react";
import { View, ViewStyle } from "react-native";
import styled from "styled-components/native";
import { Colors, StyleProps } from "primitives";
import { FutureVariantName } from "game/variants/variants";
import { TraitName } from "game/variants";
import { useNavigation, Screens } from "navigation";
import { VariantCardGrid } from "./VariantCardGrid";
import { TraitFilterBar } from "./TraitFilterBar";
import { calculateGameOptions } from "./calculateGameOptions";
import { determineIfVariantClash } from "./determineIfVariantClash";
import { getFilteredVariantsInDisplayOrder } from "./getFilteredVariantsInDisplayOrder";
import { Button, ButtonSecondary } from "ui";
import { ControlLayoutContainer } from "components/RootStackNavigator/VariantSelectScreen/ControlLayoutContainer";

const VariantSelectScreen: FC = () => {
  const navigation = useNavigation();

  const [activeFilters, setActiveFilters] = useState<TraitName[]>([]);
  const displayVariants: FutureVariantName[] = getFilteredVariantsInDisplayOrder(
    activeFilters
  );
  const [selectedVariants, setSelectedVariants] = useState<FutureVariantName[]>([]);
  const existsVariantsClash: boolean = determineIfVariantClash(selectedVariants);

  return (
    <ScreenContainer>
      <VariantCardGrid
        style={{ flex: 1 }}
        displayVariants={displayVariants}
        selectedVariants={selectedVariants}
        setSelectedVariants={setSelectedVariants}
        variantClash={existsVariantsClash}
      />
      <ControlLayoutContainer
        a={({ style }: { style: StyleProps<ViewStyle> }): ReactElement => (
          <TraitFilterBar
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            style={style}
          />
        )}
        b={({ style }: { style: StyleProps<ViewStyle> }): ReactElement => (
          <ButtonSecondary
            text="Back"
            onPress={(): void => navigation.goBack()}
            style={style}
          />
        )}
        c={({ style }: { style: StyleProps<ViewStyle> }): ReactElement => (
          <Button
            text="Start Game"
            onPress={(): void =>
              navigation.navigate(Screens.GameScreen, {
                gameOptions: calculateGameOptions(selectedVariants),
              })
            }
            style={style}
          />
        )}
      />
    </ScreenContainer>
  );
};

// TODO: Make screen containers the same on all screens
const ScreenContainer = styled(View)`
  flex: 1;
  background-color: ${Colors.DARKEST.string()};
  justify-content: space-between;
  flex-direction: column;
  padding-horizontal: 16px;
  padding-vertical: 32px;
`;

export { VariantSelectScreen };
