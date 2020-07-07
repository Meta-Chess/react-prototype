import React, { FC } from "react";
import { Glow } from "./filters";

interface Props {
  color: string;
  active: boolean;
  size: number;
}

const Rook: FC<Props> = ({ color, active, size }) => {
  const primary = color;
  const secondary = active ? color : "#000000";
  return (
    <svg width={size} height={size} viewBox="0 0 45 45">
      <defs>
        <Glow />
      </defs>
      <g
        fill={primary}
        stroke={secondary}
        strokeWidth={0.9}
        filter={active ? "url(#glow)" : undefined}
      >
        <path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z " />
        <path d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z " />
        <path d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14" />
        <path d="M 34,14 L 31,17 L 14,17 L 11,14" />
        <path d="M 31,17 L 31,29.5 L 14,29.5 L 14,17" />
        <path d="M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5" />
        <path d="M 11,14 L 34,14" />
      </g>
    </svg>
  );
};

export { Rook };
