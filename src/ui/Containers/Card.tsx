import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC, Text, Colors } from "primitives";
interface Props {
  title?: string;
  subtitle?: string;
}

export const Card: SFC<Props> = ({ title, subtitle, children, style }) => {
  return (
    <Container style={style}>
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

const Container = styled(View)`
  width: 400px;
  max-width: 100%;
  background-color: ${Colors.DARKER.toString()};
  border-color: ${Colors.DARKISH.toString()};
  border-width: 1px;
  border-radius: 4px;
`;
