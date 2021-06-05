import React from "react";
import { SFC, Colors } from "primitives";
import { View } from "react-native";
import styled from "styled-components/native";
import { GearIcon } from "primitives/icons";

interface VariantTileImageFrameProps {
  modified: boolean;
}

const VariantTileImageFrame: SFC<VariantTileImageFrameProps> = ({
  style,
  children,
  modified,
}) => {
  return (
    <Container style={style}>
      {children}
      {modified && (
        <View style={{ position: "absolute", right: 8, bottom: 8 }}>
          <GearIcon />
        </View>
      )}
    </Container>
  );
};

const Container = styled(View)`
  align-items: center;
  justify-content: center;
  background-color: ${Colors.DARKER.toString()};
  border-radius: 4px;
`;

export { VariantTileImageFrame };
