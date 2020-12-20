import React, { FC, useState, ReactElement } from "react";
import { ViewStyle, Platform } from "react-native";
import { StyleProps } from "primitives";
import { FutureVariantName } from "game/variants/variants";
import { TraitName } from "game/variants";
import { useNavigation, Screens } from "navigation";
import { VariantCardGrid } from "./VariantCardGrid";
import { TraitFilterBar } from "./TraitFilterBar";
import { calculateGameOptions } from "./calculateGameOptions";
import { determineIfVariantClash } from "./determineIfVariantClash";
import { getFilteredVariantsInDisplayOrder } from "./getFilteredVariantsInDisplayOrder";
import { Button, ButtonSecondary } from "ui";
import { ScreenContainer } from "components/shared";
import { ControlLayoutContainer } from "./ControlLayoutContainer";

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
        style={{ marginBottom: Platform.OS === "web" ? 16 : 0 }}
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

export { VariantSelectScreen };
