import React, { FC } from "react";
import { Path } from "react-native-svg";

const Rook: FC = () => {
  return (
    <>
      <Path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z " />
      <Path d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z " />
      <Path d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14" />
      <Path d="M 34,14 L 31,17 L 14,17 L 11,14" />
      <Path d="M 31,17 L 31,29.5 L 14,29.5 L 14,17" />
      <Path d="M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5" />
      <Path d="M 11,14 L 34,14" />
    </>
  );
};

export { Rook };
