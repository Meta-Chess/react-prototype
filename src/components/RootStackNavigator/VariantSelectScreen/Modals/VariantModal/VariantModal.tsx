import React, { useState } from "react";
import { View } from "react-native";
import { SFC } from "primitives";
import { RuleSetting, RuleNamesWithParams } from "game/CompactRules";
import { optionsChangeRuleParam } from "game/variantAndRuleProcessing";
import { keys } from "utilities";
import { ModalProps, ModalTemplate } from "../shared";
import { ParamOptions } from "./ParamOptions";

export const VariantModal: SFC<ModalProps> = ({
  modalInfo,
  setModalInfo,
  gameOptions,
  setGameOptions,
  style,
}) => {
  const ruleSettings = modalInfo.ruleSettings;
  const [tempParamOptions, setTempParamOptions] = useState<RuleNamesWithParams>(
    gameOptions.ruleNamesWithParams || {}
  );

  // changes keys for parameter options, so that reset refreshes all the components
  const [renderKeys, reRenderKeys] = useState(false);

  const reset = (): void => {
    {
      ruleSettings &&
        keys(ruleSettings).forEach((ruleName) => {
          const ruleSetting: RuleSetting | undefined = ruleSettings[ruleName];
          if (ruleSetting === undefined) return;
          return keys(ruleSetting).forEach((paramName) => {
            setGameOptions({
              ...gameOptions,
              ruleNamesWithParams: optionsChangeRuleParam({
                ruleName: ruleName,
                paramName: paramName,
                tempParamOptions: gameOptions.ruleNamesWithParams,
                paramSettings: ruleSetting[paramName],
                paramNewValue: ruleSetting[paramName]?.defaultValue,
              }),
            });
          });
        });
    }
    reRenderKeys(!renderKeys);
  };

  const done = (): void => {
    setGameOptions({ ...gameOptions, ruleNamesWithParams: tempParamOptions });
    setModalInfo({ type: undefined });
  };

  return (
    <ModalTemplate
      title={modalInfo.variant || ""}
      reset={reset}
      done={done}
      style={style}
    >
      <View style={{ flex: 1 }}>
        {ruleSettings &&
          keys(ruleSettings).flatMap((ruleName) => {
            const ruleSetting: RuleSetting | undefined = ruleSettings[ruleName];
            if (ruleSetting === undefined) return;
            return keys(ruleSetting).map((paramName) => {
              // if value not in game options, go with settings default
              const paramDefaultValue =
                gameOptions.ruleNamesWithParams?.[ruleName]?.[paramName] ||
                ruleSetting[paramName]?.defaultValue;
              return (
                <ParamOptions
                  key={ruleName + paramName + renderKeys}
                  ruleName={ruleName}
                  paramName={paramName}
                  paramSettings={ruleSetting[paramName]}
                  paramDefault={paramDefaultValue}
                  tempParamOptions={tempParamOptions}
                  setTempParamOptions={setTempParamOptions}
                />
              );
            });
          })}
      </View>
    </ModalTemplate>
  );
};
