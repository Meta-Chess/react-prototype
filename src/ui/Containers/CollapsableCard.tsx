import React, { useState, ReactNode } from "react";
import { SFC } from "primitives";
import { TouchableOpacity, View } from "react-native";
import { Text, Colors } from "primitives";
import styled from "styled-components/native";
import { PlusIcon, MinusIcon } from "primitives/icons";

interface CollapsableCardProps {
  title: string;
  titleComponent?: ReactNode;
  endComponent?: ReactNode;
  defaultState?: boolean;
  collapsable?: boolean;
}

const CollapsableCard: SFC<CollapsableCardProps> = ({
  title,
  titleComponent,
  endComponent,
  defaultState = true,
  collapsable = true,
  children,
  style,
}) => {
  const [open, setOpen] = useState(defaultState);
  const plusMinusColor = Colors.DARKISH.toString();
  return (
    <Container style={style}>
      <Header
        onPress={(): void => {
          if (collapsable) {
            setOpen(!open);
          }
        }}
        includeSeperator={!open}
        disabled={!collapsable}
      >
        <LeftHeaderContainer>
          <Text cat="DisplayXS">{title}</Text>
          {titleComponent && <View style={{ marginLeft: 6 }}>{titleComponent}</View>}
        </LeftHeaderContainer>
        <View style={{ marginRight: 6 }}>
          {endComponent && <View>{endComponent}</View>}
          {collapsable && (
            <>
              {open ? (
                <MinusIcon color={plusMinusColor} />
              ) : (
                <PlusIcon color={plusMinusColor} />
              )}
            </>
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
  height: ${({ includeSeperator }): number => (includeSeperator ? 42 : 40)}px;
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
