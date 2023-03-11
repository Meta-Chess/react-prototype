import React, { useEffect, useState } from "react";
import { Animated, Easing, Platform, View } from "react-native";
import { SFC } from "primitives";
import styled from "styled-components/native";

interface Props {
  size?: number;
  color?: string;
}

const rotation1 = new Animated.Value(0);
const rotation1Animation = Animated.loop(
  Animated.sequence([
    Animated.timing(rotation1, {
      toValue: 1.2,
      duration: 6000,
      easing: Easing.inOut(Easing.poly(3)),
      isInteraction: false,
      useNativeDriver: Platform.OS === "ios",
    }),
    Animated.timing(rotation1, {
      toValue: 0,
      duration: 0,
      isInteraction: false,
      useNativeDriver: Platform.OS === "ios",
    }),
  ])
);
const rotation2 = new Animated.Value(0);
const rotation2Animation = Animated.loop(
  Animated.sequence([
    Animated.timing(rotation2, {
      toValue: 0.4,
      duration: 6000,
      easing: Easing.inOut(Easing.linear),
      isInteraction: false,
      useNativeDriver: Platform.OS === "ios",
    }),
    Animated.timing(rotation2, {
      toValue: 0,
      duration: 0,
      isInteraction: false,
      useNativeDriver: Platform.OS === "ios",
    }),
  ])
);

const expansionBase = new Animated.Value(0);
const expansionBaseAnimation = Animated.loop(
  Animated.sequence([
    Animated.timing(expansionBase, {
      toValue: 1,
      duration: 3000,
      easing: Easing.inOut(Easing.ease),
      isInteraction: false,
      useNativeDriver: Platform.OS === "ios",
    }),
    Animated.timing(expansionBase, {
      toValue: 0,
      duration: 3000,
      easing: Easing.inOut(Easing.ease),
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
      rotation1Animation.start(() => {
        setIsRunning(false);
      });
      rotation2Animation.start(() => {
        setIsRunning(false);
      });
      expansionBaseAnimation.start(() => {
        setIsRunning(false);
      });
    }
  }, []);

  const rotate = Animated.add(rotation1, rotation2).interpolate({
    inputRange: [0, 0.1],
    outputRange: ["0deg", "360deg"],
  });
  const expand = Animated.multiply(expansionBase, expansionBase);
  const animatedColor1 = expand.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(232,229,229,1)", "rgba(242,97,0,1)"],
  });
  const animatedColor2 = expand.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(164,185,204,1)", "rgba(0,123,255,1)"],
  });

  return (
    <Container>
      <Animated.View style={[{ transform: [{ rotate }] }, style]}>
        {[1, 2, 3, 4].map((x) => (
          <View style={{ flexDirection: "row" }} key={x}>
            {[1, 2, 3, 4].map((y) => (
              <Animated.View
                style={{
                  width: 10,
                  height: 10,
                  margin: Animated.add(2, Animated.multiply(24, expand)),
                  backgroundColor: (x + y) % 2 === 0 ? animatedColor1 : animatedColor2,
                }}
                key={`x${x}y${y}`}
              />
            ))}
          </View>
        ))}
      </Animated.View>
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export { Spinner };
