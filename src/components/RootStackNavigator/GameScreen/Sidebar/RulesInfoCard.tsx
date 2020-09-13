import React, { FC, useContext } from "react";
import { Colors, Text } from "primitives";
import { Card } from "ui/Card";
import { GameContext } from "game";

const RulesInfoCard: FC = () => {
  const { gameMaster } = useContext(GameContext);
  if (!gameMaster) return null;

  return (
    <Card>
      <Text cat="DisplayL">Rules</Text>
      {gameMaster.rules.map((rule, index) => (
        <Text cat="BodyL" style={{ marginTop: 8 }} key={index}>
          <Text cat="BodyL" weight="heavy" color={Colors.EMPHATIC.LIGHT.toString()}>
            {rule.name}
          </Text>
          {" - "}
          {rule.description}
        </Text>
      ))}
    </Card>
  );
};
export { RulesInfoCard };
