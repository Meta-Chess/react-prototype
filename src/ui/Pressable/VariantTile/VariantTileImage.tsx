import React from "react";
import { SFC, Colors } from "primitives";
import { View, Image } from "react-native";
import { FutureVariant } from "game";
import * as VariantImages from "primitives/VariantImage";
import styled from "styled-components/native";

interface VariantTileImageProps {
  variant: FutureVariant;
}

const VariantTileImage: SFC<VariantTileImageProps> = ({ style, variant }) => {
  const currentImage = VariantImages[variant.imageName];

  return (
    <Container style={style}>
      <Image source={currentImage} style={{ width: "80%", height: "80%" }} />
    </Container>
  );
};

const Container = styled(View)`
  align-items: center;
  justify-content: center;
  background-color: ${Colors.DARKER.toString()};
  border-radius: 4;
`;

export { VariantTileImage };
