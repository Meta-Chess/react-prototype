import React, { useState, useMemo, useCallback } from "react";
import { View } from "react-native";
import { SFC } from "primitives";
import { GameOptions } from "game";
import { SelectInput } from "ui/Forms";
import { Row } from "ui";
import { FormatName, formats } from "game/formats";
import { keys } from "utilities";
import { FormatIcon } from "components/shared";
import { Text, Colors } from "primitives";
import { CollapsableCard } from "ui";
import styled from "styled-components/native";
import { SimpleGameProvider } from "components/shared";
import { ShadowBoard } from "components/RootStackNavigator/StartScreen/ShadowBoard";
import { GameMaster } from "game";
import { calculateGameOptions } from "game/variantAndRuleProcessing/calculateGameOptions";
import { futureVariants } from "game/variants";

interface Props {
  gameOptions: GameOptions;
  setGameOptions: (x: GameOptions) => void;
}

const BoardCard: SFC<Props> = ({ gameOptions, setGameOptions, style }) => {
  const [renderDependentMenu, setRenderDependentMenu] = useState(true);
  const reRenderDependentMenu = (): void => {
    setRenderDependentMenu(!renderDependentMenu);
  };

  const displayGameMaster = useMemo(
    () => getDisplayGameMaster(boardVariant, gameOptions.numberOfPlayers),
    [boardVariant, gameOptions.numberOfPlayers]
  );

  const playerOptions = useMemo(() => {
    return dropdownPlayerOptions(boardVariants[boardVariant].allowedPlayers);
  }, [boardVariant]);

  const setNumberOfPlayers = useCallback(
    (numberOfPlayers: number): void =>
      setGameOptions({ ...gameOptions, numberOfPlayers }),
    [gameOptions, setGameOptions]
  );

  const formatNames = keys(formats);

  const setFormat = useCallback(
    (format: FormatName): void => setGameOptions({ ...gameOptions, format }),
    [gameOptions, setGameOptions]
  );

  const formatOptions = formatNames.flatMap((formatName) => [
    {
      label: formats[formatName].title,
      value: formatName,
    },
  ]);
  const defaultFormatOption = formatOptions.find(
    (option) => option.value === gameOptions.format
  );

  return (
    <CollapsableCard title={"Board"} style={[style, { overflow: "visible" }]}>
      <Row style={{ width: "50%" }}>
        <View style={{ flex: 1, marginLeft: 8, marginVertical: 4 }}>
          <SelectInput
            style={{
              flex: 1,
              width: "100%",
            }}
            options={formatOptions}
            defaultValue={defaultFormatOption}
            onChange={(value): void => {
              setFormat(value);
            }}
          />
        </View>
      </Row>
    </CollapsableCard>
  );
};

export { BoardCard };

/*

      <Text
        color={Colors.TEXT.LIGHT_SECONDARY.toString()}
        cat="BodyXS"
        style={{ marginVertical: 6, marginLeft: 8, paddingBottom: 4 }}
      >
        {formats[gameOptions.format].description}
      </Text>
*/
