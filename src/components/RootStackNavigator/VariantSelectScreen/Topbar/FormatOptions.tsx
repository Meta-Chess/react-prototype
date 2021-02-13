import React from "react";
import { SFC } from "primitives";
import { OptionGroup } from "ui/Forms";
import { FormatName, formats } from "game/formats";

interface Props {
  selectedFormat: FormatName;
  setSelectedFormat: (x: FormatName) => void;
}

const FormatOptions: SFC<Props> = ({ selectedFormat, setSelectedFormat, style }) => {
  const formatNames = Object.keys(formats) as FormatName[];

  const options = formatNames.map((format) => {
    const FormatIcon = formats[format].icon;
    return { label: <FormatIcon />, value: format };
  });

  return (
    <OptionGroup
      options={options}
      setSelected={setSelectedFormat}
      selected={selectedFormat}
      style={style}
      title={"Formats"}
    />
  );
};

export { FormatOptions };
