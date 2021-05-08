import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { SFC, Colors, Text } from "primitives";
import { LabeledCheckBox } from "ui";
import { gameOptionsChangeRuleParam } from "game/variantAndRuleProcessing";
import { ParamProps } from "./ParamProps";
import { ParamSettingPieceCycles } from "game/rules";
import { PieceName } from "game/types";
import { PieceImage } from "primitives";
import { pieceDisplayOrder } from "game/displayInfo";

export const ParamPieceCyclesOptions: SFC<ParamProps> = ({
  ruleName,
  paramName,
  paramSettings,
  paramDefault,
  gameOptions,
  setGameOptions,
  style,
}) => {
  const paramSettingPieceCycles = paramSettings as ParamSettingPieceCycles;
  const paramDefaultPieceCycles = paramDefault as PieceName[][];

  //const [checkbox, setCheckbox] = useState(paramDefaultPieceCycles);

  type OptionsData = {
    selectedPieces: PieceName[];
    distinctCycles: number;
    pieceCycles: PieceName[][];
  };
  //const optionsData =

  return (
    <View
      style={[
        style,
        {
          padding: 12,
          flexDirection: "row",
          alignItems: "center",
        },
      ]}
    >
      <Text cat={"BodyM"} color={Colors.TEXT.LIGHT_SECONDARY.toString()}>
        {paramName}
      </Text>
      <View
        style={{
          marginLeft: 8,
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {Object.values(pieceDisplayOrder.reverse())
          .filter((name) => name !== undefined)
          .map((name) => {
            return (
              <TouchableOpacity
                key={name}
                onPress={(): void => {
                  return;
                }}
              >
                {
                  <PieceImage
                    key={name}
                    type={name}
                    color={optionsData.selectedPieces(
                      Colors.MCHESS_BLUE.mix(Colors.GREY, 0.6).toString()
                    )} //color={Colors.MCHESS_BLUE.mix(Colors.GREY, 0.9).toString()}
                    outlineColor={Colors.MCHESS_BLUE.toString()} //color={Colors.MCHESS_BLUE.mix(Colors.GREY, 0.9).toString()}
                    size={40}
                  />
                }
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
};
