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
  const [time, setTime] = useState<number | undefined>();

  return (
    <ScreenContainer style={{ padding, width, height }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <MChessLogo
          scaleFactor={Platform.OS === "web" ? 0.8 : 0.7}
          style={{ margin: 24 }}
        />
      </View>
      <ControlsContainer>
        <View
          style={{ flex: 7, justifyContent: "flex-end", flexDirection: "column-reverse" }}
        >
          <SelectInput
            options={timeOptions}
            onChange={(value): void => {
              setTime(value);
            }}
            style={{ marginTop: 24 }}
            zIndex={5000}
          />
          <SelectInput
            options={variantOptions}
            onChange={(value): void => {
              setVariant(value);
            }}
            style={{ marginTop: 32 }}
            zIndex={4000}
          />
          <StartButton gameOptions={{ variant, time }} />
        </View>
      </ControlsContainer>
    </ScreenContainer>
  );
};

const variantNames = Object.keys(variants) as VariantName[];
const variantOptions = variantNames.map((k) => ({
  label: k,
  value: k,
}));

const timeOptions = [
  { label: "No timers", value: undefined },
  { label: "1 minute", value: 60000 },
  { label: "5 minutes", value: 300000 },
  { label: "10 minutes", value: 600000 },
  { label: "20 minutes", value: 1200000 },
  { label: "1 hour", value: 3600000 },
  { label: "3 hours", value: 7200000 },
];

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
