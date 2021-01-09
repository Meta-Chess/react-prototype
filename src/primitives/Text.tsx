import React, { FC } from "react";
import { StyleProp, Text as NativeText, TextStyle, View } from "react-native";
import { randomInt } from "utilities";
import { Skeleton } from "./Skeleton";
import { Colors } from "./Colors";
import { RobotoMono_400Regular, useFonts } from "@expo-google-fonts/roboto-mono";

export const sizes = {
  BodyXS: { size: 12, lineHeight: 16 },
  BodyS: { size: 14, lineHeight: 20 },
  BodyM: { size: 16, lineHeight: 20 },
  BodyL: { size: 18, lineHeight: 20 },
  DisplayXS: { size: 16, lineHeight: 20 },
  DisplayS: { size: 20, lineHeight: 28 },
  DisplayM: { size: 24, lineHeight: 32 },
  DisplayL: { size: 32, lineHeight: 40 },
};

interface Props {
  alignment?: "left" | "center" | "right";
  cat?: keyof typeof sizes;
  children: React.ReactNode;
  color?: string;
  fontFamily?: string;
  weight?: "normal" | "heavy";
  lineHeight?: number;
  loading?: boolean;
  monospaceNumbers?: boolean;
  onPress?: () => void;
  numberOfLines?: number;
  selectable?: boolean;
  size?: number;
  style?: StyleProp<TextStyle>;
}

const Text: FC<Props> = (props) => {
  const {
    alignment = "left",
    cat = "BodyM",
    size = sizes[cat].size,
    lineHeight = sizes[cat].lineHeight || size,
    children,
    color = Colors.TEXT.LIGHT.toString(),
    fontFamily = "System",
    weight = "normal",
    loading = false,
    monospaceNumbers = false,
    numberOfLines,
    onPress,
    selectable = false,
    style = {},
  } = props;

  if (loading) return <LoadingText height={lineHeight}>{children}</LoadingText>;
  if (monospaceNumbers && typeof children === "string" && children.length > 1)
    return <MonospaceNumbers {...props}>{children}</MonospaceNumbers>;

  return (
    <NativeText
      style={[
        {
          fontSize: size,
          lineHeight,
          color: color,
          fontWeight: weight === "normal" ? "normal" : "600",
          fontFamily: fontFamily,
          textAlign: alignment,
          overflow: "visible",
        },
        style,
      ]}
      selectable={selectable}
      onPress={onPress}
      numberOfLines={numberOfLines}
    >
      {children}
    </NativeText>
  );
};

interface LoadingProps {
  height: number;
}

const LoadingText: FC<LoadingProps> = ({ height, children }) => {
  return (
    <Skeleton
      style={{
        height,
        minWidth:
          typeof children === "string"
            ? (children.length * height) / 2
            : randomInt(2, 5) * 40,
      }}
    />
  );
};

type MonospaceNumbersProps = Props & { children: string };

const MonospaceNumbers: FC<MonospaceNumbersProps> = (props) => {
  const [fontsLoaded] = useFonts({ RobotoMono_400Regular });
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent:
          props.alignment === "center"
            ? "center"
            : props.alignment === "right"
            ? "flex-end"
            : "flex-start",
      }}
    >
      {props.children.split("").map((char, index) => {
        const fontFamily =
          fontsLoaded && char.match(/[0-9]/) ? "RobotoMono_400Regular" : props.fontFamily;
        return (
          <Text {...props} key={index} fontFamily={fontFamily}>
            {char}
          </Text>
        );
      })}
    </View>
  );
};

export { Text };
