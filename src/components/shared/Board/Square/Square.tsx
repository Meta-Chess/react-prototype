import React, { useContext } from "react";
import { View } from "react-native";
import { SFC } from "primitives";
import { Piece, PieceAnimation, ShadowPiece } from "../Piece";
import { GridArrangement } from "./GridArrangement";
import { Square, SquareShape } from "game";
import { TilePressableContainer } from "./TilePressableContainer";
import { AnimationOverlays, LoadingOverlay } from "./AnimationOverlays";
import { Highlights } from "./Highlight";
import { useModals } from "ui";
import { Token } from "game/types";
import { getDisplayPiecesAndTokens } from "./getDisplayPiecesAndTokens";
import { hexSvgScaleFactor } from "primitives/Tiles";
import { GameContext } from "components/shared";
import { TileSchematic } from "ui/Tiles/TileProps";
import { OuterContainer } from "./OuterContainer";
import { TileBase } from "./TileBase";
import { PositioningContainer } from "./PositioningContainer";
import { useGetSquareBackgroundColor } from "components/shared/Board/Square/useGetSquareBackgroundColor";

interface Props {
  square: Square | undefined;
  shape: SquareShape;
  tileSchematic?: TileSchematic;
  size?: number;
}

const SquareComponent: SFC<Props> = ({
  style,
  square,
  size = 0,
  shape,
  tileSchematic,
}) => {
  const modals = useModals();
  const { gameMaster } = useContext(GameContext);

  const backgroundColor = useGetSquareBackgroundColor(square, shape);

  if (!gameMaster) return null;
  if (!square) return <View style={[style, { width: size, height: size }]} />;

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
  const hexGridScaleFactor = 1 + (hexSvgScaleFactor - 1) / 3; // further scaling for hex svg overflowing hex tile
  const pieceScaleFactor = shape === SquareShape.Hex ? 0.9 * hexGridScaleFactor : 1;
  const pieceSize =
    tileSchematic?.centerMaxEmbeddedDiameter ??
    (pieceScaleFactor * size) / pieceGridDimension;
  // TODO: For chess plus add and use shadowPieceSize

  const onPress = (): void => {
    modals.hideAll();
    gameMaster.onSquarePress(square.location);
  };

  return (
    <OuterContainer size={size} tileSchematic={tileSchematic}>
      <TileBase
        shape={shape}
        size={size}
        color={backgroundColor}
        tileSchematic={tileSchematic}
        onPress={onPress}
      />
      <TilePressableContainer shape={shape} size={size} onPress={onPress}>
        <PositioningContainer
          size={pieceScaleFactor * size}
          tileSchematic={tileSchematic}
        >
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
        <Highlights
          gameMaster={gameMaster}
          square={square}
          size={size}
          shape={shape}
          tileSchematic={tileSchematic}
        />
        <PositioningContainer
          size={pieceScaleFactor * size}
          tileSchematic={tileSchematic}
        >
          <GridArrangement>
            {piecesOrPieceAnimationsOnSquare.map((pieceOrToken, index) =>
              typeof pieceOrToken === "string" ? (
                <Piece
                  piece={gameMaster.game.board.findPieceById(pieceOrToken)}
                  size={pieceSize}
                  squareShape={shape}
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
      <AnimationOverlays
        square={square}
        shape={shape}
        size={size}
        tileSchematic={tileSchematic}
      />
      {gameMaster.loadingSquares.includes(square.location) && (
        <LoadingOverlay shape={shape} size={size} tileSchematic={tileSchematic} />
      )}
    </OuterContainer>
  );
};

export { SquareComponent as Square };
