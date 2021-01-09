import React from "react";
import { SFC } from "primitives";
import { TouchableOpacity, View } from "react-native";
import { Text, Colors } from "primitives";
import styled from "styled-components/native";
import { FutureVariantName, futureVariants } from "game/variants";
import { CollapsableCard } from "ui/Containers";

interface Props {
  selectedVariants: FutureVariantName[];
  setSelectedVariants: (x: FutureVariantName[]) => void;
}

const SelectedVariantsCard: SFC<Props> = ({
  selectedVariants,
  setSelectedVariants,
  style,
}) => {
  return (
    <CollapsableCard title={"Selected Variants"} style={style}>
      {selectedVariants.length !== 0 ? (
        <Container>
          {selectedVariants.map((variant) => {
            return (
              <TouchableOpacity
                key={variant}
                onPress={(): void =>
                  selectedVariants.includes(variant)
                    ? setSelectedVariants(selectedVariants.filter((x) => x !== variant))
                    : setSelectedVariants([...selectedVariants, variant])
                }
                style={{
                  paddingHorizontal: 4,
                  paddingVertical: 2,
                  backgroundColor: Colors.DARKISH.toString(),
                  borderRadius: 2,
                  margin: 4,
                }}
              >
                <Text cat="BodyXS">{futureVariants[variant].title}</Text>
              </TouchableOpacity>
            );
          })}
        </Container>
      ) : (
        <Text cat="BodyXS" style={{ fontStyle: "italic" }}>
          {"No variant selected"}
        </Text>
      )}
    </CollapsableCard>
  );
};

const Container = styled(View)`
  flex-flow: row wrap;
`;

export { SelectedVariantsCard };
