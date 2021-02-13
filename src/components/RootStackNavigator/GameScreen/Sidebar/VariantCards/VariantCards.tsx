import React, { useContext } from "react";
import { SFC } from "primitives";
import { View } from "react-native";
import { GameContext } from "game";
import { PieceBankCard } from "./PieceBankCard";

const VariantCards: SFC = ({ style }) => {
  const { gameMaster } = useContext(GameContext);
  if (gameMaster === undefined) return null;
  const ruleNames = gameMaster.getRuleNames();

  return (
    <View>
      {ruleNames.includes("crazyhouse") && (
        <PieceBankCard gameMaster={gameMaster} style={style} />
      )}
    </View>
  );
};

export { VariantCards };
