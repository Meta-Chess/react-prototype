import React from "react";
import { SFC } from "primitives";
import { SelectInput, LabeledCheckBox, TextInput } from "ui";
import { VariantName, variants } from "game";
import styled from "styled-components/native";
import { View } from "react-native";
import { GameOptions } from "game/types";

interface Props {
  gameOptions: GameOptions;
  setGameOptions: (gameOptions: GameOptions) => void;
}

const GameOptionControls: SFC<Props> = ({ style, gameOptions, setGameOptions }) => {
  const setRoomId = (roomId: string): void => setGameOptions({ ...gameOptions, roomId });
  const setOnline = (online: boolean): void => setGameOptions({ ...gameOptions, online });
  const setOverTheBoard = (overTheBoard: boolean): void =>
    setGameOptions({ ...gameOptions, overTheBoard });
  const setFlipBoard = (flipBoard: boolean): void =>
    setGameOptions({ ...gameOptions, flipBoard });
  const setFatigueEnabled = (fatigueEnabled: boolean): void =>
    setGameOptions({ ...gameOptions, fatigueEnabled });
  const setAtomicEnabled = (atomicEnabled: boolean): void =>
    setGameOptions({ ...gameOptions, atomicEnabled });
  const setCheckEnabled = (checkEnabled: boolean): void =>
    setGameOptions({ ...gameOptions, checkEnabled });
  const setTime = (time: number): void => setGameOptions({ ...gameOptions, time });
  const setVariant = (variant: VariantName): void =>
    setGameOptions({ ...gameOptions, variant });

  return (
    <ControlsContainer style={style}>
      <TextInput
        placeholder={"Please enter an invite key"}
        onChangeText={(text: string): void => setRoomId(text)}
        style={{ marginTop: 24 }}
      />
      <LabeledCheckBox
        value={!!gameOptions.online}
        setValue={setOnline}
        label={"Online"}
        style={{ marginTop: 24 }}
      />
      <LabeledCheckBox
        value={!!gameOptions.overTheBoard}
        setValue={setOverTheBoard}
        label={"Over the board"}
        style={{ marginTop: 24 }}
      />
      <LabeledCheckBox
        value={!!gameOptions.flipBoard}
        setValue={setFlipBoard}
        label={"Flip board"}
        style={{ marginTop: 24 }}
      />
      <LabeledCheckBox
        value={!!gameOptions.fatigueEnabled}
        setValue={setFatigueEnabled}
        label={"Fatigue on move"}
        style={{ marginTop: 24 }}
      />
      <LabeledCheckBox
        value={!!gameOptions.atomicEnabled}
        setValue={setAtomicEnabled}
        label={"Atomic enabled"}
        style={{ marginTop: 24 }}
      />
      <LabeledCheckBox
        value={!!gameOptions.checkEnabled}
        setValue={setCheckEnabled}
        label={"Check enabled"}
        style={{ marginTop: 24 }}
      />
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
    </ControlsContainer>
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
  // { label: "5 minutes", value: 300000 },
  { label: "10 minutes", value: 600000 },
  // { label: "20 minutes", value: 1200000 },
  { label: "1 hour", value: 3600000 },
  // { label: "3 hours", value: 7200000 },
];

const defaultGameOptions = {
  variant: variantNames[0] as VariantName,
  time: undefined,
  checkEnabled: true,
  fatigueEnabled: false,
  atomicEnabled: false,
  flipBoard: false,
  overTheBoard: false,
  online: false,
};

const ControlsContainer = styled(View)`
  flex-direction: column-reverse;
  max-width: 240px;
`;

export { GameOptionControls, defaultGameOptions };
