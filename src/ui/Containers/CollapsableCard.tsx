import React, { useState } from "react";
import { SFC } from "primitives";
import { TouchableOpacity, View } from "react-native";
import { Text, Colors } from "primitives";
import { HorizontalSeparator } from "ui/Separators";
import styled from "styled-components/native";

interface CollapsableCardProps {
  title: string;
  lastCardInStack?: boolean;
}

const CollapsableCard: SFC<CollapsableCardProps> = ({
  title,
  children,
  lastCardInStack = false,
  style,
}) => {
  const [open, setOpen] = useState(true);
  return (
    <Container style={style}>
      <Header
        onPress={(): void => setOpen(!open)}
        headerBorder={!lastCardInStack || open}
      >
        <Text cat="DisplayXS" style={{ marginLeft: 12 }}>
          {title}
        </Text>
      </Header>
      {open && <Body>{children}</Body>}
      {lastCardInStack && open && <HorizontalSeparator color={Colors.DARK.toString()} />}
    </Container>
  );
};

const Container = styled(View)`
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled(TouchableOpacity)<{ headerBorder: boolean }>`
  justify-content: center;
  height: 36px;
  border-bottom-width: ${({ headerBorder }): number => (headerBorder ? 2 : 0)}px;
  border-bottom-color: ${Colors.DARKER.toString()};
  background-color: ${Colors.DARK.toString()};
`;

const Body = styled(View)`
  padding: 8px;
`;

export { CollapsableCard };
