import React, { useState } from "react";
import { ScrollView } from "react-native";
import { SFC, Colors } from "primitives";
import { ButtonLight, ButtonSecondaryLight, Card, Divider } from "ui";
import { GameOptions, RuleName } from "game";
import { Styles } from "primitives/Styles";
import styled from "styled-components/native";
import {
  RuleNamesWithParamSettings,
  RuleSetting,
  RuleNamesWithParams,
} from "game/CompactRules";
import { ParamOptions } from "./ParamOptions";
import { optionsChangeRuleParam } from "game/variantAndRuleProcessing";
import { keys } from "utilities";
export interface VariantModalInfo {
  activated: boolean;
  variant?: string;
  ruleSettings?: RuleNamesWithParamSettings;
}

interface Props {
  variantModalInfo: VariantModalInfo;
  setVariantModalInfo: (VariantModalInfo: VariantModalInfo) => void;
  gameOptions: GameOptions;
  setGameOptions: (gameOptions: GameOptions) => void;
}

export const VariantModal: SFC<Props> = ({
  variantModalInfo,
  setVariantModalInfo,
  gameOptions,
  setGameOptions: _setGameOptions,
  style,
}) => {
  const ruleSettings = variantModalInfo.ruleSettings;
  const [tempParamOptions, setTempParamOptions] = useState<
    RuleNamesWithParams | undefined
  >(gameOptions.ruleNamesWithParams || {});

  const [renderKeys, rerenderKeys] = useState(false);
  const rerender = (): void => rerenderKeys(!renderKeys);

  const setGameOptions = (gameOptions: GameOptions): void => {
    _setGameOptions(gameOptions);
    setTempParamOptions(gameOptions.ruleNamesWithParams);
    rerender();
  };

  return (
    <ModalCard style={style} title={variantModalInfo.variant}>
      <Divider style={{ padding: 0 }} />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
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
      </ScrollView>
      <Divider>
        <ButtonSecondaryLight
          label={"Reset"}
          style={{ flex: 1 }}
          onPress={resetRuleSettings(gameOptions, setGameOptions, ruleSettings)}
        />
        <ButtonLight
          label={"Done"}
          style={{ flex: 1, marginLeft: 8 }}
          onPress={(): void => {
            setGameOptions({ ...gameOptions, ruleNamesWithParams: tempParamOptions });
            setVariantModalInfo({ activated: false });
          }}
        />
      </Divider>
    </ModalCard>
  );
};

const resetRuleSettings =
  (
    gameOptions: GameOptions,
    setGameOptions: (gameOptions: GameOptions) => void,
    ruleSettings?: RuleNamesWithParamSettings
  ) =>
  (): void => {
    if (!ruleSettings) return;

    const ruleNamesWithParams = buildDefaultRuleNamesWithParams(
      ruleSettings,
      gameOptions.ruleNamesWithParams
    );

    setGameOptions({ ...gameOptions, ruleNamesWithParams });
  };

const buildDefaultRuleNamesWithParams = (
  ruleSettings: RuleNamesWithParamSettings,
  gameRuleNamesWithParams: RuleNamesWithParams = {}
): RuleNamesWithParams =>
  keys(ruleSettings)
    .filter((ruleName) => ruleSettings[ruleName])
    .reduce(buildDefaultRuleNamesWithParamForRule(ruleSettings), gameRuleNamesWithParams);

const buildDefaultRuleNamesWithParamForRule =
  (ruleSettings: RuleNamesWithParamSettings) =>
  (
    ruleNameWithParamsPerRuleName: RuleNamesWithParams,
    ruleName: RuleName
  ): RuleNamesWithParams =>
    keys(ruleSettings[ruleName]).reduce(
      (ruleNameWithParamsPerParam, paramName) =>
        optionsChangeRuleParam({
          ruleName,
          paramName,
          tempParamOptions: ruleNameWithParamsPerParam,
          paramSettings: ruleSettings[ruleName]?.[paramName],
          paramNewValue: ruleSettings[ruleName]?.[paramName]?.defaultValue,
        }),
      ruleNameWithParamsPerRuleName
    );

const ModalCard = styled(Card)`
  ${Styles.BOX_SHADOW_STRONG}
  background-color: ${Colors.DARKER.toString()};
  max-height: 400px;
`;
