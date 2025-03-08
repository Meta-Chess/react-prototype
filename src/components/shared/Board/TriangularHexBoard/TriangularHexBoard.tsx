import React, { FC, useContext, useEffect } from "react";
import { GameContext } from "components/shared";
import { View } from "react-native";
import { range } from "lodash";
import { BoardProps } from "components/shared/Board/Board";
import { Square } from "../Square";
import { SquareShape } from "game";
import { objectMatches } from "utilities";
import { SVG_TILE_WORKING_AREA } from "ui/Tiles";
import { thisTriangleIsUpright } from "game/CompactRules/rules/nimbus";

export type SvgMeasurement = number;
type PixelMeasurement = number;

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

  const pixelToSvg = (pixelLength: PixelMeasurement): SvgMeasurement => {
    return pixelLength * (SVG_TILE_WORKING_AREA / boardSize);
  };
  const svgToPixel = (svgLength: SvgMeasurement): PixelMeasurement => {
    return boardSize * (svgLength / SVG_TILE_WORKING_AREA);
  };

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
                const offsetX = (triangleSideLength / 2) * (colNum - 1) + boardOffsetX; // /2 for alternating triangle orientation
                const offsetY = triangleHeight * (rowNum - 1) + boardOffsetY;

                const sideLength = triangleSideLength;
                const height = (Math.sqrt(3) / 2) * sideLength;

                const centroidX = 1 / 2;
                const centroidY = Math.sqrt(3) / 6;

                const leftAdjustmentToTileCenter = svgToPixel(
                  offsetX + centroidX * triangleSideLength
                );
                const centerMaxEmbeddedDiameter = svgToPixel(2 * centroidY * sideLength);

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
                    offsetY + triangleHeight - centroidY * triangleSideLength
                  );
                } else {
                  pointA = `${sideLength / 2 + offsetX},${height + offsetY}`;
                  pointB = `${0 + offsetX},${offsetY}`;
                  pointC = `${sideLength + offsetX},${offsetY}`;
                  topAdjustmentToTileCenter = svgToPixel(
                    offsetY + centroidY * triangleSideLength
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
                      arcSvgDetails: {
                        tilePath: trianglePath,
                        tileWidth: 0,
                      },
                      leftAdjustmentToTileCenter,
                      topAdjustmentToTileCenter,
                      leftAdjustmentToTileCenterSvg: pixelToSvg(
                        leftAdjustmentToTileCenter
                      ),
                      topAdjustmentToTileCenterSvg: pixelToSvg(topAdjustmentToTileCenter),
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
