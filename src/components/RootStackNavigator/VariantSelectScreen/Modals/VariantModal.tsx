import React, { useState } from "react";
import { View } from "react-native";
import { SFC, Colors } from "primitives";
import { ButtonLight, ButtonSecondaryLight, Card, Footer } from "ui";
import { GameOptions } from "game";
import { Styles } from "primitives/Styles";
import styled from "styled-components/native";
import { RuleName } from "game";
import { RuleNamesWithParamSettings, RuleSetting, ParamName } from "game/rules";
import { ParamOptions } from "./ParamOptions";
import { gameOptionsChangeRuleParam } from "game/variantAndRuleProcessing";

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
  // changes keys for parameter options, so that reset refreshes all the components
  const [renderKeys, reRenderKeys] = useState(false);
  return (
    <ModalCard style={style} title={variantModalInfo.variant}>
      <Footer style={{ padding: 0 }} />
      <View style={{ flex: 1 }}>
        {ruleSettings &&
          Object.keys(ruleSettings).flatMap((ruleName) => {
            const ruleSetting: RuleSetting | undefined =
              ruleSettings[ruleName as RuleName];
            if (ruleSetting === undefined) return;
            return Object.keys(ruleSetting).map((paramName) => {
              return (
                <ParamOptions
                  key={ruleName + paramName + renderKeys}
                  ruleName={ruleName as RuleName}
                  paramName={paramName as ParamName}
                  paramSettings={ruleSetting[paramName as ParamName]}
                  gameOptions={gameOptions}
                  setGameOptions={setGameOptions}
                />
              );
            });
          })}
      </View>
      <Footer>
        <ButtonSecondaryLight
          label={"Reset"}
          style={{ flex: 1 }}
          onPress={(): void => {
            {
              ruleSettings &&
                Object.keys(ruleSettings).forEach((ruleName) => {
                  const ruleSetting: RuleSetting | undefined =
                    ruleSettings[ruleName as RuleName];
                  if (ruleSetting === undefined) return;
                  return Object.keys(ruleSetting).forEach((paramName) => {
                    gameOptionsChangeRuleParam({
                      ruleName: ruleName as RuleName,
                      paramName: paramName as ParamName,
                      gameOptions: gameOptions,
                      paramSettings: ruleSetting[paramName as ParamName],
                      paramNewValue: (ruleSetting[paramName as ParamName] || {})
                        .defaultValue,
                    });
                  });
                });
            }
            reRenderKeys(!renderKeys);
          }}
        />
        <ButtonLight
          label={"Done"}
          style={{ flex: 1, marginLeft: 8 }}
          onPress={(): void => {
            setVariantModalInfo({ activated: false });
          }}
        />
      </Footer>
    </ModalCard>
  );
};

const ModalCard = styled(Card)`
  ${Styles.BOX_SHADOW_STRONG}
  background-color: ${Colors.DARKER.toString()};
  max-height: 400px;
`;
