import React, { FC } from "react";
import { Colors, Text } from "primitives";
import { View } from "react-native";
import Color from "color";
import styled from "styled-components/native";

interface Props {
  letter?: string;
  active?: boolean;
  placeholder?: boolean;
}

export const KeyCap: FC<Props> = ({
  letter,
  active,
  placeholder = !letter && !active,
}) => {
  if (placeholder) return <Container />;

  const color = active ? Colors.MCHESS_ORANGE : Colors.GREY;
  return (
    <Container color={color}>
      <Text cat={"BodyXXS"} color={color.toString()}>
        {letter}
      </Text>
    </Container>
  );
};

const Container = styled(View)<{ color?: Color }>`
  border: 1px solid ${({ color }): string => (color ? color.toString() : "transparent")};
  border-radius: 4px;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  margin: 2px;
`;
