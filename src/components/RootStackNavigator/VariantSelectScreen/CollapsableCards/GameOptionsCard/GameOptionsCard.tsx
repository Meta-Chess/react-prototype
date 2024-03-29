import React from "react";
import { View } from "react-native";
import { SFC } from "primitives";
import { LabeledCheckBox } from "ui";
import { GameOptions } from "game";
import { TimeOptions } from "components/RootStackNavigator/VariantSelectScreen/CollapsableCards/GameOptionsCard/TimerOptions";

interface Props {
  gameOptions: GameOptions;
  setGameOptions: (gameOptions: GameOptions) => void;
}

const GameOptionsCard: SFC<Props> = ({ style, gameOptions, setGameOptions }) => {
  const setOnline = (online: boolean): void =>
    setGameOptions({ ...gameOptions, online, publicGame: online });
  const setPublicGame = (publicGame: boolean): void =>
    setGameOptions({
      ...gameOptions,
      publicGame,
      online: publicGame ? true : gameOptions.online,
    });
  const setCheckEnabled = (checkEnabled: boolean): void =>
    setGameOptions({ ...gameOptions, checkEnabled });
  const setTime = (time: number | undefined): void =>
    setGameOptions({ ...gameOptions, time });

  return (
    <View style={{ ...style, flex: 1 }}>
      <TimeOptions time={gameOptions.time} setTime={setTime} />
      <LabeledCheckBox
        value={!!gameOptions.checkEnabled}
        setValue={setCheckEnabled}
        label={"Check enabled"}
        style={{ marginTop: 12 }}
      />
      <LabeledCheckBox
        value={!!gameOptions.online}
        setValue={setOnline}
        label={"Online"}
        style={{ marginTop: 12 }}
      />
      <LabeledCheckBox
        value={!!gameOptions.publicGame}
        setValue={setPublicGame}
        label={"Publicly listed on home screen"}
        style={{ marginTop: 12, marginBottom: 4 }}
      />
    </View>
  );
};

export { GameOptionsCard };
