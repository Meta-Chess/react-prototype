import React, { FC, ReactNode } from "react";
import { Colors, Text } from "primitives";

export const B: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <Text style={{ fontWeight: "600" }} color={Colors.MCHESS_ORANGE.toString()}>
      {children}
    </Text>
  );
};
