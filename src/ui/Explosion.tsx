import React, { useEffect, FC, useRef } from "react";
import { Animated, Easing, Platform } from "react-native";
import { AbsoluteView } from "ui/Containers";
import { HexTileAnimated } from "components/shared/Board/Square/Tiles";

interface Props {
  size: number;
}
//const colorValue = new Animated.Value(0);
const colorValue = new Animated.Value(0);
const animation = Animated.loop(
  Animated.sequence([
    Animated.timing(colorValue, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      isInteraction: false,
      useNativeDriver: Platform.OS === "ios",
    }),
    Animated.timing(colorValue, {
      toValue: 9,
      duration: 500,
      easing: Easing.linear,
      isInteraction: false,
      useNativeDriver: Platform.OS === "ios",
    }),
    Animated.timing(colorValue, {
      toValue: 10,
      duration: 5,
      easing: Easing.linear,
      isInteraction: false,
      useNativeDriver: Platform.OS === "ios",
    }),
  ])
);
const Explosion: SFC<Props> = ({ style, size }) => {
  const [isRunning, setIsRunning] = useState(false);
  /*
  setTimeout(() => {
    animation.stop();
  }, 1000);
  */

  //copied from spinner,how does this work exactly(?)
  //is it a pattern to use in any animation(?)
  //lots of errors pop up when I allow for a finite animation
  useEffect(() => {
    if (!isRunning) {
      setIsRunning(true);
      if (animation !== undefined) {
        animation.start(() => {
          setIsRunning(false);
        });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const animatedColor = colorValue.interpolate({
    inputRange: [0, 9, 10],
    outputRange: ["rgba(235,52,52,0.4)", "rgba(255,97,0,0.4)", "rgba(0,0,0,0)"],
  });

  return (
    <View pointerEvents={"none"} style={[style, (style = { width: size, height: size })]}>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: animatedColor,
        }}
      />
    </View>
  );
};

export { Explosion };
