import React, { FC, useContext, useState } from "react";
import { Button, SidebarContainer } from "ui";
import { useNavigation } from "navigation";
import { VariantInfoCard } from "./VariantInfoCard";
import { RulesInfoCard } from "./RulesInfoCard";
import { PieceCredit } from "./PieceCredit";
import { SelectedPieceInfoCard } from "./SelectedPieceInfoCard";
import { GameContext } from "game";
import { useWindowDimensions } from "react-native";

const Sidebar: FC = () => {
  const navigation = useNavigation();
  const { gameMaster } = useContext(GameContext);
  const pieces = gameMaster?.selectedPieces;
  const rules = gameMaster?.rules;
  const variant = gameMaster?.variant;

  const { width, height } = useWindowDimensions();

  const [key, setKey] = useState(0);
  const k = (pieces || []).reduce((sum, p) => sum + p.id, 0) + width + height;
  if (k !== key) {
    setKey(k);
    gameMaster?.hideModal();
  }

  return (
    <SidebarContainer>
      <VariantInfoCard variant={variant} />
      <RulesInfoCard rules={rules} key={key} />
      <SelectedPieceInfoCard pieces={pieces} />
      <Button text="Finish Game" onPress={navigation.goBack} style={{ margin: 32 }} />
      <PieceCredit />
    </SidebarContainer>
  );
};

export { Sidebar };
