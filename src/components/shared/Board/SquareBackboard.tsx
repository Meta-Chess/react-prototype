import React from "react";
import styled from "styled-components/native";
import { SFC, Colors } from "primitives";
import { AbsoluteView } from "ui";
import { Styles } from "primitives/Styles";

interface SquareBackboardProps {
  color?: string;
}

const SquareBackboard: SFC<SquareBackboardProps> = ({
  color = Colors.DARK.fade(0.8).toString(), //MCHESS_BLUE almost looks good faded
}) => {
  return <Container color={color} />;
};

const Container = styled(AbsoluteView)<{
  color: string;
}>`
  background-color: ${({ color }): string => color};
  ${Styles.BOX_SHADOW_STRONG}
`;

export { SquareBackboard };
