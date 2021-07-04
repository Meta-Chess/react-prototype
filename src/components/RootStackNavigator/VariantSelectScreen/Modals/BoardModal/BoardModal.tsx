import React, { useCallback } from "react";
import { View } from "react-native";
import { SFC, Colors } from "primitives";
import { defaultGameOptions } from "game";
import { ItemContainer } from "components/RootStackNavigator/VariantSelectScreen/Modals/shared";
import { ModalProps, ModalTemplate } from "../shared";
import { LabelWithDetails } from "ui/LabelWithDetails";
import { BoardTypeName, boardTypes } from "game/boardTypes";
import { keys } from "utilities";
import {
  getVariantsSelectedBoard,
  setVariantsSelectedBoard,
} from "game/variantAndRuleProcessing/boardTypeProcessing";
import { PlayerOptions } from "./PlayerOptions";

export const BoardModal: SFC<ModalProps> = ({
  setModalInfo,
  gameOptions,
  setGameOptions,
  selectedVariants,
  setSelectedVariants,
  style,
}) => {
  const setNumberOfPlayers = useCallback(
    (numberOfPlayers: number): void =>
      setGameOptions({ ...gameOptions, numberOfPlayers }),
    [gameOptions, setGameOptions]
  );

  if (selectedVariants === undefined || setSelectedVariants === undefined) {
    return <></>;
  }
  const boardTypeNames = keys(boardTypes);

  return (
    <ModalTemplate
      title={"Board - " + "Standard"}
      reset={(): void => {
        setVariantsSelectedBoard(
          selectedVariants,
          setSelectedVariants,
          getVariantsSelectedBoard(defaultGameOptions.baseVariants)
        );
        setNumberOfPlayers(defaultGameOptions.numberOfPlayers);
      }}
      done={(): void => {
        setModalInfo({ type: undefined });
      }}
      priority={"primary"}
      style={[style, { height: "100%" }]}
    >
      <View style={{ flex: 1, flexDirection: "column", justifyContent: "flex-start" }}>
        <ItemContainer
          bottomFooter={true}
          style={{ flexDirection: "row", flexWrap: "wrap" }}
        >
          {boardTypeNames.map((boardTypeName) => {
            return (
              <LabelWithDetails
                label={boardTypes[boardTypeName].title}
                details={boardTypes[boardTypeName].description}
                key={boardTypes[boardTypeName].title}
                color={Colors.MCHESS_ORANGE}
                textCat={"BodyXS"}
                selected={getVariantsSelectedBoard(selectedVariants) === boardTypeName}
                onPress={(): void => {
                  setVariantsSelectedBoard(
                    selectedVariants,
                    setSelectedVariants,
                    boardTypeName
                  );
                  setNumberOfPlayers(
                    boardTypes[boardTypeName].allowedPlayers.includes(
                      defaultGameOptions.numberOfPlayers
                    )
                      ? defaultGameOptions.numberOfPlayers
                      : Math.min(...boardTypes[boardTypeName].allowedPlayers)
                  );
                }}
                noHover={true}
                style={{
                  paddingHorizontal: 4,
                  paddingVertical: 2,
                  borderRadius: 4,
                  margin: 4,
                }}
              />
            );
          })}
        </ItemContainer>
        <ItemContainer style={{ paddingTop: 0 }}>
          <PlayerOptions
            numberOfPlayers={gameOptions.numberOfPlayers}
            setNumberOfPlayers={setNumberOfPlayers}
            allowedPlayers={
              boardTypes[getVariantsSelectedBoard(selectedVariants)].allowedPlayers
            }
          />
        </ItemContainer>
      </View>
    </ModalTemplate>
  );
};
