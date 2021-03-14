import React from "react";
import { SFC, Colors } from "primitives";
import { LabelWithDetails } from "ui";

export const ChessLabel: SFC = ({ style }) => {
  return (
    <LabelWithDetails
      label={"Chess"}
      details={"No variants here!"}
      color={Colors.GREY}
      style={style}
    />
  );
};
