import React, { FC, useState, useCallback } from "react";
import { View, ScrollView } from "react-native";
import {
  calculateGameOptions,
  AdviceLevel,
  findConflicts,
  FutureVariantName,
  GameOptions,
  defaultGameOptions,
} from "game";
import { TraitName } from "game/variants/traitInfo";
import { useNavigation, Screens, useGoBackOrToStartScreen } from "navigation";
import { VariantCardGrid } from "./VariantCardGrid";
import { getFilteredVariantsInDisplayOrder } from "./getFilteredVariantsInDisplayOrder";
import { FormatCard, FiltersCard, GameOptionsCard } from "./CollapsableCards";
import { Button, ButtonSecondary, HorizontalSeparator } from "ui";
import { ScreenContainer } from "components/shared";
import { Colors } from "primitives";
import { Styles } from "primitives/Styles";
import styled from "styled-components/native";
import { AdviceCard } from "components/RootStackNavigator/VariantSelectScreen/CollapsableCards/AdviceCard";
import { Topbar } from "./Topbar";
import { FormatName } from "game/formats";
import { rollableVariants } from "game/formats/rollableVariants";

const VariantSelectScreen: FC = () => {
  const navigation = useNavigation();
  const goBackOrToStartScreen = useGoBackOrToStartScreen();

  const [gameOptions, setGameOptions] = useState<GameOptions>(defaultGameOptions);

  const [activeFilters, setActiveFilters] = useState<TraitName[]>([]);
  const displayVariants: FutureVariantName[] = getFilteredVariantsInDisplayOrder(
    activeFilters
  );

  const [selectedVariants, setSelectedVariants] = useState<
    { [key in FormatName]: FutureVariantName[] }
  >({
    variantComposition: [],
    randomVariants: [],
    rollingVariants: rollableVariants,
  });
  const selectedVariantsForFormat = selectedVariants[gameOptions.format];
  const setSelectedVariantsForFormat = useCallback(
    (variants: FutureVariantName[]) =>
      setSelectedVariants({ ...selectedVariants, [gameOptions.format]: variants }),
    [selectedVariants, gameOptions.format]
  );

  const variantConflicts: {
    message: string;
    level: AdviceLevel;
  }[] = findConflicts(gameOptions.format, selectedVariantsForFormat);
  const conflictLevel = variantConflicts.some((conflict) => conflict.level === "ERROR")
    ? "ERROR"
    : variantConflicts.some((conflict) => conflict.level === "WARNING")
    ? "WARNING"
    : undefined;

  return (
    <ScreenContainer
      style={{
        paddingHorizontal: 0,
        paddingVertical: 0,
        flexDirection: "row-reverse",
      }}
    >
      <Sidebar>
        <ScrollView
          style={{
            flex: 1,
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 12 }}
        >
          <FormatCard
            selectedFormat={gameOptions.format}
            selectedVariants={selectedVariantsForFormat}
            setSelectedVariants={setSelectedVariantsForFormat}
          />
          <AdviceCard
            selectedVariants={selectedVariantsForFormat}
            variantConflicts={variantConflicts}
            gameOptions={gameOptions}
          />
          <GameOptionsCard gameOptions={gameOptions} setGameOptions={setGameOptions} />
          <FiltersCard
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />
        </ScrollView>
        <HorizontalSeparator color={Colors.DARKISH.fade(0.55).toString()} />
        <NavigationContainer>
          <ButtonSecondary
            text="Back"
            onPress={goBackOrToStartScreen}
            style={{ flex: 1 }}
          />
          <Button
            text="Start Game"
            onPress={(): void => {
              // console.log(`const gameMaster = new GameMaster(...GameMaster.processConstructorInputs({ gameOptions: calculateGameOptions(${JSON.stringify((Object.keys(gameOptions) as (keyof typeof gameOptions)[]).reduce((acc, k) => gameOptions[k] !== "chess" ? { ...acc, [k]: gameOptions[k] } : { ...acc }, {}))}, ${JSON.stringify(selectedVariants)}) } ));\n const board = gameMaster.game.board;\n\n`); // TEST WRITING HELPER COMMENT
              navigation.navigate(Screens.GameScreen, {
                gameOptions: calculateGameOptions(gameOptions, selectedVariantsForFormat),
                roomId: gameOptions.roomId,
              });
            }}
            style={{ flex: 1, marginLeft: 8 }}
          />
        </NavigationContainer>
      </Sidebar>
      <LeftContainer style={{ flex: 1, flexDirection: "column-reverse" }}>
        <VariantCardGrid
          style={{ flex: 1, paddingLeft: 24, paddingRight: 4 }}
          displayVariants={displayVariants}
          selectedVariants={selectedVariantsForFormat}
          setSelectedVariants={setSelectedVariantsForFormat}
          conflictLevel={conflictLevel}
        />
        <Topbar
          displayVariants={displayVariants}
          selectedVariants={selectedVariantsForFormat}
          conflictLevel={conflictLevel}
          gameOptions={gameOptions}
          setGameOptions={setGameOptions}
        />
      </LeftContainer>
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
  padding: 0px 0px 24px;
  border-left-width: 1px;
  border-left-color: ${Colors.DARKISH.toString()};
  ${Styles.BOX_SHADOW}
`;

const NavigationContainer = styled(View)`
  flex-direction: row;
  margin-top: 24px;
  margin-horizontal: 24px;
`;

export { VariantSelectScreen };
