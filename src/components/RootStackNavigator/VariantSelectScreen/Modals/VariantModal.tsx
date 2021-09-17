import React, { useState } from "react";
import { View } from "react-native";
import { SFC, Colors } from "primitives";
import { ButtonLight, ButtonSecondaryLight, Card, Divider } from "ui";
import { GameOptions } from "game";
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
  setGameOptions,
  style,
}) => {
  const ruleSettings = variantModalInfo.ruleSettings;
  const [tempParamOptions, setTempParamOptions] = useState<RuleNamesWithParams>(
    gameOptions.ruleNamesWithParams || {}
  );

  // changes keys for parameter options, so that reset refreshes all the components
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [renderKeys, _reRenderKeys] = useState(false);
  return (
    <ModalCard style={style} title={variantModalInfo.variant}>
      <Divider style={{ padding: 0 }} />
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
      <Divider>
        <ButtonSecondaryLight
          label={"Reset"}
          style={{ flex: 1 }}
          onPress={(): void => {
            {
              ruleSettings &&
                keys(ruleSettings).forEach((ruleName) => {
                  const ruleSetting: RuleSetting | undefined = ruleSettings[ruleName];
                  if (ruleSetting === undefined) return;
                  const ruleNamesWithParams = keys(ruleSetting).reduce(
                    (previousValue, paramName) =>
                      optionsChangeRuleParam({
                        ruleName: ruleName,
                        paramName: paramName,
                        tempParamOptions: previousValue,
                        paramSettings: ruleSetting[paramName],
                        paramNewValue: ruleSetting[paramName]?.defaultValue,
                      }),
                    gameOptions.ruleNamesWithParams
                  );
                  setGameOptions({ ...gameOptions, ruleNamesWithParams });
                });
            }
            setVariantModalInfo({ activated: false });
            // WARNING: something gross is going on in the reset button - if we dont close the modal, the state wont set to default when closing through done...
            // current behavior is totally convenient though so leaving it...
            // reRenderKeys(!renderKeys);
          }}
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

const ModalCard = styled(Card)`
  ${Styles.BOX_SHADOW_STRONG}
  background-color: ${Colors.DARKER.toString()};
  max-height: 400px;
`;
