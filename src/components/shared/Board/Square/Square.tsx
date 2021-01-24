import React, { useContext } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC, Colors } from "primitives";
import { Piece, ShadowPiece, PieceAnimation } from "../Piece";
import { GridArrangement } from "./GridArrangement";
import { GameContext, Square, SquareShape } from "game";
import { TilePressableContainer } from "./TilePressableContainer";
import { AnimationOverlays } from "./AnimationOverlays";
import { Highlight } from "./Highlight";
import { useModals, Tile } from "ui";
import { Token } from "game/types";
import { getPiecesDisplayOnSquare } from "./getPiecesDisplayOnSquare";

interface Props {
  square: Square | undefined;
  size: number;
  shape: SquareShape;
}

const SquareComponent: SFC<Props> = ({ style, square, size, shape }) => {
  const modals = useModals();
  const { gameMaster } = useContext(GameContext);
  if (!gameMaster) return null;

  if (!square) return <View style={[style, { width: size, height: size }]} />;

  const backgroundColor = Colors.SQUARE[
    colorIndex({ ...square.getCoordinates(), shape })
  ].string();

  const piecesOrPieceAnimationsOnSquare: (string | Token)[] = getPiecesDisplayOnSquare(
    square
  );
  const { pieceIds: piecesUnderSquare } = gameMaster.interrupt.for.piecesUnderSquare({
    //todo: handle piece animation with chess+ and shadows
    square,
    board: gameMaster.game.board,
    pieceIds: [],
  });

  const pieceGridDimension =
    Math.ceil(Math.sqrt(piecesOrPieceAnimationsOnSquare.length)) || 1;
  const pieceScaleFactor = shape === SquareShape.Hex ? 0.9 : 1;
  const pieceSize = (pieceScaleFactor * size) / pieceGridDimension;
  // TODO: For chess plus add and use shadowPieceSize

  const onPress = (): void => {
    modals.hideAll();
    gameMaster.onPress(square.location);
  };

  return (
    <OuterContainer size={size}>
      <Tile shape={shape} size={size} color={backgroundColor} />
      <TilePressableContainer shape={shape} size={size} onPress={onPress}>
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
            {piecesOrPieceAnimationsOnSquare.map((pieceOrToken, index) =>
              typeof pieceOrToken === "string" ? (
                <Piece
                  piece={gameMaster.game.board.findPieceById(pieceOrToken)}
                  size={pieceSize}
                  key={index}
                />
              ) : (
                <PieceAnimation
                  token={pieceOrToken}
                  size={pieceSize}
                  key={pieceOrToken?.data?.id}
                />
              )
            )}
          </GridArrangement>
        </PositioningContainer>
      </TilePressableContainer>
      <AnimationOverlays square={square} shape={shape} size={size} />
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
