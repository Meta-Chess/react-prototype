import React, { useContext, FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Colors } from "primitives";
import { objectMatches, range } from "utilities";
import { TokenName, SquareShape } from "game";
import { Square } from "./Square";
import { BoardProps } from "components/shared/Board/Board";
import { HexBackboard } from "./HexBackboard";
import { GameContext } from "components/shared";

const HexBoard: FC<BoardProps> = ({
  backboard = true,
  measurements,
  flipBoard = false,
}) => {
  const { gameMaster } = useContext(GameContext);
  const game = gameMaster?.game;
  if (!game) return null;

  const { minRank, maxRank, minFile, maxFile } = measurements.rankAndFileBounds;
  const fileCoordinates = range(minFile, maxFile - minFile + 1);
  const rankCoordinates = range(minRank, maxRank - minFile + 1);

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
              const square = game.board.firstSquareSatisfyingRule(
                (square) =>
                  objectMatches({
                    rank,
                    file,
                  })(square.coordinates) &&
                  !square.hasTokenWithName(TokenName.InvisibilityToken)
              );
              // TODO: Handle hidden squares in hex better - maybe a rule to determine which coordinates belong on a hex grid?
              return (
                <Square
                  size={square ? measurements.squareSize : measurements.spacings[0]}
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

export { HexBoard };
