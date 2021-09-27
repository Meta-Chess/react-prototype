import React, { useContext } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC, Colors } from "primitives";
import { Piece, ShadowPiece, PieceAnimation } from "../Piece";
import { GridArrangement } from "./GridArrangement";
import { RuleName, Square, SquareShape } from "game";
import { TilePressableContainer } from "./TilePressableContainer";
import { AnimationOverlays, LoadingOverlay } from "./AnimationOverlays";
import { Highlight } from "./Highlight";
import { useModals, Tile } from "ui";
import { Token } from "game/types";
import { getDisplayPiecesAndTokens } from "./getDisplayPiecesAndTokens";
import { hexSvgScaleFactor } from "primitives/Tiles";
import { GameContext } from "components/shared";
import { TokenName } from "game";

interface Props {
  square: Square | undefined;
  size: number;
  shape: SquareShape;
}

const SquareComponent: SFC<Props> = ({ style, square, size, shape }) => {
  const modals = useModals();
  const { gameMaster } = useContext(GameContext);
  const rules = gameMaster?.getRuleNames();
  if (!gameMaster) return null;

  if (!square) return <View style={[style, { width: size, height: size }]} />;

  const backgroundColor = calculateBackgroundColor(square, shape, rules);

  const piecesOrPieceAnimationsOnSquare: (string | Token)[] =
    getDisplayPiecesAndTokens(square);
  const { pieceIds: piecesUnderSquare } = gameMaster.interrupt.for.piecesUnderSquare({
    // TODO: handle piece animation with chess+ and shadows
    square,
    board: gameMaster.game.board,
    pieceIds: [],
  });

  const pieceGridDimension =
    Math.ceil(Math.sqrt(piecesOrPieceAnimationsOnSquare.length)) || 1;
  const hexGridScaleFactor = 1 + (hexSvgScaleFactor - 1) / 3; //further scaling for hex svg overflowing hex tile
  const pieceScaleFactor = shape === SquareShape.Hex ? 0.9 * hexGridScaleFactor : 1;
  const pieceSize = (pieceScaleFactor * size) / pieceGridDimension;
  // TODO: For chess plus add and use shadowPieceSize

  const onPress = (): void => {
    modals.hideAll();
    gameMaster.onSquarePress(square.location);
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
      {gameMaster.loadingSquares.includes(square.location) && (
        <LoadingOverlay shape={shape} size={size} />
      )}
    </OuterContainer>
  );
};

function calculateBackgroundColor(
  square: Square,
  shape: SquareShape,
  rules?: RuleName[]
): string {
  return Colors.SQUARE[colorIndex({ ...square.getCoordinates(), shape })]
    .fade(shouldFadeSquare(square, rules) ? 0.2 : 0)
    .string();
}
function shouldFadeSquare(square: Square, rules?: RuleName[]): boolean {
  return (
    !!rules?.includes("thinIce") &&
    (square.firstTokenWithName(TokenName.ThinIce)?.data?.thinIceData ?? 2) <= 1
  );
}

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
