import React from "react";
import styled from "styled-components/native";
import { SFC, Text } from "primitives";
import { Player } from "game/types";
import { Row } from "ui";
import { Timer } from "./Timer";

interface Props {
  player: Player;
}

export const PlayerRow: SFC<Props> = ({ style, player }) => {
  return (
    <StyledRow style={style}>
      <Text cat={"BodyM"}>{"PlayerName"}</Text>
      <Timer player={player} />
    </StyledRow>
  );
};

const StyledRow = styled(Row)`
  justify-content: space-between;
  padding-vertical: 8px;
`;
