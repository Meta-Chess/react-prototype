import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { SFC, Colors } from "primitives";
import { Piece } from "./Piece";
import { GridArrangement } from "./GridArrangement";
import { GameContext } from "game";
import { Square } from "game/Board";
import { SquareShape } from "game/types";
import { Highlight } from "./Highlight";

interface Props {
  square: Square | undefined;
  size: number;
  shape?: SquareShape;
}

const SquareComponent: SFC<Props> = ({ style, square, size, shape }) => {
  const HEX_SQUARE_EMPTY_RATIO = 2 / Math.sqrt(3) - 1;
  const { gameMaster } = useContext(GameContext);
  if (!gameMaster) return null;

  if (!square) {
    const emptySize = shape === SquareShape.Hex ? HEX_SQUARE_EMPTY_RATIO * size : size;
    return <View style={[style, { width: emptySize, height: emptySize }]} />;
  }

  const backgroundColor = Colors.SQUARE[
    colorIndex({ ...square.getCoordinates(), shape })
  ].string();

  const piecesOnSquare = square.pieces;

  const dimension = Math.ceil(Math.sqrt(piecesOnSquare.length));
  const pieceScaleFactor = shape === SquareShape.Hex ? 0.9 : 1; // TODO: this will cause problems with chess plus and hex.
  const pieceSize = (pieceScaleFactor * size) / dimension;

  const onPress = (): void => {
    gameMaster.onPress(square);
  };

  return (
    <PressableContainer
      style={[
        style,
        {
          width: size,
          height: size,
          backgroundColor,
          borderRadius: shape === SquareShape.Hex ? 50 : 0,
        },
      ]}
      onPress={onPress}
      activeOpacity={1}
    >
      <Highlight gameMaster={gameMaster} square={square} />
      <PositioningContainer size={pieceScaleFactor * size}>
        <GridArrangement>
          {piecesOnSquare.map((piece) => (
            <Piece piece={piece} size={pieceSize} key={piece.id} />
          ))}
        </GridArrangement>
      </PositioningContainer>
    </PressableContainer>
  );
};

const colorIndex = ({
  rank,
  file,
  shape,
}: {
  rank: number;
  file: number;
  shape?: SquareShape;
}): number => {
  return shape === SquareShape.Hex ? rank % 3 : (rank + file) % 2;
};

const PressableContainer = styled(TouchableOpacity)`
  overflow: hidden;
`;

const PositioningContainer = styled(View)<{ size: number }>`
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: ${({ size }): number => -size / 2}px;
  margin-top: ${({ size }): number => -size / 2}px;
`;

export { SquareComponent as Square };