import React, { FC } from "react";
import { Button, SidebarContainer } from "ui";
import { useNavigation } from "navigation";
import { VariantInfoCard } from "./VariantInfoCard";
import { RulesInfoCard } from "./RulesInfoCard";
import { PieceCredit } from "./PieceCredit";
import { SelectedPieceInfoCard } from "./SelectedPieceInfoCard";

const Sidebar: FC = () => {
  const navigation = useNavigation();
  return (
    <SidebarContainer>
      <VariantInfoCard />
      <RulesInfoCard />
      <SelectedPieceInfoCard />
      <Button text="Finish Game" onPress={navigation.goBack} style={{ margin: 32 }} />
      <PieceCredit />
    </SidebarContainer>
  );
};

export { Sidebar };
