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
  BoardCard,
  FormatCard,
  FiltersCard,
  GameOptionsCard,
  AdviceCard,
} from "./CollapsableCards";
import { Button, ButtonSecondary, Footer, AbsoluteView } from "ui";
import { ScreenContainer, HelpMenu } from "components/shared";
import { Colors, useHover } from "primitives";
import { Styles } from "primitives/Styles";
import styled from "styled-components/native";
import { FormatName } from "game/formats";
import { rollableVariants } from "game/formats/rollableVariants";
import { randomVariants } from "game/formats/randomVariants";
import { getConflictLevel } from "./getConflictLevel";
import { GenericModal } from "./Modals";
import { ModalInfo } from "./Modals/shared/ModalTypes";
import { ShadowBoard } from "components/RootStackNavigator/StartScreen";
import { GameProvider } from "components/shared";
import { getVariantsSelectedBoard } from "game/variantAndRuleProcessing/boardTypeProcessing";

const VariantSelectScreen: FC = () => {
  const playWithFriends = useRoute<Screens.VariantSelectScreen>().params?.playWithFriends;

  const navigation = useNavigation();
  const goBackOrToStartScreen = useGoBackOrToStartScreen();

  const [gameOptions, setGameOptions] = useState<GameOptions>({
    ...defaultGameOptions,
    publicGame: !playWithFriends,
  });

  const [selectedVariants, setSelectedVariants] = useState<
    { [key in FormatName]: FutureVariantName[] }
  >({
    variantComposition: defaultGameOptions.baseVariants,
    randomVariants: [...randomVariants, ...defaultGameOptions.baseVariants],
    rollingVariants: [...rollableVariants, ...defaultGameOptions.baseVariants],
  });
  const selectedVariantsForFormat = selectedVariants[gameOptions.format];
  const setSelectedVariantsForFormat = useCallback(
    (variants: FutureVariantName[]) =>
      setSelectedVariants({ ...selectedVariants, [gameOptions.format]: variants }),
    [selectedVariants, gameOptions.format]
  );

  const [activeFilters, setActiveFilters] = useState<TraitName[]>([]);
  const displayVariants: FutureVariantName[] = getFilteredVariantsInDisplayOrder(
    activeFilters,
    selectedVariantsForFormat
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

  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    type: undefined,
  });
  const [boardPreviewRef, boardPreviewHovered] = useHover();

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
          <BoardCard
            selectedVariants={selectedVariantsForFormat}
            setSelectedVariants={setSelectedVariantsForFormat}
            gameOptions={gameOptions}
            setGameOptions={setGameOptions}
            modalInfo={modalInfo}
            setModalInfo={setModalInfo}
            ruleNamesWithParams={gameOptions.ruleNamesWithParams}
            boardPreviewRef={boardPreviewRef}
            boardPreviewHover={boardPreviewHovered}
          />
          <FormatCard
            selectedFormat={gameOptions.format}
            selectedVariants={selectedVariantsForFormat}
            setSelectedVariants={setSelectedVariantsForFormat}
            modalInfo={modalInfo}
            setModalInfo={setModalInfo}
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
          style={{ flex: 1, paddingLeft: 24, paddingRight: 4 }}
          displayVariants={displayVariants}
          selectedVariants={selectedVariantsForFormat}
          setSelectedVariants={setSelectedVariantsForFormat}
          conflictLevel={conflictLevel}
          modalInfo={modalInfo}
          setModalInfo={setModalInfo}
          ruleNamesWithParams={gameOptions.ruleNamesWithParams}
        />
        <HelpMenu context={{ selectedVariants, displayVariants, conflictLevel }} />
        {modalInfo.type !== undefined && (
          <AbsoluteView style={{ backgroundColor: Colors.BLACK.fade(0.4).toString() }}>
            <GenericModal
              modalInfo={modalInfo}
              setModalInfo={setModalInfo}
              gameOptions={gameOptions}
              setGameOptions={setGameOptions}
              selectedVariants={selectedVariantsForFormat}
              setSelectedVariants={setSelectedVariantsForFormat}
            />
          </AbsoluteView>
        )}
        <AbsoluteView pointerEvents={"none"} style={{ flex: 1 }}>
          <GameProvider
            gameOptions={{
              ...calculateGameOptions(gameOptions, selectedVariantsForFormat),
              time: undefined,
              online: false,
              flipBoard: false,
              checkEnabled: false,
            }}
            key={
              getVariantsSelectedBoard(selectedVariantsForFormat) +
              gameOptions.numberOfPlayers
            }
          >
            {boardPreviewHovered && (
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  backgroundColor: boardPreviewHovered
                    ? Colors.DARKEST.toString()
                    : "transparent",
                }}
              >
                <View style={{ flex: 1, width: "100%", margin: 16 }}>
                  <ShadowBoard showShadow={false} />
                </View>
              </View>
            )}
          </GameProvider>
        </AbsoluteView>
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
  border-left-width: 1px;
  border-left-color: ${Colors.DARKISH.toString()};
  ${Styles.BOX_SHADOW}
`;

export { VariantSelectScreen };
