import React, { FC, useState } from "react";
import { View, useWindowDimensions, Platform } from "react-native";
import styled from "styled-components/native";
import { Colors, MChessLogo } from "primitives";
import { SelectInput } from "ui";
import { VariantName, variants } from "game";
import { StartButton } from "./StartButton";

const StartScreen: FC = () => {
  const padding = 12;
  const { width, height } = useWindowDimensions();

  const [variant, setVariant] = useState<VariantName>(variantNames[0]);

  return (
    <ScreenContainer style={{ padding, width, height }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <MChessLogo
          scaleFactor={Platform.OS === "web" ? 0.8 : 0.7}
          style={{ margin: 24 }}
        />
      </View>
      <ControlsContainer>
        <View style={{ flex: 7, justifyContent: "flex-start" }}>
          <StartButton variant={variant} />
          <SelectInput
            options={options}
            onChange={(value): void => {
              setVariant(value);
            }}
            style={{ marginTop: 32 }}
          />
        </View>
      </ControlsContainer>
    </ScreenContainer>
  );
};

const variantNames = Object.keys(variants) as VariantName[];
const options = variantNames.map((k) => ({
  label: k,
  value: k,
}));

const ScreenContainer = styled(View)`
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 300px;
  background-color: ${Colors.DARKEST.string()};
  align-items: center;
`;

const ControlsContainer = styled(View)`
  flex: 1;
  justify-content: center;
`;

export { StartScreen };
