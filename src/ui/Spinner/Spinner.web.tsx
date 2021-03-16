import React, { useEffect, useState } from "react";
import { Animated, Easing, Platform, View } from "react-native";
import { SFC } from "primitives";

interface Props {
  size?: number;
  color?: string;
}

const value = new Animated.Value(0);
const animation = Animated.loop(
  Animated.sequence([
    Animated.timing(value, {
      toValue: 2,
      duration: 10000,
      easing: Easing.inOut(Easing.ease),
      isInteraction: false,
      useNativeDriver: Platform.OS === "ios",
    }),
    Animated.timing(value, {
      toValue: 0,
      duration: 0,
      isInteraction: false,
      useNativeDriver: Platform.OS === "ios",
    }),
  ])
);

const Spinner: SFC<Props> = ({ style }) => {
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) {
      setIsRunning(true);
      animation.start(() => {
        setIsRunning(false);
      });
    }
  }, []);

  const rotate = value.interpolate({
    inputRange: [0, 0.1],
    outputRange: ["0deg", "360deg"],
  });
  const expand = Animated.multiply(
    Animated.multiply(value, Animated.subtract(2, value)),
    Animated.multiply(value, Animated.subtract(2, value))
  );
  const animatedColor1 = expand.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(232,229,229,1)", "rgba(242,97,0,1)"],
  });
  const animatedColor2 = expand.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(164,185,204,1)", "rgba(0,123,255,1)"],
  });

  return (
    <Animated.View style={[{ transform: [{ rotate }] }, style]}>
      {[1, 2, 3, 4].map((x) => (
        <View style={{ flexDirection: "row" }} key={x}>
          {[1, 2, 3, 4].map((y) => (
            <Animated.View
              style={{
                width: 10,
                height: 10,
                margin: Animated.add(2, Animated.multiply(20, expand)),
                backgroundColor: (x + y) % 2 === 0 ? animatedColor1 : animatedColor2,
              }}
              key={`x${x}y${y}`}
            />
          ))}
        </View>
      ))}
    </Animated.View>
  );
};

export { Spinner };
