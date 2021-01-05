import React, { FC, useState } from "react";
import { View, ScrollView } from "react-native";
import { FutureVariantName } from "game/variants/variants";
import { TraitName } from "game/variants";
import { useNavigation, Screens } from "navigation";
import { VariantCardGrid } from "./VariantCardGrid";
import {
  calculateGameOptions,
  determineIfVariantClash,
  getFilteredVariantsInDisplayOrder,
} from "./ScreenStateFunctions";
import {
  SelectedVariantsCard,
  FiltersCard,
  GameOptionsCard,
  defaultGameOptions,
} from "./CollapsableCards";
import { GameOptions } from "game/types";
import { Button, ButtonSecondary } from "ui";
import { ScreenContainer } from "components/shared";
import { Colors } from "primitives";
import { Styles } from "primitives/Styles";
import styled from "styled-components/native";

const VariantSelectScreen: FC = () => {
  const navigation = useNavigation();

  const [gameOptions, setGameOptions] = useState<GameOptions>(defaultGameOptions);

  const [activeFilters, setActiveFilters] = useState<TraitName[]>([]);
  const displayVariants: FutureVariantName[] = getFilteredVariantsInDisplayOrder(
    activeFilters
  );
  const [selectedVariants, setSelectedVariants] = useState<FutureVariantName[]>([]);
  const existsVariantsClash: boolean = determineIfVariantClash(selectedVariants);

  return (
    <ScreenContainer
      style={{ paddingHorizontal: 0, paddingVertical: 0, flexDirection: "row" }}
    >
      <LeftContainer style={{ flex: 1 }}>
        <VariantCardGrid
          style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 16 }}
          displayVariants={displayVariants}
          selectedVariants={selectedVariants}
          setSelectedVariants={setSelectedVariants}
          variantClash={existsVariantsClash}
        />
      </LeftContainer>
      <Sidebar>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <SelectedVariantsCard
            selectedVariants={selectedVariants}
            setSelectedVariants={setSelectedVariants}
          />
          <FiltersCard
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            style={{ marginTop: 16 }}
          />
          <GameOptionsCard
            gameOptions={gameOptions}
            setGameOptions={setGameOptions}
            style={{ marginTop: 16 }}
          />
        </ScrollView>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignSelf: "flex-end",
            paddingTop: 8,
          }}
        >
          <ButtonSecondary
            text="Back"
            onPress={(): void => navigation.goBack()}
            style={{ flex: 1 }}
          />
          <Button
            text="Start Game"
            onPress={(): void =>
              navigation.navigate(Screens.GameScreen, {
                gameOptions: calculateGameOptions(gameOptions, selectedVariants),
                roomId: gameOptions.roomId,
              })
            }
            style={{ flex: 1, marginLeft: 8 }}
          />
        </View>
      </Sidebar>
    </ScreenContainer>
  );
};

const LeftContainer = styled(View)`
  flex: 1;
`;

const Sidebar = styled(View)`
  flex-direction: column;
  width: 400;
  background-color: ${Colors.DARKER.toString()};
  padding-vertical: 24;
  padding-horizontal: 32;
  ${Styles.BOX_SHADOW}
`;

export { VariantSelectScreen };
