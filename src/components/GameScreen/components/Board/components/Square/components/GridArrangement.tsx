import React, { FC } from "react";
import styled from "styled-components";
import {View} from "react-native";

const GridArrangement: FC = ({ children }) => {
  const elements = React.Children.toArray(children);
  const dimension = Math.ceil(Math.sqrt(elements.length));
  const dimensionArray = Array.from(Array(dimension).keys());

  return (
    <OuterContainer>
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
