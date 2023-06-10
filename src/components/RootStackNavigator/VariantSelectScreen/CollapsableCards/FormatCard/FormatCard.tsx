import React, { useCallback, useMemo } from "react";
import { View } from "react-native";
import { SFC } from "primitives";
import { GameOptions } from "game";
import { SelectInput } from "ui/Forms";
import { FormatName, formats } from "game/formats";
import { typecastKeys } from "utilities";
import { FormatIcon } from "components/shared";
import { Text, Colors } from "primitives";
import { CollapsableCard } from "ui";

interface Props {
  gameOptions: GameOptions;
  setGameOptions: (x: GameOptions) => void;
}

const FormatCard: SFC<Props> = ({ gameOptions, setGameOptions, style }) => {
  const setFormat = useCallback(
    (format: FormatName): void => setGameOptions({ ...gameOptions, format }),
    [gameOptions, setGameOptions]
  );

  const { formatOptions, currentFormatOption } = useMemo(() => {
    const formatOptions = typecastKeys(formats).flatMap((formatName) => [
      {
        label: formats[formatName].title,
        value: formatName,
      },
    ]);

    const currentFormatOption = formatOptions.find(
      (option) => option.value === gameOptions.format
    );

    return { formatOptions, currentFormatOption };
  }, [gameOptions]);

  return (
    <CollapsableCard
      title={formats[gameOptions.format].title}
      titleComponent={<FormatIcon format={gameOptions.format} />}
      startOpen={false}
      style={[style, { overflow: "visible" }]}
    >
      <View style={{ flex: 1, margin: 4, alignItems: "center" }}>
        <SelectInput
          style={{
            width: "50%",
          }}
          options={formatOptions}
          defaultOption={currentFormatOption}
          onChange={(value): void => {
            setFormat(value);
          }}
        />
      </View>
      <Text
        color={Colors.TEXT.LIGHT_SECONDARY.toString()}
        cat="BodyXS"
        style={{ margin: 4 }}
      >
        {formats[gameOptions.format].description}
      </Text>
    </CollapsableCard>
  );
};

export { FormatCard };
