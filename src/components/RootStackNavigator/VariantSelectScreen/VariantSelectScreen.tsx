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
import { useNavigation, Screens, useGoBackOrToStartScreen, useRoute } from "navigation";
import { VariantCardGrid } from "./VariantCardGrid";
import { getFilteredVariantsInDisplayOrder } from "./getFilteredVariantsInDisplayOrder";
import {
  VariantCard,
  FiltersCard,
  GameOptionsCard,
  AdviceCard,
  BoardCard,
  FormatCard,
} from "./CollapsableCards";
import { Button, ButtonSecondary, Divider, AbsoluteView } from "ui";
import { ScreenContainer } from "components/shared";
import { Colors, TrackingPixel } from "primitives";
import styled from "styled-components/native";
import { FormatName } from "game/formats";
import { rollableVariants } from "game/formats/rollableVariants";
import { randomVariants } from "game/formats/randomVariants";
import { getConflictLevel } from "./getConflictLevel";
import { VariantModal, VariantModalInfo } from "./Modals/VariantModal";
import { boardOrder } from "game/boards";

import { HelpMenu } from "components/shared";

const VariantSelectScreen: FC = () => {
  const playWithFriends = useRoute<Screens.VariantSelectScreen>().params?.playWithFriends;

  const navigation = useNavigation();
  const goBackOrToStartScreen = useGoBackOrToStartScreen();

  const [gameOptions, setGameOptions] = useState<GameOptions>({
    ...defaultGameOptions,
    publicGame: !playWithFriends,
  });

  const [userFilters, setUserFilters] = useState<TraitName[]>([]);
  const [boardVariant, setBoardVariant] = useState(boardOrder[0]);
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

  const displayVariants: FutureVariantName[] = getFilteredVariantsInDisplayOrder({
    selectedFormat: gameOptions.format,
    selectedBoard: boardVariant,
    userFilters: userFilters,
  });

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
                gameOptions: calculateGameOptions(
                  gameOptions,
                  selectedVariantsForFormat,
                  boardVariant
                ),
                roomId: gameOptions.roomId,
              });
            }}
            style={{ flex: 1, marginLeft: 8 }}
          />
        </Divider>
        <ScrollView
          style={{
            flex: 1,
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 12, flexDirection: "column-reverse" }}
        >
          <FiltersCard userFilters={userFilters} setUserFilters={setUserFilters} />

          <GameOptionsCard gameOptions={gameOptions} setGameOptions={setGameOptions} />
          <AdviceCard
            selectedVariants={selectedVariantsForFormat}
            variantConflicts={variantConflicts}
            gameOptions={gameOptions}
          />
          <VariantCard
            selectedFormat={gameOptions.format}
            selectedVariants={selectedVariantsForFormat}
            setSelectedVariants={setSelectedVariantsForFormat}
            ruleNamesWithParams={gameOptions.ruleNamesWithParams}
          />
          <BoardCard
            boardVariant={boardVariant}
            setBoardVariant={setBoardVariant}
            gameOptions={gameOptions}
            setGameOptions={setGameOptions}
          />
        </ScrollView>
        <Divider style={{ padding: 0 }} />
        <FormatCard
          gameOptions={gameOptions}
          setGameOptions={setGameOptions}
          style={{
            backgroundColor: Colors.DARKER.toString(),
            paddingTop: 8,
            paddingHorizontal: 4,
          }}
        />
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
        <HelpMenu context={{ selectedVariants, displayVariants, conflictLevel }} />
      </LeftContainer>
      <TrackingPixel urlEnd={"VariantSelectScreen"} />
    </ScreenContainer>
  );
};

const LeftContainer = styled(View)`
  flex: 1;
`;

const Sidebar = styled(View)`
  flex-direction: column-reverse;
  width: 400px;
  background-color: ${Colors.DARKER.toString()};
  border-left-width: 1px;
  border-left-color: ${Colors.DARKISH.toString()};
`;

export { VariantSelectScreen };
