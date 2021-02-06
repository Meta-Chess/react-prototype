import React, { useState } from "react";
import { SFC } from "primitives";
import { TouchableOpacity, View } from "react-native";
import { Text, Colors } from "primitives";
import { HorizontalSeparator } from "ui/Separators";
import styled from "styled-components/native";
import { AbsoluteView } from "ui/Containers";

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
    <>
      <Container style={style}>
        <Header
          onPress={(): void => setOpen(!open)}
          includeSeperator={!open && !lastCardInStack}
        >
          <Text cat="DisplayXS" style={{ marginLeft: 12 }}>
            {title}
          </Text>
        </Header>
        {open && <Body>{children}</Body>}
      </Container>
    </>
  );
}; //headerBorder={!lastCardInStack || open}

const Container = styled(View)`
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled(TouchableOpacity)<{ includeSeperator: boolean }>`
  justify-content: center;
  height: ${({ includeSeperator }): number => (includeSeperator ? 38 : 36)}px;
  background-color: ${Colors.DARK.toString()};
  border-bottom-width: ${({ includeSeperator }): number => (includeSeperator ? 2 : 0)};
  border-bottom-color: ${Colors.DARKER.toString()};
`;

const Body = styled(View)`
  padding: 8px;
`;

export { CollapsableCard };
