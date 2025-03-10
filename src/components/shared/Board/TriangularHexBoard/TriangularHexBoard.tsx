import React, { FC, useContext, useEffect } from "react";
import { GameContext } from "components/shared";
import { View } from "react-native";
import { range } from "lodash";
import { BoardProps } from "components/shared/Board/Board";
import { Square } from "../Square";
import { SquareShape } from "game";
import { objectMatches } from "utilities";
import { SVG_TILE_WORKING_AREA, pixelToSvg, svgToPixel } from "ui/Tiles";
import type { SvgMeasurement, PixelMeasurement } from "ui/Tiles";
import { thisTriangleIsUpright } from "game/CompactRules/rules/nimbus";

/* TODO:
  it would be nice to support a hex backboard
  boardSize will need to be updated (see how it is done in CircularBoard for reference)
*/
// TODO: implement board rotation for online play (i.e. black will see the black pieces at the bottom)
export const TriangularHexBoard: FC<BoardProps> = ({ measurements }) => {
  const { gameMaster } = useContext(GameContext);
  useEffect(() => gameMaster?.game.board.setVisualShapeToken(SquareShape.Triangle)); //hmm..
  const boardSize: PixelMeasurement = Math.min(
    measurements.boardAreaWidth,
    measurements.boardAreaHeight
  );

  const allSquares = gameMaster?.game.board.getSquares() || [];
  const columnList = range(
    1,
    Math.max(...allSquares.map((square) => square.coordinates.file)) + 1
  );
  const rowList = range(
    1,
    Math.max(...allSquares.map((square) => square.coordinates.rank)) + 1
  );
  const topLeftTriangleRankFile = {
    rank: 1,
    file: Math.min(
      ...allSquares
        .filter((square) => square.coordinates.rank === 1)
        .map((square) => square.coordinates.file)
    ),
  };

  const fullWidthInTriangleUnits = (columnList.length + 1) / 2;
  const fullHeightInTriangleUnits = (rowList.length * Math.sqrt(3)) / 2;

  let fullWidth: SvgMeasurement;
  let fullHeight: SvgMeasurement;
  const boardIsMoreWideThanTall = fullWidthInTriangleUnits > fullHeightInTriangleUnits;
  if (boardIsMoreWideThanTall) {
    fullWidth = SVG_TILE_WORKING_AREA;
    fullHeight =
      (fullHeightInTriangleUnits / fullWidthInTriangleUnits) * SVG_TILE_WORKING_AREA;
  } else {
    fullWidth =
      (fullWidthInTriangleUnits / fullHeightInTriangleUnits) * SVG_TILE_WORKING_AREA;
    fullHeight = SVG_TILE_WORKING_AREA;
  }
  const triangleSideLength: SvgMeasurement = fullWidth / fullWidthInTriangleUnits;
  const triangleHeight: SvgMeasurement = (triangleSideLength * Math.sqrt(3)) / 2;

  let boardOffsetX: number;
  let boardOffsetY: number;
  if (boardIsMoreWideThanTall) {
    boardOffsetX = 0;
    boardOffsetY = SVG_TILE_WORKING_AREA / 2 - fullHeight / 2;
  } else {
    boardOffsetX = SVG_TILE_WORKING_AREA / 2 - fullWidth / 2;
    boardOffsetY = 0;
  }

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
                const offsetX = (triangleSideLength / 2) * (colNum - 1) + boardOffsetX; // /2 for alternating triangle orientation
                const offsetY = triangleHeight * (rowNum - 1) + boardOffsetY;

                const sideLength = triangleSideLength;
                const height = (Math.sqrt(3) / 2) * sideLength;

                const centroidX = 1 / 2;
                const centroidY = Math.sqrt(3) / 6;

                const leftAdjustmentToTileCenter = svgToPixel(
                  offsetX + centroidX * triangleSideLength,
                  boardSize
                );
                const centerMaxEmbeddedDiameter = svgToPixel(
                  2 * centroidY * sideLength,
                  boardSize
                );

                let pointA: string;
                let pointB: string;
                let pointC: string;

                let topAdjustmentToTileCenter: PixelMeasurement;
                if (
                  thisTriangleIsUpright(
                    { rank: rowNum, file: colNum },
                    topLeftTriangleRankFile
                  )
                ) {
                  pointA = `${sideLength / 2 + offsetX},${offsetY}`;
                  pointB = `${0 + offsetX},${height + offsetY}`;
                  pointC = `${sideLength + offsetX},${height + offsetY}`;
                  topAdjustmentToTileCenter = svgToPixel(
                    offsetY + triangleHeight - centroidY * triangleSideLength,
                    boardSize
                  );
                } else {
                  pointA = `${sideLength / 2 + offsetX},${height + offsetY}`;
                  pointB = `${0 + offsetX},${offsetY}`;
                  pointC = `${sideLength + offsetX},${offsetY}`;
                  topAdjustmentToTileCenter = svgToPixel(
                    offsetY + centroidY * triangleSideLength,
                    boardSize
                  );
                }

                const trianglePath = `M${pointA} L${pointB} L${pointC} Z`;

                return (
                  <Square
                    key={colNum.toString() + "," + rowNum.toString()}
                    square={gameMaster?.game.board.firstSquareSatisfyingRule((square) =>
                      objectMatches({
                        rank: rowNum,
                        file: colNum,
                      })(square.coordinates)
                    )}
                    shape={SquareShape.Triangle}
                    tileSchematic={{
                      leftAdjustmentToTileCenter,
                      topAdjustmentToTileCenter,
                      leftAdjustmentToTileCenterSvg: pixelToSvg(
                        leftAdjustmentToTileCenter,
                        boardSize
                      ),
                      topAdjustmentToTileCenterSvg: pixelToSvg(
                        topAdjustmentToTileCenter,
                        boardSize
                      ),
                      centerMaxEmbeddedDiameter,
                      tilePath: trianglePath,
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
