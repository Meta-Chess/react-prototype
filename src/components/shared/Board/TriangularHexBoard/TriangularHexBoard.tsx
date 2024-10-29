import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import { GameContext } from "components/shared";
import { Colors } from "primitives";
import { View } from "react-native";
import { range } from "lodash";
import { BoardProps } from "components/shared/Board/Board";
import { Square } from "../Square";
import { SquareShape } from "game";
import { objectMatches } from "utilities";
import { HexBackboard } from "../HexBackboard";
import { polarToCartesian, euclideanDistance } from "utilities";
import { describeArc, ARC_TILE_WORKING_AREA } from "ui/Tiles/Arc";
import { useCircularRotation } from "../useCircularRotation";
import type { Point, Degrees } from "game/types";
import { PlayerName } from "game/types";
import { rotateArray } from "utilities/arrayHelper";

export type SvgMeasurement = number;
type SvgPointMeasurement = Point;
type PixelMeasurement = number;

export const TILE_DISPLAY_OVERFLOW: SvgMeasurement = 0.5; // svgs which are supposed to be flush with each other will have a small gap, which can be dealt with by adding size

export const TriangularHexBoard: FC<BoardProps> = ({
  backboard = true,
  measurements,
}) => {
  const { gameMaster } = useContext(GameContext);
  useEffect(() => gameMaster?.game.board.setVisualShapeToken(SquareShape.Triangle)); //hmm..

  // // rotation
  // const players = gameMaster?.game.players ?? [];
  // // TODO: extract into function... also used in useCylinderRotation
  // const assignedPlayer = gameMaster?.assignedPlayer ?? (0 as PlayerName);
  // const assignedPlayerName =
  //   assignedPlayer === "all" || assignedPlayer === "spectator"
  //     ? PlayerName.White
  //     : assignedPlayer || PlayerName.White;
  // const playerNames = players?.map((p) => p.name) || [PlayerName.White];
  // const playerIndex = playerNames.indexOf(assignedPlayerName);
  // ////

  // // revisit this... it's also in useCylinderRotation
  // const { minRank, maxRank, minFile, maxFile } = measurements.rankAndFileBounds;
  // const numberOfColumns = useMemo(() => maxFile - minFile + 1, [minFile, maxFile]);
  // const numberOfRows = useMemo(() => maxRank - minRank + 1, [minRank, maxRank]);

  // //TODO: this calc nice
  // const defaultRadialOffset = 0;
  // const defaultCircularOffset = 4 * players.length + 5 - (playerIndex + 1) * 8;

  // const [radialOffset, setRadialOffset] = useState(defaultRadialOffset);
  // const [circularOffset, setCircularOffset] = useState(defaultCircularOffset);

  // useCircularRotation(
  //   measurements,
  //   radialOffset,
  //   setRadialOffset,
  //   circularOffset,
  //   setCircularOffset,
  //   numberOfColumns,
  //   numberOfRows
  // );

  // //
  // const svgBox: SvgMeasurement = ARC_TILE_WORKING_AREA;
  // const pixelToSvg = (pixelLength: PixelMeasurement): SvgMeasurement => {
  //   return pixelLength * (svgBox / boardSize);
  // };
  // const svgToPixel = (svgLength: SvgMeasurement): PixelMeasurement => {
  //   return boardSize * (svgLength / svgBox);
  // };

  // const centerGapWidthAsColumnWidthMultiple = 2;
  // const columnWidth: SvgMeasurement =
  //   svgBox / (2 * (numberOfColumns + centerGapWidthAsColumnWidthMultiple));
  // const rowWidth: Degrees = 360.0 / numberOfRows;

  // // sizes
  // const backboardRadialSize: PixelMeasurement = 8;
  // const backboardShadowRadialSize: PixelMeasurement = 2;
  // const totalBackboardRadialSize = backboardRadialSize + backboardShadowRadialSize;
  // const boardSize: PixelMeasurement =
  //   Math.min(measurements.boardAreaWidth, measurements.boardAreaHeight) -
  //   2 * totalBackboardRadialSize;

  // const columnList = range(1, numberOfColumns + 1);
  // const rowList = range(1, numberOfRows + 1);
  // const squareColumnList = rotateArray(columnList, radialOffset);
  // const squareRowList = rotateArray(rowList, circularOffset).reverse();

  // export type TileSchematic = {
  //   topAdjustmentToTileCenter: number;
  //   leftAdjustmentToTileCenter: number;
  //   centerMaxEmbeddedDiameter: number;
  // } & ArcTileSchematic; // extend with ... | OtherTileSchematic ...

  // export interface ArcTileSchematic {
  //   arcSvgDetails: ArcSvgDetails;
  // }

  // interface ArcSvgDetails {
  //   tilePath: string;
  //   tileWidth: number;
  // }

  // thoughts: looks like there is the SVG working area (1000x1000)
  // and the pixel from board measurements
  // we convert between the two to maximisze the size of the triangles...

  const sideLength = 100;
  const height = (Math.sqrt(3) / 2) * sideLength;
  const offsetY = (100 - height) / 2; // Center the triangle vertically

  const pointA = `${sideLength / 2},${offsetY}`;
  const pointB = `0,${height + offsetY}`;
  const pointC = `${sideLength},${height + offsetY}`;
  const trianglePath = `M${pointA} L${pointB} L${pointC} Z`;

  const tileSchematic = {
    topAdjustmentToTileCenter: 0,
    leftAdjustmentToTileCenter: 0,
    centerMaxEmbeddedDiameter: 0,
    arcSvgDetails: {
      tilePath: trianglePath,
      tileWidth: 1,
    },
  };

  // don't do this...
  // const { minRank, maxRank, minFile, maxFile } = measurements.rankAndFileBounds;
  // const numberOfColumns = useMemo(() => maxFile - minFile + 1, [minFile, maxFile]);
  // const numberOfRows = useMemo(() => maxRank - minRank + 1, [minRank, maxRank]);

  const columnList = range(1, 8);
  const rowList = range(1, 2);

  // const svgBox: SvgMeasurement = ARC_TILE_WORKING_AREA;
  // const pixelToSvg = (pixelLength: PixelMeasurement): SvgMeasurement => {
  //   return pixelLength * (svgBox / boardSize);
  // };
  // const svgToPixel = (svgLength: SvgMeasurement): PixelMeasurement => {
  //   return boardSize * (svgLength / svgBox);
  // };

  //

  return (
    <View
      style={{
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        overflow: "visible",
        borderColor: "red",
        borderWidth: 2,
      }}
    >
      {/* {backboard && (
        <HexBackboard
          boardSize={pixelToSvg(boardSize)}
          centerGapSize={centerGapWidthAsColumnWidthMultiple * columnWidth}
          radialWidth={pixelToSvg(backboardRadialSize)}
          shadowRadialWidth={pixelToSvg(backboardShadowRadialSize)}
          color={Colors.DARK.toString()}
          shadowColor={Colors.BLACK.fade(0.5).toString()}
        />
      )} */}
      <View
        style={{
          width: 100,
          height: 100,
          justifyContent: "center",
          alignItems: "center",
          overflow: "visible",
        }}
      >
        {columnList.map((colNum) => {
          return (
            <View
              style={{ position: "absolute", width: "100%", height: "100%" }}
              key={colNum}
              pointerEvents={"none"}
            >
              {rowList.map((rowNum) => {
                const leftAdjustmentToTileCenter = colNum * 50; // xTriangle width
                const topAdjustmentToTileCenter = rowNum * 50; // xTriangle width
                //approximating embedded circle with euclidean distance
                const centerMaxEmbeddedDiameter = 0;

                // const sideLength = 100;
                // const height = (Math.sqrt(3) / 2) * sideLength;
                // const offsetY = (100 - height) / 2 + leftAdjustmentToTileCenter; // Center the triangle vertically

                // const pointA = `${sideLength / 2},${offsetY}`;
                // const pointB = `0,${height + offsetY}`;
                // const pointC = `${sideLength},${height + offsetY}`;
                // const trianglePath = `M${pointA} L${pointB} L${pointC} Z`;

                const sideLength = 100;
                const height = (Math.sqrt(3) / 2) * sideLength;
                const offsetX = leftAdjustmentToTileCenter;
                const offsetY = topAdjustmentToTileCenter; // Center the triangle vertically

                // Apply xOffset to each x-coordinate
                const pointA = `${sideLength / 2 + offsetX},${offsetY}`;
                const pointB = `${0 + offsetX},${height + offsetY}`;
                const pointC = `${sideLength + offsetX},${height + offsetY}`;
                const trianglePath = `M${pointA} L${pointB} L${pointC} Z`;

                return (
                  <Square
                    key={colNum + 10 * rowNum}
                    square={gameMaster?.game.board.firstSquareSatisfyingRule((square) =>
                      objectMatches({
                        rank: rowNum,
                        file: colNum,
                      })(square.coordinates)
                    )}
                    shape={SquareShape.Triangle}
                    tileSchematic={{
                      arcSvgDetails: {
                        tilePath: trianglePath,
                        tileWidth: 0, // this should be something- maybe triangle border size??
                      },
                      leftAdjustmentToTileCenter,
                      topAdjustmentToTileCenter,
                      centerMaxEmbeddedDiameter,
                    }}
                  />
                );
              })}
            </View>
          );
        })}

        {/* <Square
                key={1}
                square={gameMaster?.game.board.firstSquareSatisfyingRule((square) =>
                  objectMatches({
                    rank: squareRowList[rowIndex],
                    file: squareColumnList[colIndex],
                  })(square.coordinates)
                )}
                shape={SquareShape.Arc}
                tileSchematic={{
                  arcSvgDetails: {
                    tilePath: describeArc({
                      x: boardCenter,
                      y: boardCenter,
                      radius: tileDistance,
                      startAngle: tileStartAngle,
                      endAngle: tileEndAngle,
                    }),
                    tileWidth: columnWidth + 2 * TILE_DISPLAY_OVERFLOW,
                  },
                  leftAdjustmentToTileCenter,
                  topAdjustmentToTileCenter,
                  centerMaxEmbeddedDiameter,
                }}
              /> */}
      </View>
    </View>
  );
};
