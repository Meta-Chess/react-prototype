import React from "react";
import { SFC } from "primitives";
import { SelectInput, LabeledCheckBox, DebouncedTextInput } from "ui";
import { VariantName, variants, GameOptions } from "game";
import styled from "styled-components/native";
import { View } from "react-native";

interface Props {
  gameOptions: GameOptions;
  setGameOptions: (gameOptions: GameOptions) => GameOptions;
  onSubmit: (gameOptions: GameOptions) => void;
}

const GameOptionControls: SFC<Props> = ({
  style,
  gameOptions,
  setGameOptions,
  onSubmit,
}) => {
  const setRoomId = (roomId: string): GameOptions =>
    setGameOptions({
      ...gameOptions,
      roomId,
      online: roomId && !gameOptions.roomId ? true : gameOptions.online,
    });
  const setOnline = (online: boolean): GameOptions =>
    setGameOptions({ ...gameOptions, online });
  const setOverTheBoard = (overTheBoard: boolean): GameOptions =>
    setGameOptions({ ...gameOptions, overTheBoard });
  const setFlipBoard = (flipBoard: boolean): GameOptions =>
    setGameOptions({ ...gameOptions, flipBoard });
  const setCheckEnabled = (checkEnabled: boolean): GameOptions =>
    setGameOptions({ ...gameOptions, checkEnabled });
  const setFatigueEnabled = (fatigueEnabled: boolean): GameOptions =>
    setGameOptions({ ...gameOptions, fatigueEnabled });
  const setAtomicEnabled = (atomicEnabled: boolean): GameOptions =>
    setGameOptions({ ...gameOptions, atomicEnabled });
  const setTime = (time: number): GameOptions => setGameOptions({ ...gameOptions, time });
  const setVariant = (variant: VariantName): GameOptions =>
    setGameOptions({ ...gameOptions, variant });

  return (
    <ControlsContainer style={style}>
      <DebouncedTextInput
        placeholder={"Please enter an invite key"}
        afterChangeText={setRoomId}
        style={{ marginBottom: 4, marginTop: 20 }}
        onSubmitEditing={(roomId): void => onSubmit(setRoomId(roomId))}
      />
      <LabeledCheckBox
        value={!!gameOptions.online}
        setValue={setOnline}
        label={"Online"}
        style={{ marginTop: 16 }}
      />
      <LabeledCheckBox
        value={!!gameOptions.overTheBoard}
        setValue={setOverTheBoard}
        label={"Over the board"}
        style={{ marginTop: 16 }}
      />
      <LabeledCheckBox
        value={!!gameOptions.flipBoard}
        setValue={setFlipBoard}
        label={"Flip board"}
        style={{ marginTop: 16 }}
      />
      <LabeledCheckBox
        value={!!gameOptions.checkEnabled}
        setValue={setCheckEnabled}
        label={"Check enabled"}
        style={{ marginTop: 16 }}
      />
      <LabeledCheckBox
        value={!!gameOptions.fatigueEnabled}
        setValue={setFatigueEnabled}
        label={"Fatigue enabled"}
        style={{ marginTop: 16 }}
      />
      <LabeledCheckBox
        value={!!gameOptions.atomicEnabled}
        setValue={setAtomicEnabled}
        label={"Atomic enabled"}
        style={{ marginTop: 20 }}
      />
      <SelectInput
        options={timeOptions}
        onChange={setTime}
        style={{ marginTop: 20 }}
        zIndex={5000}
      />
      <SelectInput //note: windows scrollbar is gross
        options={variantOptions}
        onChange={setVariant}
        zIndex={4000}
      />
    </ControlsContainer>
  );
};

const variantNames = Object.keys(variants) as VariantName[];
const variantOptions = variantNames.map((k) => ({
  label: variants[k].title,
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
  checkEnabled: true,
};

const ControlsContainer = styled(View)`
  flex-direction: column-reverse;
  width: 300px;
`;

export { GameOptionControls, defaultGameOptions };
