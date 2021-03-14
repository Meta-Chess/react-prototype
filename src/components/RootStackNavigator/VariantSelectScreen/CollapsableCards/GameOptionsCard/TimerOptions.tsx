import React from "react";
import { SFC, Text } from "primitives";
import { OptionGroup } from "ui";

const TIME_OPTIONS = [
  { label: "No timers", value: undefined, flex: 2 },
  { label: "2′", value: 120000, flex: 1 },
  { label: "3′", value: 180000, flex: 1 },
  { label: "5′", value: 300000, flex: 1 },
  { label: "10′", value: 600000, flex: 1 },
  { label: "20′", value: 1200000, flex: 1 },
];

interface Props {
  time: number | undefined;
  setTime: (x: number | undefined) => void;
}

export const TimeOptions: SFC<Props> = ({ time, setTime, style }) => {
  const options = TIME_OPTIONS.map((option) => ({
    ...option,
    label: <Text cat={"BodyS"}>{option.label}</Text>,
  }));

  return (
    <OptionGroup options={options} setSelected={setTime} selected={time} style={style} />
  );
};
