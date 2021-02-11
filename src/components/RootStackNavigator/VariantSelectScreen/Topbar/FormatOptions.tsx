import React from "react";
import { SFC } from "primitives";
import { TopbarOption } from "ui/Pressable";
import {
  VariantCompositionIcon,
  RandomVariantsIcon,
  RollingVariantsIcon,
} from "primitives/icons/Formats";
import { OptionGroup } from "./OptionGroup";
import { Formats, FormatType } from "../VariantSelectScreen";

interface Props {
  selectedFormat: FormatType;
  setSelectedFormat: (x: FormatType) => void;
}

const FormatIconMap: { [id: string]: React.FC } = {
  "Variant Composition": VariantCompositionIcon,
  "Random Variants": RandomVariantsIcon,
  "Rolling Variants": RollingVariantsIcon,
};

const FormatOptions: SFC<Props> = ({ selectedFormat, setSelectedFormat, style }) => {
  return (
    <OptionGroup title={"Formats"} style={style}>
      {Formats.map((format, n) => {
        const FormatIcon = FormatIconMap[format];
        return (
          <TopbarOption
            key={n}
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
