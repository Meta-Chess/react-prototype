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
  const boardSize: PixelMeasurement = Math.min(
    measurements.boardAreaWidth,
    measurements.boardAreaHeight
  );

  // TODO: player rotation??
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

  // TODO: we should useMemo all of this?
  // TODO: change ARC/Schematic language to be more generic...
  const allSquares = gameMaster?.game.board.getSquares() || [];

  const columnList = range(
    1,
    Math.max(...allSquares.map((square) => square.coordinates.file)) + 1
  );
  const rowList = range(
    1,
    Math.max(...allSquares.map((square) => square.coordinates.rank)) + 1
  );
  const topLeftTriangleFile = Math.min(
    ...allSquares
      .filter((square) => square.coordinates.rank === 1)
      .map((square) => square.coordinates.file)
  );

  const fullWidthInTriangleUnits = (columnList.length + 1) / 2;
  const fullHeightInTriangleUnits = (rowList.length * Math.sqrt(3)) / 2;

  let fullWidth: SvgMeasurement;
  let fullHeight: SvgMeasurement;
  let triangleSideLength: SvgMeasurement;
  let triangleHeight: SvgMeasurement;
  const boardIsMoreWideThanTall = fullWidthInTriangleUnits > fullHeightInTriangleUnits;
  if (boardIsMoreWideThanTall) {
    fullWidth = ARC_TILE_WORKING_AREA;
    fullHeight =
      (fullHeightInTriangleUnits / fullWidthInTriangleUnits) * ARC_TILE_WORKING_AREA;
    triangleSideLength = fullWidth / fullWidthInTriangleUnits;
    triangleHeight = (triangleSideLength * Math.sqrt(3)) / 2;
  } else {
    fullWidth =
      (fullWidthInTriangleUnits / fullHeightInTriangleUnits) * ARC_TILE_WORKING_AREA;
    fullHeight = ARC_TILE_WORKING_AREA;
    triangleHeight = fullHeight / fullHeightInTriangleUnits;
    triangleSideLength = (2 / Math.sqrt(3)) * triangleHeight;
  }

  const svgToPixel = (svgLength: SvgMeasurement): PixelMeasurement => {
    return boardSize * (svgLength / ARC_TILE_WORKING_AREA);
  };

  return (
    <View
      style={{
        width: boardSize,
        height: boardSize,
        justifyContent: "center",
        alignItems: "center",
        overflow: "visible",
      }}
    >
      {/* TODO: a hex backboard? - remember to update boardSize above, see CircularBoard for reference.
      {backboard && (
        <HexBackboard color={Colors.DARK.toString()} measurements={measurements} />
      )}
      */}
      <View
        style={{
          width: boardSize,
          height: boardSize,
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
                const matchingSquare = gameMaster?.game.board.firstSquareSatisfyingRule(
                  (square) =>
                    objectMatches({
                      rank: rowNum,
                      file: colNum,
                    })(square.coordinates)
                );

                if (matchingSquare === undefined) return <></>;

                let boardOffsetX: number;
                let boardOffsetY: number;
                if (boardIsMoreWideThanTall) {
                  boardOffsetX = 0;
                  boardOffsetY = ARC_TILE_WORKING_AREA / 2 - fullHeight / 2;
                } else {
                  boardOffsetX = ARC_TILE_WORKING_AREA / 2 - fullWidth / 2;
                  boardOffsetY = 0;
                }

                const offsetX = (triangleSideLength / 2) * (colNum - 1) + boardOffsetX; // /2 for alternating triangle orientation
                const offsetY = triangleHeight * (rowNum - 1) + boardOffsetY;

                const sideLength = triangleSideLength;
                const height = (Math.sqrt(3) / 2) * sideLength;

                const centroidX = 1 / 2;
                const centroidY = Math.sqrt(3) / 6;

                const leftAdjustmentToTileCenter = 3 * svgToPixel(sideLength); // svgToPixel(centroidX * sideLength);
                const topAdjustmentToTileCenter =
                  2.5 * centroidY * svgToPixel(sideLength); // svgToPixel(centroidY * sideLength);
                const centerMaxEmbeddedDiameter = svgToPixel(2 * centroidY * sideLength);

                let pointA: string;
                let pointB: string;
                let pointC: string;

                const sharesRowParityWithFirstRow = rowNum % 2 === 1;
                const sharesFileParityWithTopLeftTriangle =
                  colNum % 2 === topLeftTriangleFile % 2;
                const thisTriangleIsUpright =
                  (sharesRowParityWithFirstRow && sharesFileParityWithTopLeftTriangle) ||
                  (!sharesRowParityWithFirstRow && !sharesFileParityWithTopLeftTriangle);

                if (thisTriangleIsUpright) {
                  pointA = `${sideLength / 2 + offsetX},${offsetY}`;
                  pointB = `${0 + offsetX},${height + offsetY}`;
                  pointC = `${sideLength + offsetX},${height + offsetY}`;
                } else {
                  pointA = `${sideLength / 2 + offsetX},${height + offsetY}`;
                  pointB = `${0 + offsetX},${offsetY}`;
                  pointC = `${sideLength + offsetX},${offsetY}`;
                }

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
      </View>
    </View>
  );
};
