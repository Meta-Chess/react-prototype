import React, { useMemo, useState, useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Arrow from "./Arrow";
import { range } from "lodash";
import { TilePressable } from "../Square/TileBase/TilePressable";
import Color from "color";

interface Props {
  scale: number;
}

const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 812;

export const GridOverlay: React.FC<Props> = ({ scale = 50 }) => {
  /* 
    arrow state management
   */
  const [arrowStartSelected, setArrowStartSelected] = useState<string | undefined>(
    undefined
  );
  const [arrowData, setArrowData] = useState<{ startKey: string; endKey: string }[]>([]);

  function updateArrowOnPress(arrowKey: string): void {
    if (arrowStartSelected === undefined) {
      setArrowStartSelected(arrowKey);
    } else {
      setArrowData([...arrowData, { startKey: arrowStartSelected, endKey: arrowKey }]);
      setArrowStartSelected(undefined);
    }
  }

  function popArrow(): void {
    setArrowData([...arrowData.slice(0, arrowData.length - 1)]);
  }

  /*
    key presses
   */
  useEffect(() => {
    const handleKeyDown = (event: any): any => {
      if (event.key.toLowerCase() === "p") {
        // setPresIsToggled(!presIsToggled); // move to other screen- const [presIsToggled, setPresIsToggled] = useState(true);
      } else if (event.key.toLowerCase() === "o") {
        popArrow();
      } else if (event.key.toLowerCase() === "i") {
        setArrowData([]);
      }
    };

    if (Platform.OS === "web") {
      window.addEventListener("keydown", handleKeyDown);
    }

    return (): any => {
      if (Platform.OS === "web") {
        window.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [arrowData.length]);

  /* 
    grid arrangement details
   */

  // below should be modified by scale
  const GRID_SIZE = 40;
  const X_OFFSET = 20;
  const Y_OFFSET = 20;

  const cols = Math.ceil(DESIGN_WIDTH / GRID_SIZE);
  const rows = Math.ceil(DESIGN_HEIGHT / GRID_SIZE);

  const selectionDetailMap = useMemo(() => {
    return Object.fromEntries(
      range(0, rows).flatMap((x) =>
        range(0, cols).map((y) => {
          const key = x.toString() + "," + y.toString();
          const value = { x, y };
          return [key, value];
        })
      )
    );
  }, [scale]);

  return (
    <View style={styles.overlay}>
      <>
        {Object.values(selectionDetailMap).map((vals) => {
          const selectionKey = vals.x.toString() + "," + vals.y.toString();
          return (
            <TilePressable
              onPress={(): void => {
                updateArrowOnPress(selectionKey);
              }}
              color={Color().fade(1)}
              key={selectionKey}
            >
              <Svg
                style={StyleSheet.absoluteFill}
                viewBox={`0 0 ${DESIGN_WIDTH} ${DESIGN_HEIGHT}`}
                preserveAspectRatio="xMinYMin meet"
                pointerEvents={"none"}
              >
                <Circle
                  cx={X_OFFSET + vals.x * GRID_SIZE}
                  cy={Y_OFFSET + vals.y * GRID_SIZE}
                  r={5}
                  fill={"red"}
                  pointerEvents={"auto"}
                />
              </Svg>
            </TilePressable>
          );
        })}
        <Svg
          style={StyleSheet.absoluteFill}
          viewBox={`0 0 ${DESIGN_WIDTH} ${DESIGN_HEIGHT}`}
          preserveAspectRatio="xMinYMin meet"
          pointerEvents={"none"}
        >
          {arrowData.map((info, i) => {
            const [x, y] = info.startKey.split(",");
            return (
              <Arrow
                arrowLength={50}
                arrowHeadWidth={40}
                arrowHeadHeight={60}
                arrowBodyHeight={20}
                x={X_OFFSET + parseInt(x) * GRID_SIZE}
                y={Y_OFFSET + parseInt(y) * GRID_SIZE}
                key={i}
              />
            );
          })}
        </Svg>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    /** Covers the entire screen */
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,

    /** Semi-transparent black background */
    backgroundColor: "rgba(0, 0, 0, 0.5)",

    /** Center the arrow in the middle of the screen */
    justifyContent: "center",
    alignItems: "center",
  },
});
