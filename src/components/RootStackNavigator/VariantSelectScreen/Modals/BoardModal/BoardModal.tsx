import React, { useState } from "react";
import { View } from "react-native";
import { SFC } from "primitives";
import { GameOptions } from "game";
import {
  ItemTitle,
  ItemContainer,
} from "components/RootStackNavigator/VariantSelectScreen/Modals/shared";
import { ModalProps, ModalTemplate } from "../shared";
import { BoardOptions } from "./BoardOptions";

export const BoardModal: SFC<ModalProps> = ({
  modalInfo,
  setModalInfo,
  gameOptions,
  setGameOptions,
  style,
}) => {
  const [time, setTime] = useState<number | undefined>(2);
  return (
    <ModalTemplate
      title={"Board - "}
      reset={(): void => {
        return;
      }}
      done={(): void => {
        return;
      }}
      priority={"primary"}
      style={style}
    >
      <View style={{ flex: 1 }}>
        <ItemContainer style={{ flexDirection: "column" }}>
          <ItemTitle itemTitle={"Board"} />
          <ItemTitle itemTitle={"Player"} />
        </ItemContainer>
      </View>
    </ModalTemplate>
  );
};

const boardTypes = ["standard", "hex", "long"];
