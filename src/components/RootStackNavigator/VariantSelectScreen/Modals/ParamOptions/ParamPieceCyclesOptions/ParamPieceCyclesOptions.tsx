import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { SFC } from "primitives";
import { optionsChangeRuleParam } from "game/variantAndRuleProcessing";
import { ParamProps, ParamTitle } from "../shared";
import { ParamSettingPieceCycles } from "game/CompactRules";
import { PieceName } from "game/types";
import { PieceSelectRow } from "./PieceSelectRow";
import { PieceCycleRow } from "./PieceCycleRow";

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
    <View>
      <View style={style}>
        <ParamTitle paramName={paramName} />
        <PieceSelectRow
          optionPieceCycles={optionPieceCycles}
          setOptionPieceCycles={setOptionPieceCycles}
          style={{
            marginLeft: 8,
          }}
        />
      </View>
      {optionPieceCycles.map((pieceCycle, index) => {
        return (
          <PieceCycleRow
            key={index}
            index={index}
            pieceCycle={pieceCycle}
            optionPieceCycles={optionPieceCycles}
            setOptionPieceCycles={setOptionPieceCycles}
            style={{ paddingHorizontal: 12, paddingBottom: 12 }}
          />
        );
      })}
    </View>
  );
};
