import React from "react";
import { SFC } from "primitives";
import { OptionGroup } from "ui/Forms";
import { FormatName, formats } from "game/formats";

interface Props {
  format: FormatName;
  setFormat: (x: FormatName) => void;
}

const FormatOptions: SFC<Props> = ({ format, setFormat, style }) => {
  const formatNames = Object.keys(formats) as FormatName[];

  const options = formatNames.map((format) => {
    const FormatIcon = formats[format].icon;
    return { label: <FormatIcon />, value: format };
  });

  return (
    <OptionGroup
      options={options}
      setSelected={setFormat}
      selected={format}
      style={style}
      title={"Formats"}
    />
  );
};

export { FormatOptions };
