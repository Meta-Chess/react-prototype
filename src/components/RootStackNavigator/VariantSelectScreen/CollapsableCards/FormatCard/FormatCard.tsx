import React, { useCallback } from "react";
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

interface Props {
  gameOptions: GameOptions;
  setGameOptions: (x: GameOptions) => void;
}

const FormatCard: SFC<Props> = ({ gameOptions, setGameOptions, style }) => {
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
    <CollapsableCard
      title={formats[gameOptions.format].title}
      titleComponent={<FormatIcon format={gameOptions.format} />}
      startOpen={false}
      style={[style, { overflow: "visible" }]}
    >
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
      <Text
        color={Colors.TEXT.LIGHT_SECONDARY.toString()}
        cat="BodyXS"
        style={{ marginVertical: 6, marginLeft: 8, paddingBottom: 4 }}
      >
        {formats[gameOptions.format].description}
      </Text>
    </CollapsableCard>
  );
};

export { FormatCard };
