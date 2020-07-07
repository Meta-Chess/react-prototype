import React, { FC, useContext } from "react";
import { PieceImage } from "primitives";
import { GameContext } from "domain/gameState";
import { Piece, PieceType, SetState, State } from "domain/types";
import update from "immutability-helper";
import { phases } from "domain/variants";
import {TouchableOpacity} from "react-native";

interface Props {
  piece: Piece;
  size: number;
  promoteTo: PieceType;
}

const PromotionPiece: FC<Props> = ({ piece, size, promoteTo }) => {
  const { gameState, setGameState } = useContext(GameContext);

  return (
    <TouchableOpacity
      style={{ height: size, width: size }}
      onPress={doPromotion(gameState, setGameState, piece, promoteTo)}
    >
      <PieceImage type={promoteTo} color={piece.color} size={100} />
    </TouchableOpacity>
  );
};

// TODO: Extract this logic
const doPromotion = (
  state: State,
  setState: SetState,
  piece: Piece,
  promoteTo: PieceType
) => () => {
  console.log("promoting", piece, promoteTo);
  const pieceIndex = state.pieces.findIndex((p) => p.id === piece.id);
  state = update(state, {
    pieces: { [pieceIndex]: { type: { $set: promoteTo } } },
    popUp: { $set: undefined },
  });
  state = phases[state.phase].onPhaseStart(state, setState);
  setState(state);
  return state;
};

export { PromotionPiece };
