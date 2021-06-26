import React, { FC, useState, useCallback } from "react";
import { View, ScrollView, useWindowDimensions } from "react-native";
import {
  calculateGameOptions,
  AdviceLevel,
  findConflicts,
  FutureVariantName,
  GameOptions,
  defaultGameOptions,
} from "game";
import { TraitName } from "game/variants/traitInfo";
import { useNavigation, Screens, useGoBackOrToStartScreen, useRoute } from "navigation";
import { VariantCardGrid } from "./VariantCardGrid";
import { getFilteredVariantsInDisplayOrder } from "./getFilteredVariantsInDisplayOrder";
import { FormatCard, FiltersCard, GameOptionsCard, AdviceCard } from "./CollapsableCards";
import { Button, ButtonSecondary, Footer, AbsoluteView, Card } from "ui";
import { ScreenContainer } from "components/shared";
import { Colors } from "primitives";
import { Styles } from "primitives/Styles";
import styled from "styled-components/native";
import { Topbar } from "./Topbar";
import { FormatName } from "game/formats";
import { rollableVariants } from "game/formats/rollableVariants";
import { randomVariants } from "game/formats/randomVariants";
import { getConflictLevel } from "./getConflictLevel";
import { VariantModal, VariantModalInfo } from "./Modals/VariantModal";
import { VariantScreenDimensions } from "./VariantScreenDimensions";

import { VariantTileTest } from "ui/Pressable";

const VariantSelectScreen: FC = () => {
  const playWithFriends = useRoute<Screens.VariantSelectScreen>().params?.playWithFriends;

  const navigation = useNavigation();
  const goBackOrToStartScreen = useGoBackOrToStartScreen();

  const [gameOptions, setGameOptions] = useState<GameOptions>({
    ...defaultGameOptions,
    publicGame: !playWithFriends,
  });

  const [activeFilters, setActiveFilters] = useState<TraitName[]>([]);
  const displayVariants: FutureVariantName[] = getFilteredVariantsInDisplayOrder(
    activeFilters
  );

  const [selectedVariants, setSelectedVariants] = useState<
    { [key in FormatName]: FutureVariantName[] }
  >({
    variantComposition: [],
    randomVariants: randomVariants,
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
  }[] = findConflicts(
    gameOptions.format,
    selectedVariantsForFormat,
    gameOptions.checkEnabled
  );
  const conflictLevel = getConflictLevel(gameOptions.format, variantConflicts);

  const [variantModalInfo, setVariantModalInfo] = useState<VariantModalInfo>({
    activated: false,
  });

  const { height, width } = useWindowDimensions();
  function getVariantScreenDimensions(
    height: number,
    width: number
  ): VariantScreenDimensions {
    const sidebarWidth = 400;

    const cardsPerRow = 4;
    const cardGridSpacing = 8;
    const cardGridWidth = width - sidebarWidth;

    return {
      cardSize: (cardGridWidth - 2 * cardGridSpacing * (cardsPerRow + 1)) / cardsPerRow,
      cardGridSpacing: cardGridSpacing,
      sidebarWidth: sidebarWidth,
    };
  }
  const screenMeasurements = getVariantScreenDimensions(height, width);

  return (
    <ScreenContainer
      style={{
        paddingHorizontal: 0,
        paddingVertical: 0,
        flexDirection: "row-reverse",
      }}
    >
      <Sidebar width={screenMeasurements.sidebarWidth}>
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
            ruleNamesWithParams={gameOptions.ruleNamesWithParams}
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
        <Footer>
          <ButtonSecondary
            label="Back"
            onPress={goBackOrToStartScreen}
            style={{ flex: 1 }}
          />
          <Button
            label="Start Game"
            onPress={(): void => {
              // console.log(`const gameMaster = new GameMaster(...GameMaster.processConstructorInputs({ gameOptions: calculateGameOptions(${JSON.stringify((Object.keys(gameOptions) as (keyof typeof gameOptions)[]).reduce((acc, k) => gameOptions[k] !== "chess" ? { ...acc, [k]: gameOptions[k] } : { ...acc }, {}))}, ${JSON.stringify(selectedVariants)}) } ));\n const board = gameMaster.game.board;\n\n`); // TEST WRITING HELPER COMMENT
              navigation.navigate(Screens.GameScreen, {
                gameOptions: calculateGameOptions(gameOptions, selectedVariantsForFormat),
                roomId: gameOptions.roomId,
              });
            }}
            style={{ flex: 1, marginLeft: 8 }}
          />
        </Footer>
      </Sidebar>
      <LeftContainer style={{ flex: 1, flexDirection: "column-reverse" }}>
        <VariantCardGrid
          style={{
            width: "100%",
            flex: 1,
          }}
          measurements={screenMeasurements}
          displayVariants={displayVariants}
          selectedVariants={selectedVariantsForFormat}
          setSelectedVariants={setSelectedVariantsForFormat}
          conflictLevel={conflictLevel}
          setVariantModalInfo={setVariantModalInfo}
          ruleNamesWithParams={gameOptions.ruleNamesWithParams}
        />
        {variantModalInfo.activated && (
          <AbsoluteView style={{ backgroundColor: Colors.BLACK.fade(0.4).toString() }}>
            <VariantModal
              variantModalInfo={variantModalInfo}
              setVariantModalInfo={setVariantModalInfo}
              gameOptions={gameOptions}
              setGameOptions={setGameOptions}
            />
          </AbsoluteView>
        )}
      </LeftContainer>
    </ScreenContainer>
  );
};

const LeftContainer = styled(View)`
  flex: 1;
`;

const Sidebar = styled(View)<{ width: number }>`
  flex-direction: column;
  width: ${({ width }): number => width}px;
  background-color: ${Colors.DARKER.toString()};
  border-left-width: 1px;
  border-left-color: ${Colors.DARKISH.toString()};
  ${Styles.BOX_SHADOW}
`;

export { VariantSelectScreen };
