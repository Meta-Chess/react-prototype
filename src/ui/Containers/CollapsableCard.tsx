import React, { useState } from "react";
import { SFC } from "primitives";
import { TouchableOpacity, View } from "react-native";
import { Text, Colors } from "primitives";
import styled from "styled-components/native";

interface CollapsableCardProps {
  title: string;
}

const CollapsableCard: SFC<CollapsableCardProps> = ({ title, children, style }) => {
  const [open, setOpen] = useState(true);
  return (
    <Container style={style}>
      <Header onPress={(): void => setOpen(!open)}>
        <Text cat="DisplayXS" style={{ marginLeft: 8 }}>
          {title}
        </Text>
      </Header>
      {open && <Body>{children}</Body>}
    </Container>
  );
};

const Container = styled(View)`
  flex-direction: column;
  border-radius: 4px;
  overflow: hidden;
`;

const Header = styled(TouchableOpacity)`
  justify-content: center;
  height: 32;
  background-color: ${Colors.DARKISH.toString()};
`;

const Body = styled(View)`
  padding: 8px;
  background-color: ${Colors.DARK.toString()};
`;

export { CollapsableCard };
