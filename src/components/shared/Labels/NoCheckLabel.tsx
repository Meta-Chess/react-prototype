import React from "react";
import { SFC, Colors } from "primitives";
import { LabelWithDetails } from "ui";

export const NoCheckLabel: SFC = ({ style }) => {
  return (
    <LabelWithDetails
      label={"No Check"}
      details={"Check and Checkmate do not apply to this game!"}
      key={"noCheck"}
      color={Colors.GREY}
      style={style}
    />
  );
};
