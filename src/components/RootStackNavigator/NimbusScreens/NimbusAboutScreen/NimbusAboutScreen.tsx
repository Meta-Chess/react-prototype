import React, { FC } from "react";
import { AboutScreen } from "../../AboutScreen";

export const NimbusAboutScreen: FC = () => {
  return <AboutScreen sections={["nimbus", "mchess"]} />;
};
