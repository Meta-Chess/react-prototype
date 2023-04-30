import React, { FC, useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  AdviceLevel,
  calculateGameOptions,
  defaultGameOptions,
  findConflicts,
  FutureVariantName,
  GameOptions,
} from "game";
import { TraitName } from "game/variants/traitInfo";
import { Screens, useGoBackOrToStartScreen, useNavigation, useRoute } from "navigation";
import { VariantCardGrid } from "./VariantCardGrid";
import { getFilteredVariantsInDisplayOrder } from "./getFilteredVariantsInDisplayOrder";
import {
  AdviceCard,
  FiltersCard,
  FormatCard,
  VariantSelectCard,
  GameOptionsCard,
} from "./CollapsableCards";
import { AbsoluteView, Button, ButtonSecondary, Divider } from "ui";
import { ScreenContainer } from "components/shared";
import { Colors, TrackingPixel } from "primitives";
import styled from "styled-components/native";
import { Topbar } from "./Topbar";
import { FormatName } from "game/formats";
import { rollableVariants } from "game/formats/rollableVariants";
import { randomVariants } from "game/formats/randomVariants";
import { getConflictLevel } from "./getConflictLevel";
import { VariantModal, VariantModalInfo } from "./Modals/VariantModal";

const VariantSelectScreen: FC = () => {
  const playWithFriends = useRoute<Screens.VariantSelectScreen>().params?.playWithFriends;

  const navigation = useNavigation();
  const goBackOrToStartScreen = useGoBackOrToStartScreen();

  const [gameOptions, setGameOptions] = useState<GameOptions>({
    ...defaultGameOptions,
    online: playWithFriends,
  });

  const [activeFilters, setActiveFilters] = useState<TraitName[]>([]);
  const displayVariants: FutureVariantName[] =
    getFilteredVariantsInDisplayOrder(activeFilters);

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

  return (
    <ScreenContainer
      style={{
        paddingVertical: 0,
        paddingHorizontal: 0,
        flexDirection: "row-reverse",
      }}
    >
      <Sidebar>
        <ScrollView
          style={{
            flex: 1,
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 12, flexDirection: "column-reverse" }}
        >
          <FiltersCard
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />
          <GameOptionsCard gameOptions={gameOptions} setGameOptions={setGameOptions} />
          <AdviceCard
            selectedVariants={selectedVariantsForFormat}
            variantConflicts={variantConflicts}
            gameOptions={gameOptions}
          />
          <VariantSelectCard
            selectedFormat={gameOptions.format}
            selectedVariants={selectedVariantsForFormat}
            setSelectedVariants={setSelectedVariantsForFormat}
            ruleNamesWithParams={gameOptions.ruleNamesWithParams}
          />
          <FormatCard gameOptions={gameOptions} setGameOptions={setGameOptions} />
        </ScrollView>
        <Divider>
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
        </Divider>
      </Sidebar>
      <LeftContainer
        style={{
          flex: 1,
          flexDirection: "column-reverse",
        }}
      >
        <VariantCardGrid
          style={{ flex: 1 }}
          displayVariants={displayVariants}
          selectedVariants={selectedVariantsForFormat}
          setSelectedVariants={setSelectedVariantsForFormat}
          conflictLevel={conflictLevel}
          setVariantModalInfo={setVariantModalInfo}
          ruleNamesWithParams={gameOptions.ruleNamesWithParams}
        />
        <Topbar
          displayVariants={displayVariants}
          selectedVariants={selectedVariantsForFormat}
          conflictLevel={conflictLevel}
          gameOptions={gameOptions}
          setGameOptions={setGameOptions}
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
      <TrackingPixel urlEnd={"VariantSelectScreen"} />
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
  border-left-width: 1px;
  border-left-color: ${Colors.DARKISH.toString()};
`;

export { VariantSelectScreen };
