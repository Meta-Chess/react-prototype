import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC, Text, Colors } from "primitives";
interface Props {
  title?: string;
  subtitle?: string;
  outline?: boolean;
}

export const Card: SFC<Props> = ({
  title,
  subtitle,
  outline = true,
  children,
  style,
}) => {
  return (
    <Container style={style} outline={outline}>
      {title && (
        <View style={{ paddingTop: 8, paddingHorizontal: 12, paddingBottom: 12 }}>
          <Text cat={"DisplayS"}>{title}</Text>
          {subtitle && (
            <Text
              cat={"BodyXS"}
              color={Colors.TEXT.LIGHT_SECONDARY.toString()}
              style={{ marginTop: 2 }}
            >
              {subtitle}
            </Text>
          )}
        </View>
      )}
      {children}
    </Container>
  );
};

const Container = styled(View)<{ outline: boolean }>`
  width: 400px;
  background-color: ${Colors.DARKER.toString()};
  border-color: ${Colors.DARKISH.toString()};
  border-width: ${({ outline }): number => (outline ? 1 : 0)}px;
  border-radius: 4px;
`;
