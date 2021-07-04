import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { futureVariants, GameOptions } from "game";
import { CollapsableCard } from "ui/Containers";
import { ModalGearButton } from "ui/Pressable";
import { SFC, Text, Colors, HoverRef } from "primitives";
import { FutureVariantName } from "game";
import { PreviewIcon } from "primitives";
import { RuleNamesWithParams } from "game/CompactRules";
import { VariantLabel } from "components/shared/Labels";
import { BoardTypeName, boardTypes } from "game/boardTypes";
import {
  ModalInfo,
  ModalType,
} from "components/RootStackNavigator/VariantSelectScreen/Modals/shared";
import { getVariantsSelectedBoard } from "game/variantAndRuleProcessing/boardTypeProcessing";
import { HoverPreviewIcon } from "./HoverPreviewIcon";
interface Props {
  selectedVariants: FutureVariantName[];
  setSelectedVariants: (x: FutureVariantName[]) => void;
  gameOptions: GameOptions;
  setGameOptions: (x: GameOptions) => void;
  modalInfo: ModalInfo;
  setModalInfo: (x: ModalInfo) => void;
  boardPreviewRef: HoverRef;
  boardPreviewHover: boolean;
  ruleNamesWithParams?: RuleNamesWithParams;
}

const BoardCard: SFC<Props> = ({
  selectedVariants,
  setSelectedVariants,
  gameOptions,
  setGameOptions,
  modalInfo,
  setModalInfo,
  boardPreviewRef,
  boardPreviewHover,
  ruleNamesWithParams = {},
}) => {
  const playerNumber = gameOptions.numberOfPlayers;
  return (
    <CollapsableCard
      title={
        "Board - " +
        getVariantsSelectedBoard(selectedVariants).title +
        " " +
        playerNumber.toString() +
        "P"
      }
      titleComponent={
        <HoverPreviewIcon hoverRef={boardPreviewRef} hovered={boardPreviewHover} />
      }
      endComponent={
        <ModalGearButton
          customModalInfo={{
            type: ModalType.boardModal,
          }}
          modalInfo={modalInfo}
          setModalInfo={setModalInfo}
        />
      }
      defaultState={false}
      collapsable={false}
    />
  );
};

export { BoardCard };
