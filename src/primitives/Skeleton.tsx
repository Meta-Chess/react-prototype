import React, { useEffect } from "react";
import { Animated, Platform } from "react-native";
import { SFC } from "./SFC";

let running = false;
const opacity = new Animated.Value(0.2);
const animation = Animated.loop(
  Animated.sequence([
    Animated.timing(opacity, {
      toValue: 0.1,
      duration: 1200,
      useNativeDriver: Platform.OS !== "web",
    }),
    Animated.timing(opacity, {
      toValue: 0.2,
      duration: 1200,
      useNativeDriver: Platform.OS !== "web",
    }),
  ])
);

export const Skeleton: SFC = ({ style }) => {
  useEffect(() => {
    if (!running) {
      running = true;
      animation.start(() => {
        running = false;
      });
    }
  }, []);

  return (
    <Animated.View
      style={[style, { opacity, backgroundColor: "#888", borderRadius: 4 }]}
    />
  );
};
