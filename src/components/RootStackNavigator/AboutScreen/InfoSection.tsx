import React, { ReactElement } from "react";
import { MchessSection } from "./MchessSection";
import { NimbusSection } from "../NimbusScreens/NimbusAboutScreen/NimbusSection";

export type InfoSection = "mchess" | "nimbus";

export const InfoSectionComponents: { [key in InfoSection]: ReactElement } = {
  mchess: <MchessSection />,
  nimbus: <NimbusSection />,
};
