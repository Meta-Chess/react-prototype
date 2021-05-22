import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { SFC, Colors, Text } from "primitives";
import { ButtonSecondaryLight, ButtonTertiaryLight } from "ui";
import { optionsChangeRuleParam } from "game/variantAndRuleProcessing";
import { ParamProps } from "./ParamProps";
import { ParamSettingPieceCycles } from "game/rules";
import { PieceName } from "game/types";
import { PieceImage } from "primitives";
import { pieceDisplayOrder } from "game/displayInfo";
import { ArrowForwardIcon } from "primitives/icons";

export const ParamPieceCyclesOptions: SFC<ParamProps> = ({
  ruleName,
  paramName,
  paramSettings,
  paramDefault,
  tempParamOptions,
  setTempParamOptions,
  style,
}) => {
  const paramSettingPieceCycles = paramSettings as ParamSettingPieceCycles;
  const paramDefaultPieceCycles = paramDefault as PieceName[][];

  const [optionPieceCycles, setOptionPieceCycles] = useState<PieceName[][]>(
    paramDefaultPieceCycles
  );

  useEffect(() => {
    setTempParamOptions(
      optionsChangeRuleParam({
        ruleName: ruleName,
        paramName: paramName,
        tempParamOptions: tempParamOptions,
        paramSettings: paramSettingPieceCycles,
        paramNewValue: optionPieceCycles,
      })
    );
  }, [optionPieceCycles]);

  return (
    <View style={style}>
      <View
        style={{
          padding: 12,
          flexDirection: "row",
          alignItems: "center",
        }}
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
          {Object.values([...pieceDisplayOrder].reverse())
            .filter((name) => name !== undefined)
            .map((name) => {
              const pieceUsed = optionPieceCycles
                .flatMap((pieceCycle) => pieceCycle)
                .includes(name);
              return (
                <TouchableOpacity
                  key={name}
                  onPress={(): void => {
                    setOptionPieceCycles([
                      ...optionPieceCycles.slice(0, optionPieceCycles.length - 1),
                      [...optionPieceCycles[optionPieceCycles.length - 1], name],
                    ]);
                  }}
                  disabled={pieceUsed}
                >
                  {
                    <PieceImage
                      key={name}
                      type={name}
                      color={
                        pieceUsed
                          ? Colors.MCHESS_BLUE.mix(Colors.GREY, 0.9).toString()
                          : Colors.MCHESS_BLUE.mix(Colors.GREY, 0.3).toString()
                      }
                      outlineColor={
                        pieceUsed
                          ? Colors.MCHESS_BLUE.mix(Colors.GREY, 0.9).toString()
                          : Colors.MCHESS_BLUE.mix(Colors.GREY, 0.3).toString()
                      }
                      size={40}
                    />
                  }
                </TouchableOpacity>
              );
            })}
        </View>
      </View>
      {optionPieceCycles.map((pieceCycle, index) => {
        return (
          <View key={index} style={{ paddingHorizontal: 12, paddingBottom: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
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
                      <TouchableOpacity
                        key={pieceName}
                        onPress={(): void => {
                          setOptionPieceCycles(
                            optionPieceCycles
                              .map((pieceCycle) =>
                                pieceCycle.filter((name) => pieceName !== name)
                              )
                              .filter(
                                (pieceCycle, index, pieceCycles) =>
                                  pieceCycle.length > 1 ||
                                  index === pieceCycles.length - 1
                              )
                          );
                        }}
                        disabled={pieceUsed}
                      >
                        <PieceImage
                          key={pieceName}
                          type={pieceName}
                          color={
                            pieceUsed
                              ? Colors.MCHESS_BLUE.mix(Colors.GREY, 0.9).toString()
                              : Colors.MCHESS_BLUE.mix(Colors.GREY, 0.3).toString()
                          }
                          outlineColor={
                            pieceUsed
                              ? Colors.MCHESS_BLUE.mix(Colors.GREY, 0.9).toString()
                              : Colors.MCHESS_BLUE.mix(Colors.GREY, 0.3).toString()
                          }
                          size={40}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
              <View style={{ height: 40, justifyContent: "center" }}>
                {index === optionPieceCycles.length - 1 ? (
                  <>
                    {pieceDisplayOrder.length -
                      optionPieceCycles.flatMap((name) => name).length >=
                      2 &&
                      optionPieceCycles[optionPieceCycles.length - 1].length >= 2 && (
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
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};
