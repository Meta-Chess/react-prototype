import React from "react";
import { View } from "react-native";
import { SFC, Colors } from "primitives";
import { ButtonSecondaryLight, ButtonTertiaryLight } from "ui";
import { PieceName } from "game/types";
import { pieceDisplayOrder } from "game/displayInfo";
import { ArrowForwardIcon } from "primitives/icons";
import { PieceButton } from "./PieceButton";
import styled from "styled-components/native";

interface Props {
  index: number;
  pieceCycle: PieceName[];
  optionPieceCycles: PieceName[][];
  setOptionPieceCycles: (optionPieceCycles: PieceName[][]) => void;
}

export const PieceCycleRow: SFC<Props> = ({
  index,
  pieceCycle,
  optionPieceCycles,
  setOptionPieceCycles,
  style,
}) => {
  const lastCycleRow = index === optionPieceCycles.length - 1;

  const atLeastTwoPiecesLeft =
    pieceDisplayOrder.length - optionPieceCycles.flatMap((name) => name).length >= 2;
  const lastCycleContainsTwoPieces =
    optionPieceCycles[optionPieceCycles.length - 1].length >= 2;
  const displayNewCycleButton = atLeastTwoPiecesLeft && lastCycleContainsTwoPieces;

  return (
    <View style={style}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <PiecesAndArrowsContainer>
          {pieceCycle.map((pieceName) => {
            const pieceUsed = false;
            return (
              <View style={{ flexDirection: "row" }} key={pieceName}>
                <View style={{ height: 40, justifyContent: "center" }}>
                  <ArrowForwardIcon
                    size={20}
                    color={Colors.MCHESS_BLUE.mix(Colors.GREY, 0.9).toString()}
                  />
                </View>
                <PieceButton
                  key={pieceName}
                  onPress={onPieceButtonPress(
                    pieceName,
                    optionPieceCycles,
                    setOptionPieceCycles
                  )}
                  disabled={pieceUsed}
                  pieceName={pieceName}
                  size={40}
                />
              </View>
            );
          })}
        </PiecesAndArrowsContainer>
        <CycleButtonsContainer>
          {lastCycleRow ? (
            <>
              {displayNewCycleButton && (
                <ButtonSecondaryLight
                  onPress={(): void => {
                    setOptionPieceCycles([...optionPieceCycles, []]);
                  }}
                  style={{ marginHorizontal: 12 }}
                  label={"New Cycle"}
                  size={"Small"}
                />
              )}
            </>
          ) : (
            <ButtonTertiaryLight
              onPress={(): void => {
                setOptionPieceCycles([
                  ...optionPieceCycles.slice(0, index),
                  ...optionPieceCycles.slice(index + 1),
                ]);
              }}
              style={{ marginHorizontal: 12 }}
              label={"Delete Cycle"}
              size={"Small"}
            />
          )}
        </CycleButtonsContainer>
      </View>
    </View>
  );
};

const onPieceButtonPress = (
  pieceName: PieceName,
  optionPieceCycles: PieceName[][],
  setOptionPieceCycles: (optionPieceCycles: PieceName[][]) => void
) => (): void => {
  setOptionPieceCycles(
    optionPieceCycles
      .map((pieceCycle) => pieceCycle.filter((name) => pieceName !== name))
      .filter(
        (pieceCycle, index, pieceCycles) =>
          pieceCycle.length > 1 || index === pieceCycles.length - 1
      )
  );
};

const PiecesAndArrowsContainer = styled(View)`
  flex: 1;
  flex-flow: row-wrap;
  align-items: center;
`;

const CycleButtonsContainer = styled(View)`
  height: 40;
  justify-content: center;
`;
