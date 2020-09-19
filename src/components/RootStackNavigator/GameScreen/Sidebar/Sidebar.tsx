import React, { FC } from "react";
import { Button, SidebarContainer } from "ui";
import { useNavigation } from "navigation";
import { VariantInfoCard } from "./VariantInfoCard";
import { RulesInfoCard } from "components/RootStackNavigator/GameScreen/Sidebar/RulesInfoCard";
import { PieceCredit } from "components/RootStackNavigator/GameScreen/Sidebar/PieceCredit";

const Sidebar: FC = () => {
  const navigation = useNavigation();
  return (
    <SidebarContainer>
      <VariantInfoCard />
      <RulesInfoCard />
      <Button text="Finish Game" onPress={navigation.goBack} style={{ margin: 32 }} />
      <PieceCredit />
    </SidebarContainer>
  );
};

export { Sidebar };
