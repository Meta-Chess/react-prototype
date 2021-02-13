import React from "react";
import { SFC } from "primitives";
import { TopbarOption } from "ui/Pressable";
import { OptionGroup } from "./OptionGroup";
import { FormatName, formats } from "game/formats";

interface Props {
  selectedFormat: FormatName;
  setSelectedFormat: (x: FormatName) => void;
}

const FormatOptions: SFC<Props> = ({ selectedFormat, setSelectedFormat, style }) => {
  const formatNames = Object.keys(formats) as FormatName[];
  return (
    <OptionGroup title={"Formats"} style={style}>
      {formatNames.map((format) => {
        const FormatIcon = formats[format].icon;
        return (
          <TopbarOption
            key={format}
            active={format === selectedFormat}
            onPress={(): void => setSelectedFormat(format)}
          >
            {<FormatIcon />}
          </TopbarOption>
        );
      })}
    </OptionGroup>
  );
};

export { FormatOptions };
