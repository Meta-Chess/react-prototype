import React, { useMemo, useState, useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Arrow from "./Arrow";
import { range } from "lodash";
import { TilePressable } from "../Square/TileBase/TilePressable";
import Color from "color";
import { BoardMeasurements } from "../calculateBoardMeasurements";

interface Props {
  measurements: BoardMeasurements;
}

const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 812;

export const GridOverlay: React.FC<Props> = ({ measurements }) => {
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
  const widthRatio = DESIGN_WIDTH / measurements.width;
  const heightRatio = DESIGN_HEIGHT / measurements.height;
  const ratio = Math.min(widthRatio, heightRatio);

  const GRID_SIZE = ratio * measurements.squareSize;
  const X_OFFSET = ratio * measurements.boardPaddingHorizontal + GRID_SIZE / 2;
  const Y_OFFSET = ratio * measurements.boardPaddingVertical + GRID_SIZE / 2;

  const cols = Math.ceil(DESIGN_WIDTH / GRID_SIZE);
  const rows = Math.ceil(DESIGN_HEIGHT / GRID_SIZE);

  const selectionDetailMap = useMemo(() => {
    return Object.fromEntries(
      range(0, rows).flatMap((x) =>
        range(0, cols).map((y) => {
          const key = x.toString() + "," + y.toString();
          const value = {
            x,
            y,
            cx: X_OFFSET + x * GRID_SIZE,
            cy: Y_OFFSET + y * GRID_SIZE,
          };
          return [key, value];
        })
      )
    );
  }, []);

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

            const scaleFactor = 0.6;
            const arrowHeadWidth = 25 * scaleFactor;

            const p1 = [
              selectionDetailMap[info.startKey].cx,
              selectionDetailMap[info.startKey].cy,
            ];
            const p2 = [
              selectionDetailMap[info.endKey].cx,
              selectionDetailMap[info.endKey].cy,
            ];
            const distance = euclideanDistance(p1, p2) - arrowHeadWidth;
            const rotation = rotationAngle(p1, p2);

            const arrowBodyHeight = 12 * scaleFactor;
            return (
              <Arrow
                rotation={rotation}
                arrowLength={distance}
                arrowHeadWidth={arrowHeadWidth}
                arrowHeadHeight={arrowBodyHeight * 2.5}
                arrowBodyHeight={arrowBodyHeight}
                x={X_OFFSET + parseInt(x) * GRID_SIZE}
                y={Y_OFFSET + parseInt(y) * GRID_SIZE - arrowBodyHeight / 2}
                key={i}
              />
            );
          })}
        </Svg>
      </>
    </View>
  );
};

function euclideanDistance(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += (a[i] - b[i]) ** 2;
  }

  return Math.sqrt(sum);
}

function rotationAngle(a: number[], b: number[]): number {
  const deltaX = b[0] - a[0];
  const deltaY = b[1] - a[1];

  const angleInRadians = Math.atan2(deltaY, deltaX);
  const angleInDegrees = angleInRadians * (180 / Math.PI);

  return angleInDegrees;
}

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
