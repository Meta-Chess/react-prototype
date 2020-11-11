import React from "react";
import { View, ScrollView } from "react-native";
import { SFC, Colors } from "primitives";
import { VariantTile } from "./VariantTile";
import { FutureVariantName } from "game/variants";

interface Props {
  allVariants: FutureVariantName[];
  selectedVariants: React.ReactText[];
  setSelectedVariants: (x: React.ReactText[]) => void;
}

const CardGrid: SFC<Props> = ({ allVariants, selectedVariants, setSelectedVariants }) => {
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
          {allVariants.map((ekey) => {
            return (
              <VariantTile
                key={ekey}
                text={ekey}
                selected={selectedVariants.some((x) => x === ekey)}
                onPress={(): void =>
                  selectedVariants.some((x) => x === ekey)
                    ? setSelectedVariants(selectedVariants.filter((x) => x !== ekey))
                    : setSelectedVariants([...selectedVariants, ekey])
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
