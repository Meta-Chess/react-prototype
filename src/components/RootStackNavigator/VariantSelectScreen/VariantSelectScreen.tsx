import React, { FC, useState } from "react";
import { View, ScrollView } from "react-native";
import {
  calculateGameOptions,
  AdviceLevel,
  findVariantConflicts,
  FutureVariantName,
  GameOptions,
} from "game";
import { TraitName } from "game/variants/traitInfo";
import { useNavigation, Screens, useGoBackOrToStartScreen } from "navigation";
import { VariantCardGrid } from "./VariantCardGrid";
import { getFilteredVariantsInDisplayOrder } from "./getFilteredVariantsInDisplayOrder";
import {
  SelectedVariantsCard,
  FiltersCard,
  GameOptionsCard,
  defaultGameOptions,
} from "./CollapsableCards";
import { Button, ButtonSecondary } from "ui";
import { ScreenContainer } from "components/shared";
import { Colors } from "primitives";
import { Styles } from "primitives/Styles";
import styled from "styled-components/native";
import { AdviceCard } from "components/RootStackNavigator/VariantSelectScreen/CollapsableCards/AdviceCard";

const VariantSelectScreen: FC = () => {
  const navigation = useNavigation();
  const goBackOrToStartScreen = useGoBackOrToStartScreen();

  const [gameOptions, setGameOptions] = useState<GameOptions>(defaultGameOptions);

  const [activeFilters, setActiveFilters] = useState<TraitName[]>([]);
  const displayVariants: FutureVariantName[] = getFilteredVariantsInDisplayOrder(
    activeFilters
  );
  const [selectedVariants, setSelectedVariants] = useState<FutureVariantName[]>([]);

  const variantConflicts: {
    message: string;
    level: AdviceLevel;
  }[] = findVariantConflicts(selectedVariants);
  const conflictLevel = variantConflicts.some((conflict) => conflict.level === "ERROR")
    ? "ERROR"
    : variantConflicts.some((conflict) => conflict.level === "WARNING")
    ? "WARNING"
    : undefined;

  return (
    <ScreenContainer
      style={{ paddingHorizontal: 0, paddingVertical: 0, flexDirection: "row" }}
    >
      <LeftContainer style={{ flex: 1 }}>
        <VariantCardGrid
          style={{ flex: 1, paddingLeft: 24, paddingRight: 4 }}
          displayVariants={displayVariants}
          selectedVariants={selectedVariants}
          setSelectedVariants={setSelectedVariants}
          conflictLevel={conflictLevel}
        />
      </LeftContainer>
      <Sidebar>
        <ScrollView
          style={{
            flex: 1,
            marginHorizontal: -24,
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 12 }}
        >
          <SelectedVariantsCard
            selectedVariants={selectedVariants}
            setSelectedVariants={setSelectedVariants}
          />
          <AdviceCard
            selectedVariants={selectedVariants}
            variantConflicts={variantConflicts}
          />
          <GameOptionsCard gameOptions={gameOptions} setGameOptions={setGameOptions} />
          <FiltersCard
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />
        </ScrollView>
        <NavigationContainer>
          <ButtonSecondary
            text="Back"
            onPress={goBackOrToStartScreen}
            style={{ flex: 1 }}
          />
          <Button
            text="Start Game"
            onPress={(): void => {
              // console.log(`const gameMaster = new GameMaster(...GameMaster.processConstructorInputs(calculateGameOptions(${JSON.stringify((Object.keys(gameOptions) as (keyof typeof gameOptions)[]).reduce((acc, k) => gameOptions[k] && gameOptions[k] !== "chess" ? { ...acc, [k]: gameOptions[k] } : { ...acc }, {}))}, ${JSON.stringify(selectedVariants)}), mockRenderer));\n const board = gameMaster.game.board;\n\n`); // TEST WRITING HELPER COMMENT
              navigation.navigate(Screens.GameScreen, {
                gameOptions: calculateGameOptions(gameOptions, selectedVariants),
                roomId: gameOptions.roomId,
              });
            }}
            style={{ flex: 1, marginLeft: 8 }}
          />
        </NavigationContainer>
      </Sidebar>
    </ScreenContainer>
  );
};

const LeftContainer = styled(View)`
  flex: 1;
`;

const Sidebar = styled(View)`
  flex-direction: column;
  width: 400px;
  background-color: ${Colors.DARKER.toString()};
  padding: 0px 24px 24px;
  ${Styles.BOX_SHADOW}
`;

const NavigationContainer = styled(View)`
  flex-direction: row;
  margin-top: 16px;
`;

export { VariantSelectScreen };
