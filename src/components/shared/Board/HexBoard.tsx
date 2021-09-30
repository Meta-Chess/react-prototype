import React, { useContext, FC, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Colors } from "primitives";
import { objectMatches, range } from "utilities";
import { TokenName, SquareShape, Square as GameSquare } from "game";
import { Square } from "./Square";
import { BoardProps } from "components/shared/Board/Board";
import { HexBackboard } from "./HexBackboard";
import { GameContext } from "components/shared";
import { BoardMeasurements } from "./calculateBoardMeasurements";

const HexBoard: FC<BoardProps> = ({
  backboard = true,
  measurements,
  flipBoard = false,
}) => {
  const { gameMaster } = useContext(GameContext);
  useEffect(() => gameMaster?.game.board.setVisualShapeToken(SquareShape.Hex));
  const game = gameMaster?.game;
  if (!game) return null;

  const { minRank, maxRank, minFile, maxFile } = measurements.rankAndFileBounds;
  const fileCoordinates = range(minFile, maxFile - minFile + 1);
  const rankCoordinates = range(minRank, maxRank - minRank + 1);

  return (
    <HexBackboard
      color={backboard ? Colors.BLACK.fade(0.5).toString() : "transparent"}
      measurements={measurements}
      shadow
    >
      <HexBackboard
        color={backboard ? Colors.DARK.toString() : "transparent"}
        measurements={measurements}
        containerStyle={{ flexDirection: flipBoard ? "row-reverse" : "row" }}
      >
        {fileCoordinates.map((file) => (
          <ColumnContainer flipBoard={flipBoard} key={file}>
            {rankCoordinates.map((rank) => {
              const square = game.board.firstSquareSatisfyingRule((square) =>
                objectMatches({
                  rank,
                  file,
                })(square.coordinates)
              );
              return (
                <Square
                  size={getHexSquareDimensions(file, rank, measurements, square)}
                  square={square}
                  shape={SquareShape.Hex}
                  key={JSON.stringify([rank, file])}
                />
              );
            })}
          </ColumnContainer>
        ))}
      </HexBackboard>
    </HexBackboard>
  );
};

const ColumnContainer = styled(View)<{ flipBoard: boolean }>`
  flex-direction: ${({ flipBoard }): string => (flipBoard ? "column" : "column-reverse")};
`;

function getHexSquareDimensions(
  file: number,
  rank: number,
  measurements: BoardMeasurements,
  square?: GameSquare
): number {
  return square?.hasTokenWithName(TokenName.InvisibilityToken) || !((file + rank) % 2)
    ? measurements.spacings[0]
    : measurements.squareSize;
}

export { HexBoard };
