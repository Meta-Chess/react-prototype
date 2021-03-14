import React from "react";
import { SFC, Text } from "primitives";
import { Block } from "ui/Containers/Block";
import { Rule } from "game";
import { LabelWithDetails } from "ui";
import { View } from "react-native";

interface Props {
  rules?: Rule[];
}

const RulesInfoCard: SFC<Props> = ({ rules, style }) => {
  if (!rules) return null;

  return (
    <Block style={style}>
      <Text cat="DisplayM">Rules</Text>
      <View style={{ flexWrap: "wrap", flexDirection: "row", marginTop: 8 }}>
        {rules.map((rule, index) => (
          <LabelWithDetails label={rule.title} details={rule.description} key={index} />
        ))}
      </View>
    </Block>
  );
};
export { RulesInfoCard };
