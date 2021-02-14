import React from "react";
import { Row } from "ui";
import { Colors, SFC, Text } from "primitives";
import styled from "styled-components/native";
import { RollingVariantsIcon } from "primitives/icons/Formats";

interface Props {
  count?: number;
}

export const RollingVariantsCounter: SFC<Props> = ({ count }) => {
  if (!count) return null;
  return (
    <Container>
      <RollingVariantsIcon size={12} />
      <Text cat="BodyXS" style={{ marginLeft: 2 }}>
        {count}
      </Text>
    </Container>
  );
};

const Container = styled(Row)`
  border-radius: 4px;
  padding-horizontal: 4px;
  padding-vertical: 2px;
  margin-right: 8px;
  align-items: center;
  background-color: ${Colors.MCHESS_ORANGE.fade(0.6).toString()};
`;
