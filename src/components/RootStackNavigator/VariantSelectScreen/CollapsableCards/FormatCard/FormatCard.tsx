import React, { useCallback } from "react";
import { View } from "react-native";
import { SFC } from "primitives";
import { CollapsableCard } from "ui/Containers";
import { GameOptions } from "game";
import { SelectInput } from "ui/Forms";
import { Row } from "ui";
import { FormatName, formats } from "game/formats";
import { keys } from "utilities";
import { FormatIcon } from "components/shared";
import { Text, Colors } from "primitives";

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

  return (
    <CollapsableCard title={"Format"} style={[style, { overflow: "visible" }]}>
      <Row style={{ width: "100%", alignSelf: "center", marginVertical: 4 }}>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <FormatIcon format={gameOptions.format} />
        </View>
        <Row style={{ width: "50%", alignSelf: "center" }}>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <SelectInput
              style={{
                flex: 1,
                width: "100%",
              }}
              options={formatNames.flatMap((formatName) => [
                {
                  label: formats[formatName].title,
                  value: formatName,
                },
              ])}
              onChange={(value): void => {
                setFormat(value);
              }}
            />
          </View>
        </Row>
        <View style={{ flex: 1 }} />
      </Row>
      <Text
        color={Colors.TEXT.LIGHT_SECONDARY.toString()}
        cat="BodyXS"
        style={{ marginVertical: 6, marginLeft: 8 }}
      >
        {formats[gameOptions.format].description}
      </Text>
    </CollapsableCard>
  );
};

export { FormatCard };
