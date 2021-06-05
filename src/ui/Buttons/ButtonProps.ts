import { FC } from "react";
import { ButtonSize } from "./ButtonContent";
export interface ButtonProps {
  label: string | FC<{ color?: string }>;
  onPress: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  depressed?: boolean;
  size?: ButtonSize;
}
