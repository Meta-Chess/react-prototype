import React, { useState, ReactNode } from "react";
import { SFC } from "primitives";
import { TouchableOpacity, View } from "react-native";
import { Text, Colors } from "primitives";
import styled from "styled-components/native";
import { PlusIcon, MinusIcon } from "primitives/icons";

interface CollapsableCardProps {
  title: string;
  titleComponent?: ReactNode;
}

const CollapsableCard: SFC<CollapsableCardProps> = ({
  title,
  titleComponent,
  children,
  style,
}) => {
  const [open, setOpen] = useState(true);
  const plusMinusColor = Colors.DARKISH.toString();
  return (
    <Container style={style}>
      <Header onPress={(): void => setOpen(!open)} includeSeperator={!open}>
        <LeftHeaderContainer>
          <Text cat="DisplayXS">{title}</Text>
          {titleComponent && <View style={{ marginLeft: 6 }}>{titleComponent}</View>}
        </LeftHeaderContainer>
        <View style={{ marginRight: 6 }}>
          {open ? (
            <MinusIcon color={plusMinusColor} />
          ) : (
            <PlusIcon color={plusMinusColor} />
          )}
        </View>
      </Header>
      {open && <Body>{children}</Body>}
    </Container>
  );
};

const Container = styled(View)`
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled(TouchableOpacity)<{ includeSeperator: boolean }>`
  flex-direction: row;
  align-items: center;
  height: ${({ includeSeperator }): number => (includeSeperator ? 38 : 36)}px;
  background-color: ${Colors.DARK.toString()};
  border-bottom-width: ${({ includeSeperator }): number => (includeSeperator ? 2 : 0)};
  border-bottom-color: ${Colors.DARKER.toString()};
`;

const LeftHeaderContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-left: 12px;
`;

const Body = styled(View)`
  padding: 8px;
`;

export { CollapsableCard };
