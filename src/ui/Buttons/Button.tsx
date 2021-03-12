import React from "react";
import { SFC } from "primitives";
import { BaseButton } from "ui/Buttons/BaseButton";
import { ButtonProps } from "./ButtonProps";

export const Button: SFC<ButtonProps> = (props) => {
  return <BaseButton {...props} />;
};
