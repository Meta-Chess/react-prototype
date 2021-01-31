import React from "react";
import { SFC } from "primitives";
import { View } from "react-native";
import { GameMaster } from "game";
import { PieceBankCard } from "./PieceBankCard";
import { Rule } from "game/rules";

interface Props {
  gameMaster: GameMaster | undefined;
  rules: Rule[] | undefined;
}

//todo: generalize for non crazyhouse variants (probably use a map)
//other variants may want a piece bank as well
const VariantCards: SFC<Props> = ({ gameMaster, rules, style }) => {
  if (gameMaster === undefined || rules === undefined) return null;
  const ruleTitles = rules.map((rule) => rule.title);

  return (
    <View>
      {ruleTitles.includes("Crazyhouse") && (
        <PieceBankCard gameMaster={gameMaster} style={style} />
      )}
    </View>
  );
};

export { VariantCards };
