import React from "react";
import { SFC, Colors } from "primitives";
import { View, Image } from "react-native";
import { FutureVariant } from "game";
import * as VariantImages from "primitives/VariantImage";

interface VariantTileImageProps {
  variant: FutureVariant;
}

const VariantTileImage: SFC<VariantTileImageProps> = ({ style, variant }) => {
  const currentImage = VariantImages[variant.imageName];

  return (
    <View
      style={[
        style,
        {
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          backgroundColor: Colors.DARKER.toString(),
          borderRadius: 4,
        },
      ]}
    >
      <Image
        source={currentImage}
        style={{
          width: "80%",
          height: "80%",
        }}
      />
    </View>
  );
};

export { VariantTileImage };
