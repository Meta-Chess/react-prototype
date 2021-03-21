import { FC } from "react";

export interface ButtonProps {
  label: string | FC<{ color?: string }>;
  onPress: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  depressed?: boolean;
}
