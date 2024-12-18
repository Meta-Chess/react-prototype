import React, { useState, useEffect, useMemo } from "react";
import { View, Dimensions, StyleSheet, Pressable } from "react-native";
import { Svg, Line, Polygon, G } from "react-native-svg";
import { SFC } from "primitives/SFC";

const GRID_SIZE = 50;
const lineColor = "rgba(0,0,0,0.2)";
const lineWidth = 1;

export const GridOverlay: SFC<{}> = (): any => {
  const { width, height } = Dimensions.get("window");

  const [svgOffset, setSvgOffset] = useState({ x: 0, y: 0 });

  // State to store chosen cells
  const [startCell, setStartCell] = useState(null);
  const [endCell, setEndCell] = useState(null);

  // Create vertical grid lines
  const verticalLines = useMemo(() => {
    const lines = [];
    for (let x = 0; x <= width; x += GRID_SIZE) {
      lines.push(
        <View
          key={`v-${x}`}
          style={[
            styles.line,
            {
              top: 0,
              left: x,
              width: lineWidth,
              height: height,
              backgroundColor: lineColor,
            },
          ]}
        />
      );
    }
    return lines;
  }, [width, height]);

  // Create horizontal grid lines
  const horizontalLines = useMemo(() => {
    const lines = [];
    for (let y = 0; y <= height; y += GRID_SIZE) {
      lines.push(
        <View
          key={`h-${y}`}
          style={[
            styles.line,
            {
              left: 0,
              top: y,
              height: lineWidth,
              width: width,
              backgroundColor: lineColor,
            },
          ]}
        />
      );
    }
    return lines;
  }, [width, height]);

  const handlePress = (e) => {
    const { pageX, pageY } = e.nativeEvent;

    // Correct the touch coordinates using the SVG's top-left corner
    const correctedX = pageX - svgOffset.x;
    const correctedY = pageY - svgOffset.y;

    // Calculate grid coordinates
    const col = Math.floor(correctedX / GRID_SIZE);
    const row = Math.floor(correctedY / GRID_SIZE);

    const cell = { col, row };

    if (!startCell) {
      setStartCell(cell);
      setEndCell(null); // Reset end cell
    } else {
      setEndCell(cell);
    }
  };

  // Compute arrow coordinates if we have both cells
  let arrow = null;
  if (startCell && endCell) {
    const startX = startCell.col * GRID_SIZE + GRID_SIZE / 2;
    const startY = startCell.row * GRID_SIZE + GRID_SIZE / 2;

    const endX = endCell.col * GRID_SIZE + GRID_SIZE / 2;
    const endY = endCell.row * GRID_SIZE + GRID_SIZE / 2;

    arrow = <Arrow startX={startX} startY={startY} endX={endX} endY={endY} color="red" />;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Pressable that covers the whole screen to detect cell presses */}
      <Pressable style={{ flex: 1 }} onPress={handlePress}>
        {/* Grid overlay */}
        <View style={styles.container} pointerEvents="none">
          {verticalLines}
          {horizontalLines}
        </View>
        {/* Arrow overlay */}
        {arrow}
      </Pressable>
    </View>
  );
};

const Arrow = ({
  startX,
  startY,
  endX,
  endY,
  color = "black",
  thickness = 4,
  headRatio = 0.2,
}) => {
  const dx = endX - startX;
  const dy = endY - startY;
  const angle = Math.atan2(dy, dx);
  const length = Math.sqrt(dx * dx + dy * dy);

  const arrowHeadWidth = length * headRatio;
  const halfThickness = thickness / 2;

  const arrowHeadPoints = [
    `${length - arrowHeadWidth},${-halfThickness}`,
    `${length},0`,
    `${length - arrowHeadWidth},${halfThickness}`,
  ].join(" ");

  return (
    <Svg
      style={{ position: "absolute", left: 0, top: 0 }}
      width={Dimensions.get("window").width}
      height={Dimensions.get("window").height}
      pointerEvents="none"
    >
      <G
        transform={`
        translate(${startX}, ${startY})
        rotate(${(angle * 180) / Math.PI})
      `}
      >
        <Line
          x1={0}
          y1={0}
          x2={length - arrowHeadWidth}
          y2={0}
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
        />
        <Polygon points={arrowHeadPoints} fill={color} />
      </G>
    </Svg>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  line: {
    position: "absolute",
  },
});

export default GridOverlay;

/*
const [presIsToggled, setPresIsToggled] = useState(true);

// if it's the same location- highlight the square
// make an undo button too?... popping off the list
// how do we do the square highlight?... should be able to put highlight over the square but under the piece
const [arrowStartSelected, setArrowStartSelected] = useState<number[] | undefined>(
  undefined
);
const [arrowData, setArrowData] = useState<{ startXY: number[]; endXY: number[] }[]>([]);

function updateArrowOnPress(rank: number, file: number): void {
  const x = measurements.boardPaddingHorizontal + (measurements.squareSize / 2) * file;
  const y = measurements.boardPaddingHorizontal + (measurements.squareSize / 2) * rank;
  if (arrowStartSelected === undefined) {
    setArrowStartSelected([x, y]);
  } else {
    setArrowData([...arrowData, { startXY: arrowStartSelected, endXY: [x, y] }]);
    setArrowStartSelected(undefined);
  }
  console.log(arrowData);
}

function popArrow(): void {
  setArrowData([...arrowData.slice(0, arrowData.length - 1)]);
  console.log(arrowData);
}

useEffect(() => {
  const handleKeyDown = (event: any): any => {
    if (event.key.toLowerCase() === "p") {
      setPresIsToggled(!presIsToggled);
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
}, [presIsToggled, arrowData.length]);
*/
