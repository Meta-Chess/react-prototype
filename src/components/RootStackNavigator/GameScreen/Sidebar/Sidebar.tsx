import React, { FC, useContext, useState } from "react";
import { useWindowDimensions } from "react-native";
import { Button, SidebarContainer } from "ui";
import { useNavigation } from "navigation";
import { GameContext } from "game";
import { RoomIdCard } from "./RoomIdCard";
import { VariantInfoCard } from "./VariantInfoCard";
import { RulesInfoCard } from "./RulesInfoCard";
import { PieceCredit } from "./PieceCredit";
import { SelectedPieceInfoCard } from "./SelectedPieceInfoCard";

interface Props {
  short: boolean;
}

const Sidebar: FC<Props> = ({ short }) => {
  const navigation = useNavigation();
  const { gameMaster } = useContext(GameContext);
  const pieces = gameMaster?.selectedPieces;
  const rules = gameMaster?.rules;
  const variant = gameMaster?.variant;
  const roomId = gameMaster?.roomId;

  const { width, height } = useWindowDimensions();

  const [key, setKey] = useState(0);
  const k =
    width +
    height +
    (pieces || []).reduce((sum, p): number => sum + parseInt(p.id || "0", 36), 0); // We should maybe create a function like "hash by id" for this purpose?
  if (k !== key) {
    setKey(k);
    gameMaster?.hideModal();
  }

  return (
    <SidebarContainer>
      <RoomIdCard roomId={roomId} />
      {!short && (
        <>
          <VariantInfoCard variant={variant} />
          <RulesInfoCard rules={rules} key={key} />
          <SelectedPieceInfoCard pieces={pieces} />
        </>
      )}
      <Button
        text="Finish Game"
        onPress={(): void => {
          gameMaster?.endGame();
          navigation.goBack();
        }}
        style={{ margin: 32 }}
      />
      <PieceCredit />
    </SidebarContainer>
  );
};

export { Sidebar };
