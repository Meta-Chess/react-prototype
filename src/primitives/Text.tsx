import React from "react";
import { Text as NativeText, View } from "react-native";
import { randomInt } from "utilities";
import { Skeleton } from "./Skeleton";
import { RobotoMono_400Regular, useFonts } from "@expo-google-fonts/roboto-mono";

interface BaseTextProps {
  children: React.ReactNode;
  size: number;
  lineHeight: number;
  color?: string;
  fontWeight?: "normal" | "heavy";
  monospaceNumbers?: boolean;
  loading?: boolean;
}

function Text({
  size,
  lineHeight,
  children,
  color = "#000000",
  fontWeight = "normal",
  monospaceNumbers = false,
  loading = false,
}: BaseTextProps): React.ReactElement {
  const [fontsLoaded] = useFonts({ RobotoMono_400Regular });
  if (loading || !fontsLoaded)
    return (
      <Skeleton
        style={{
          height: lineHeight,
          minWidth:
            typeof children === "string"
              ? (children.length * lineHeight) / 2
              : randomInt(2, 5) * 40,
        }}
      />
    );

  if (monospaceNumbers && typeof children === "string" && children.length > 1)
    return (
      <View style={{ flexDirection: "row" }}>
        {children.split("").map((char, index) => (
          <Text
            size={size}
            lineHeight={lineHeight}
            color={color}
            fontWeight={fontWeight}
            key={index}
            monospaceNumbers={true}
          >
            {char}
          </Text>
        ))}
      </View>
    );

  const fontFamily =
    monospaceNumbers && typeof children === "string" && children.match(/[0-9]/)
      ? "RobotoMono_400Regular"
      : "System";

  return (
    <NativeText
      style={{
        fontSize: size,
        lineHeight,
        color: color,
        fontWeight: fontWeight === "normal" ? "normal" : "500",
        fontFamily: fontFamily,
      }}
    >
      {children}
    </NativeText>
  );
}

const sizes = {
  BodyS: { size: 14, lineHeight: 20 },
  BodyM: { size: 16, lineHeight: 20 },
  BodyL: { size: 18, lineHeight: 20 },
  DisplayS: { size: 20, lineHeight: 28 },
  DisplayM: { size: 24, lineHeight: 32 },
  DisplayL: { size: 32, lineHeight: 40 },
};

interface TextProps {
  children: React.ReactNode;
  color?: string;
  weight?: "normal" | "heavy";
  monospaceNumbers?: boolean;
  loading?: boolean;
}

Text.BodyS = function BodyS(props: TextProps): React.ReactElement {
  return <Text {...sizes.BodyS} {...props} />;
};

Text.BodyM = function BodyM(props: TextProps): React.ReactElement {
  return <Text {...sizes.BodyM} {...props} />;
};

Text.BodyL = function BodyL(props: TextProps): React.ReactElement {
  return <Text {...sizes.BodyL} {...props} />;
};

Text.DisplayS = function DisplayS(props: TextProps): React.ReactElement {
  return <Text {...sizes.DisplayS} {...props} />;
};

Text.DisplayM = function DisplayM(props: TextProps): React.ReactElement {
  return <Text {...sizes.DisplayM} {...props} />;
};

Text.DisplayL = function DisplayL(props: TextProps): React.ReactElement {
  return <Text {...sizes.DisplayL} {...props} />;
};

export { Text };
