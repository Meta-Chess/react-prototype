import React from "react";
import { SFC } from "primitives";
import { OptionGroup } from "ui/Forms";
import { FormatName, formats } from "game/formats";
import { FormatIcon } from "components/shared";
import { keys } from "utilities";

interface Props {
  format: FormatName;
  setFormat: (x: FormatName) => void;
}

const FormatOptions: SFC<Props> = ({ format, setFormat, style }) => {
  const formatNames = keys(formats);

  const options = formatNames.map((format) => {
    return { label: <FormatIcon format={format} />, value: format };
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
