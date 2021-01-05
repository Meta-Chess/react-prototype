import React from "react";
import { SFC } from "primitives";
import { SelectInput, LabeledCheckBox, TextInput } from "ui";
import { VariantName, variants } from "game";
import styled from "styled-components/native";
import { View } from "react-native";
import { GameOptions } from "game/types";
import { CollapsableCard } from "ui/Containers";

interface Props {
  gameOptions: GameOptions;
  setGameOptions: (gameOptions: GameOptions) => void;
}

const GameOptionsCard: SFC<Props> = ({ style, gameOptions, setGameOptions }) => {
  const setRoomId = (roomId: string): void =>
    setGameOptions({
      ...gameOptions,
      roomId,
      online: roomId && !gameOptions.roomId ? true : gameOptions.online,
    });
  const setOnline = (online: boolean): void => setGameOptions({ ...gameOptions, online });
  const setOverTheBoard = (overTheBoard: boolean): void =>
    setGameOptions({ ...gameOptions, overTheBoard });
  const setFlipBoard = (flipBoard: boolean): void =>
    setGameOptions({ ...gameOptions, flipBoard });
  const setCheckEnabled = (checkEnabled: boolean): void =>
    setGameOptions({ ...gameOptions, checkEnabled });
  const setTime = (time: number): void => setGameOptions({ ...gameOptions, time });

  return (
    <CollapsableCard title={"Options"} style={style}>
      <Container>
        <TextInput
          placeholder={"Please enter an invite key"}
          onChangeText={(text: string): void => setRoomId(text)}
          style={{ width: "100%", marginVertical: 4 }}
        />
        <LabeledCheckBox
          value={!!gameOptions.online}
          setValue={setOnline}
          label={"Online"}
          style={{ marginTop: 8 }}
        />
        <LabeledCheckBox
          value={!!gameOptions.overTheBoard}
          setValue={setOverTheBoard}
          label={"Over the board"}
          style={{ marginTop: 8 }}
        />
        <LabeledCheckBox
          value={!!gameOptions.flipBoard}
          setValue={setFlipBoard}
          label={"Flip board"}
          style={{ marginTop: 8 }}
        />
        <LabeledCheckBox
          value={!!gameOptions.checkEnabled}
          setValue={setCheckEnabled}
          label={"Check enabled"}
          style={{ marginTop: 8 }}
        />
        <SelectInput
          options={timeOptions}
          onChange={(value): void => {
            setTime(value);
          }}
          style={{ marginTop: 4 }}
          zIndex={5000}
        />
      </Container>
    </CollapsableCard>
  );
};

const variantNames = Object.keys(variants) as VariantName[];

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

const Container = styled(View)`
  flex-direction: column-reverse;
  width: 90%;
  padding-left: 10%;
`;

export { GameOptionsCard, defaultGameOptions };
