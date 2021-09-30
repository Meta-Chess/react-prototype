import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import { GameContext } from "components/shared";
import { Colors } from "primitives";
import { View } from "react-native";
import { range } from "lodash";
import { BoardProps } from "components/shared/Board/Board";
import { Square } from "../Square";
import { SquareShape } from "game";
import { objectMatches } from "utilities";
import { SvgAnnulus } from "primitives/Shapes";
import { CircularBackboard } from "./CircularBackboard";
import { polarToCartesian, euclideanDistance } from "utilities";
import { describeArc, ARC_TILE_WORKING_AREA } from "ui/Tiles/Arc";
import styled from "styled-components/native";
import { useCircularRotation } from "../useCircularRotation";
import type { Point, Degrees } from "game/types";
import { PlayerName } from "game/types";
import { rotateArray } from "utilities/arrayHelper";

export type SvgMeasurement = number;
type SvgPointMeasurement = Point;
type PixelMeasurement = number;

export const TILE_DISPLAY_OVERFLOW: SvgMeasurement = 0.5; // svgs which are supposed to be flush with each other will have a small gap, which can be dealt with by adding size

export const CircularBoard: FC<BoardProps> = ({ backboard = true, measurements }) => {
  const { gameMaster } = useContext(GameContext);
  useEffect(() => gameMaster?.game.board.setVisualShapeToken(SquareShape.Arc));

  // rotation
  const players = gameMaster?.game.players ?? [];
  // TODO: extract into function... also used in useCylinderRotation
  const assignedPlayer = gameMaster?.assignedPlayer ?? (0 as PlayerName);
  const assignedPlayerName =
    assignedPlayer === "all" || assignedPlayer === "spectator"
      ? PlayerName.White
      : assignedPlayer || PlayerName.White;
  const playerNames = players?.map((p) => p.name) || [PlayerName.White];
  const playerIndex = playerNames.indexOf(assignedPlayerName);
  ////

  //TODO: this calc nice
  const defaultRadialOffset = 0;
  const defaultCircularOffset = 4 * players.length - 5 + playerIndex * 8;

  const [radialOffset, setRadialOffset] = useState(defaultRadialOffset);
  const [circularOffset, setCircularOffset] = useState(defaultCircularOffset);

  // revisit this... it's also in useCylinderRotation
  const { minRank, maxRank, minFile, maxFile } = measurements.rankAndFileBounds;
  const numberOfColumns = useMemo(() => maxFile - minFile + 1, [minFile, maxFile]);
  const numberOfRows = useMemo(() => maxRank - minRank + 1, [minRank, maxRank]);

  useCircularRotation(
    measurements,
    radialOffset,
    setRadialOffset,
    circularOffset,
    setCircularOffset,
    numberOfColumns,
    numberOfRows
  );

  //
  const svgBox: SvgMeasurement = ARC_TILE_WORKING_AREA;
  const pixelToSvg = (pixelLength: PixelMeasurement): SvgMeasurement => {
    return pixelLength * (svgBox / boardSize);
  };
  const svgToPixel = (svgLength: SvgMeasurement): PixelMeasurement => {
    return boardSize * (svgLength / svgBox);
  };

  const centerGapWidthAsColumnWidthMultiple = 2;
  const columnWidth: SvgMeasurement =
    svgBox / (2 * (numberOfColumns + centerGapWidthAsColumnWidthMultiple));
  const rowWidth: Degrees = 360.0 / numberOfRows;

  // sizes
  const backboardRadialSize: PixelMeasurement = 8;
  const backboardShadowRadialSize: PixelMeasurement = 2;
  const totalBackboardRadialSize = backboardRadialSize + backboardShadowRadialSize;
  const boardSize: PixelMeasurement =
    Math.min(measurements.boardAreaWidth, measurements.boardAreaHeight) -
    2 * totalBackboardRadialSize;

  const columnList = range(1, numberOfColumns + 1);
  const rowList = range(1, numberOfRows + 1);
  const squareColumnList = rotateArray(columnList, radialOffset);
  const squareRowList = rotateArray(rowList, circularOffset);

  return (
    <View
      style={{
        width: boardSize + 2 * totalBackboardRadialSize,
        height: boardSize + 2 * totalBackboardRadialSize,
        justifyContent: "center",
        alignItems: "center",
        overflow: "visible",
      }}
    >
      <View
        style={{
          width: boardSize,
          height: boardSize,
          justifyContent: "center",
          alignItems: "center",
          overflow: "visible",
        }}
      >
        <BackcolorBoard
          WorkingLength={pixelToSvg(boardSize)}
          OuterRadius={pixelToSvg(boardSize / 2) + 2 * TILE_DISPLAY_OVERFLOW}
          InnerRadius={
            centerGapWidthAsColumnWidthMultiple * columnWidth - 2 * TILE_DISPLAY_OVERFLOW
          }
          color={Colors.DARK.toString()}
          uniqueMaskId={"BackcolorBoard"}
        />
        {columnList.map((colNum, colIndex) => {
          return (
            <View
              style={{ position: "absolute", width: "100%", height: "100%" }}
              key={colNum}
              pointerEvents={"none"}
            >
              {rowList.map((rowNum, rowIndex) => {
                const boardCenter = svgBox / 2;
                const tileStartAngle: SvgMeasurement =
                  rowNum * rowWidth - TILE_DISPLAY_OVERFLOW;
                const tileCenterAngle: SvgMeasurement = (rowNum + 0.5) * rowWidth;
                const tileEndAngle: SvgMeasurement =
                  (rowNum + 1) * rowWidth + TILE_DISPLAY_OVERFLOW;
                const tileDistance: SvgMeasurement =
                  columnWidth * (colNum + 0.5 + centerGapWidthAsColumnWidthMultiple - 1);

                const tileStartPoint: SvgPointMeasurement = polarToCartesian({
                  centerX: boardCenter,
                  centerY: boardCenter,
                  radius: tileDistance,
                  angle: tileStartAngle,
                });
                const tileCenterPoint: SvgPointMeasurement = polarToCartesian({
                  centerX: boardCenter,
                  centerY: boardCenter,
                  radius: tileDistance,
                  angle: tileCenterAngle,
                });
                const tileEndPoint: SvgPointMeasurement = polarToCartesian({
                  centerX: boardCenter,
                  centerY: boardCenter,
                  radius: tileDistance,
                  angle: tileEndAngle,
                });

                const leftAdjustmentToTileCenter = svgToPixel(tileCenterPoint.x);
                const topAdjustmentToTileCenter = svgToPixel(tileCenterPoint.y);
                //approximating embedded circle with euclidean distance
                const centerMaxEmbeddedDiameter = svgToPixel(
                  Math.min(columnWidth, euclideanDistance(tileStartPoint, tileEndPoint))
                );

                return (
                  <Square
                    key={colNum + 10 * rowNum}
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
                        tileWidth: columnWidth + 4 * TILE_DISPLAY_OVERFLOW,
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
      </View>

      {backboard && (
        <CircularBackboard
          boardSizePixel={boardSize}
          boardSize={pixelToSvg(boardSize)}
          centerGapSize={centerGapWidthAsColumnWidthMultiple * columnWidth}
          radialWidth={pixelToSvg(backboardRadialSize)}
          shadowRadialWidth={pixelToSvg(backboardShadowRadialSize)}
          color={Colors.DARK.toString()}
          shadowColor={Colors.BLACK.fade(0.5).toString()}
        />
      )}
    </View>
  );
};

const BackcolorBoard = styled(SvgAnnulus)``; //This component visually smooths gaps between the arc tiles
