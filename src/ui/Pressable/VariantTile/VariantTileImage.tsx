import React from "react";
import { SFC } from "primitives";
import { Image, ViewStyle } from "react-native";
import { FutureVariant } from "game";
import * as VariantImages from "primitives/VariantImage";
import { VariantTileImageFrame } from "./VariantTileImageFrame";
import { DefaultVariantImageIcon } from "primitives";

interface VariantTileImageProps {
  variant: FutureVariant;
  modified: boolean;
  size: ViewStyle["width"];
}

const VariantTileImage: SFC<VariantTileImageProps> = ({
  style,
  variant,
  modified,
  size,
}) => {
  style = { width: size, height: size, ...style };
  if (variant.imageName === undefined) {
    return (
      <VariantTileImageFrame style={style} modified={modified}>
        <DefaultVariantImageIcon size={96} />
      </VariantTileImageFrame>
    );
  }

  const currentImage = VariantImages[variant.imageName];

  return (
    <VariantTileImageFrame style={style} modified={modified}>
      <Image source={currentImage} style={{ width: size, height: size }} />
    </VariantTileImageFrame>
  );
};

export { VariantTileImage };
