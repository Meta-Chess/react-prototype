import { ReactNode } from "react";

export interface ButtonProps {
  label: ReactNode;
  onPress: () => void;
  accessibilityLabel?: string;
}
