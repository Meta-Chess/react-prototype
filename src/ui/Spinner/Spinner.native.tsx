import React, { useEffect, useState } from "react";
import { Animated, Easing, Platform, View } from "react-native";
import { Colors, SFC } from "primitives";

interface Props {
  size?: number;
  color?: string;
}

const rotateValue = new Animated.Value(0);
const animation = Animated.loop(
  Animated.sequence([
    Animated.timing(rotateValue, {
      toValue: 6,
      duration: 3000,
      easing: Easing.inOut(Easing.circle),
      isInteraction: false,
      useNativeDriver: Platform.OS === "ios",
    }),
    Animated.timing(rotateValue, {
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
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
                margin: 8,
                backgroundColor:
                  (x + y) % 2 === 0
                    ? Colors.MCHESS_ORANGE.toString()
                    : Colors.MCHESS_BLUE.toString(),
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
