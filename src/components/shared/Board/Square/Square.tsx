import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { SFC, Colors } from "primitives";
import { Piece } from "./Piece";
import { ShadowPiece } from "./ShadowPiece";
import { GridArrangement } from "./GridArrangement";
import { GameContext } from "game";
import { Square } from "game/Board";
import { SquareShape } from "game/types";
import { HexTile } from "./HexTile";
import { Highlight } from "./Highlight";

interface Props {
  square: Square | undefined;
  size: number;
  shape?: SquareShape;
}

const SquareComponent: SFC<Props> = ({ style, square, size, shape }) => {
  const GRAPHIC_HEX_TILING = true; //true for Hex over Circle, TODO: bundle into graphic options, or choose one over the other
  const { gameMaster } = useContext(GameContext);
  if (!gameMaster) return null;

  if (!square) return <View style={[style, { width: size, height: size }]} />;

  const backgroundColor = Colors.SQUARE[
    colorIndex({ ...square.getCoordinates(), shape })
  ].string();

  const piecesOnSquare = square.pieces;
  const { pieceIds: piecesUnderSquare } = gameMaster.interrupt.for.piecesUnderSquare({
    square,
    board: gameMaster.game.board,
    pieceIds: [],
  });

  const pieceGridDimension = Math.ceil(Math.sqrt(piecesOnSquare.length)) || 1;
  const pieceScaleFactor = shape === SquareShape.Hex ? 0.9 : 1;
  const pieceSize = (pieceScaleFactor * size) / pieceGridDimension;
  // TODO: For chess plus add and use shadowPieceSize

  const onPress = (): void => {
    gameMaster.onPress(square.location);
  };

  return (
    <OuterContainer size={size}>
      {shape === SquareShape.Hex && GRAPHIC_HEX_TILING && (
        <HexTile radius={size / 2} color={backgroundColor} />
      )}
      <PressableContainer
        size={size}
        style={[
          style,
          {
            backgroundColor:
              shape === SquareShape.Hex && GRAPHIC_HEX_TILING
                ? "transparent"
                : backgroundColor,
            borderRadius: shape === SquareShape.Hex ? 50 : 0,
            overflow:
              shape === SquareShape.Hex && GRAPHIC_HEX_TILING ? "visible" : "hidden",
          },
        ]}
        onPress={onPress}
        activeOpacity={1}
      >
        <PositioningContainer size={pieceScaleFactor * size}>
          <GridArrangement>
            {piecesUnderSquare.map((piece) => (
              <ShadowPiece
                piece={gameMaster.game.board.pieces[piece]}
                size={pieceSize}
                key={piece}
              />
            ))}
          </GridArrangement>
        </PositioningContainer>
        <Highlight gameMaster={gameMaster} square={square} size={size} shape={shape} />
        <PositioningContainer size={pieceScaleFactor * size}>
          <GridArrangement>
            {piecesOnSquare.map((piece) => (
              <Piece
                piece={gameMaster.game.board.pieces[piece]}
                size={pieceSize}
                key={piece}
              />
            ))}
          </GridArrangement>
        </PositioningContainer>
      </PressableContainer>
    </OuterContainer>
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

const OuterContainer = styled(View)<{ size: number }>`
  overflow: visible;
  width: ${({ size }): number => size}px;
  height: ${({ size }): number => size}px;
  background-color: transparent;
`;

const PressableContainer = styled(TouchableOpacity)<{ size: number }>`
  position: absolute;
  width: ${({ size }): number => size}px;
  height: ${({ size }): number => size}px;
`;

const PositioningContainer = styled(View)<{ size: number }>`
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: ${({ size }): number => -size / 2}px;
  margin-top: ${({ size }): number => -size / 2}px;
  width: ${({ size }): number => size}px;
  height: ${({ size }): number => size}px;
`;

export { SquareComponent as Square };
