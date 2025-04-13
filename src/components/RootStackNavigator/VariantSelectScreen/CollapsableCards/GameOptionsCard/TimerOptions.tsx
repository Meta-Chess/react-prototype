import React from "react";
import { SFC } from "primitives";
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
  return (
    <OptionGroup
      options={TIME_OPTIONS}
      setSelected={setTime}
      selected={time}
      style={style}
    />
  );
};
