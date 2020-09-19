import React, { FC, useContext } from "react";
import { Text } from "primitives";
import { Card } from "ui/Containers/Card";
import { GameContext } from "game";
import { LabelWithDetails } from "ui";
import { View } from "react-native";

const RulesInfoCard: FC = () => {
  const { gameMaster } = useContext(GameContext);
  if (!gameMaster) return null;

  return (
    <Card>
      <Text cat="DisplayL">Rules</Text>
      <View style={{ flexWrap: "wrap", flexDirection: "row", marginTop: 8 }}>
        {gameMaster.rules.map((rule, index) => (
          <LabelWithDetails label={rule.name} details={rule.description} key={index} />
        ))}
      </View>
    </Card>
  );
};
export { RulesInfoCard };
