import { FC, ReactNode } from "react";
import { ViewStyle } from "react-native";

export type StyleProps<S> = StyleProps<S>[] | S | undefined;

export type SFC<P = {}, S = ViewStyle> = FC<
  P & {
    style?: StyleProps<S>;
    children?: ReactNode;
  }
>;
