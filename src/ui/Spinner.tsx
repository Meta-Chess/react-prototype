import React, { useEffect, useState } from "react";
import { Animated, Easing, Platform, View } from "react-native";
import { SFC } from "primitives";

interface Props {
  size?: number;
  color?: string;
}

const rotateValue = new Animated.Value(10);
const animation = Animated.loop(
  Animated.sequence([
    Animated.timing(rotateValue, {
      toValue: 0,
      duration: 5000,
      easing: Easing.elastic(1),
      isInteraction: false,
      useNativeDriver: Platform.OS !== "web",
    }),
    Animated.timing(rotateValue, {
      toValue: 10,
      duration: 5000,
      easing: Easing.elastic(1),
      isInteraction: false,
      useNativeDriver: Platform.OS !== "web",
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const animatedColor1 = rotateValue.interpolate({
    inputRange: [0, 10],
    outputRange: ["rgba(232,229,229,1)", "rgba(242,97,0,1)"],
  });
  const animatedColor2 = rotateValue.interpolate({
    inputRange: [0, 10],
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
                margin: rotateValue,
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
