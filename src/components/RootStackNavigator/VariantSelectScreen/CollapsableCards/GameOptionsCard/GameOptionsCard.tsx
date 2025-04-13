import React from "react";
import { View } from "react-native";
import { SFC } from "primitives";
import { LabeledCheckBox } from "ui";
import { GameOptions, PlayerType, calculatePlayerTypes } from "game";
import { TimeOptions } from "./TimerOptions";
import { PlayerOptions } from "./PlayerOptions";

interface Props {
  gameOptions: GameOptions;
  setGameOptions: (gameOptions: GameOptions) => void;
}

const GameOptionsCard: SFC<Props> = ({ style, gameOptions, setGameOptions }) => {
  // TODO: add useCallback to these
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
  const setPlayerTypes = (playerTypes: PlayerType[]): void =>
    setGameOptions({ ...gameOptions, playerTypes });

  const setNumberOfPlayers = (numberOfPlayers: number): void => {
    const playerTypes = calculatePlayerTypes(numberOfPlayers, gameOptions.playerTypes);
    return setGameOptions({ ...gameOptions, numberOfPlayers, playerTypes });
  };

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
        style={{ marginTop: 12 }}
      />
      <PlayerOptions
        playerTypes={gameOptions.playerTypes}
        setNumberOfPlayers={setNumberOfPlayers}
        setPlayerTypes={setPlayerTypes}
        style={{ marginTop: 12, marginBottom: 4, marginLeft: 12 }}
      />
    </View>
  );
};

export { GameOptionsCard };
