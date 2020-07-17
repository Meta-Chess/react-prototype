import React from "react";
import { SFC } from "primitives";
import styled from "styled-components/native";
import { View } from "react-native";

const GridArrangement: SFC = ({ style, children }) => {
  const elements = React.Children.toArray(children);
  const dimension = Math.ceil(Math.sqrt(elements.length));
  const dimensionArray = Array.from(Array(dimension).keys());

  return (
    <OuterContainer style={style}>
      {dimensionArray.map((y) => (
        <RowContainer key={y}>
          {dimensionArray.map((x) => elements[x + dimension * y])}
        </RowContainer>
      ))}
    </OuterContainer>
  );
};

const OuterContainer = styled(View)`
  display: flex;
  flex-direction: column;
`;
const RowContainer = styled(View)`
  display: flex;
  flex-direction: row;
`;

export { GridArrangement };
