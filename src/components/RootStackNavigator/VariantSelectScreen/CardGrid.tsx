import React from "react";
import { View, ScrollView } from "react-native";
import { SFC, Colors } from "primitives";
import { VariantTileButton } from "ui/Buttons/VariantTileButton";
import { FutureVariantName, futureVariants } from "game/variants";
interface Props {
  displayVariants: FutureVariantName[];
  selectedVariants: FutureVariantName[];
  setSelectedVariants: (x: FutureVariantName[]) => void;
  variantClash: boolean;
}

const CardGrid: SFC<Props> = ({
  displayVariants,
  selectedVariants,
  setSelectedVariants,
  variantClash,
}) => {
  return (
    <View
      style={{
        height: "72%",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginHorizontal: 12,
        marginTop: 36,
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          maxHeight: "100%",
          maxWidth: "100%",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "row",
            flexWrap: "wrap",
            alignContent: "flex-start",
            marginVertical: -1,
          }}
        >
          {displayVariants.map((variant) => {
            return (
              <VariantTileButton
                key={variant}
                variant={futureVariants[variant]}
                selected={selectedVariants.some((x) => x === variant)}
                clash={variantClash}
                onPress={(): void =>
                  selectedVariants.some((x) => x === variant)
                    ? setSelectedVariants(selectedVariants.filter((x) => x !== variant))
                    : setSelectedVariants([...selectedVariants, variant])
                }
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  alignContent: "flex-start",
                  shadowColor: Colors.BLACK.toString(),
                  shadowRadius: 4,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                }}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export { CardGrid };
