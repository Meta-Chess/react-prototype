import React, { FC } from "react";
import { Text } from "primitives";
import { Card } from "ui/Containers/Card";
import { Rule } from "game";
import { LabelWithDetails } from "ui";
import { View } from "react-native";

interface Props {
  rules?: Rule[];
}

const RulesInfoCard: FC<Props> = ({ rules }) => {
  if (!rules) return null;

  return (
    <Card>
      <Text cat="DisplayL">Rules</Text>
      <View style={{ flexWrap: "wrap", flexDirection: "row", marginTop: 8 }}>
        {rules.map((rule, index) => (
          <LabelWithDetails label={rule.name} details={rule.description} key={index} />
        ))}
      </View>
    </Card>
  );
};
export { RulesInfoCard };
