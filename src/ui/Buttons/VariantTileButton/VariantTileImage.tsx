import React from "react";
import { SFC, Colors } from "primitives";
import { View, Image } from "react-native";
import { FutureVariant } from "game";
import * as VariantImages from "primitives/VariantImage";

interface VariantTileImageProps {
  variant: FutureVariant;
}

const VariantTileImage: SFC<VariantTileImageProps> = ({ variant }) => {
  const currentImage = VariantImages[variant.imageName];
  return (
    <View
      style={{
        width: 136,
        height: 136,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.DARK.toString(),
      }}
    >
      <View
        style={{
          width: 120,
          height: 120,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
          backgroundColor: Colors.DARKER.toString(),
        }}
      >
        <Image
          source={currentImage}
          style={{
            width: "80%",
            height: "80%",
          }}
        />
      </View>
    </View>
  );
};

export { VariantTileImage };
