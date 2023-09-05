import React from "react";
import { View } from "react-native";
import { SFC } from "primitives";
import { PieceName } from "game/types";
import { pieceDisplayOrder } from "game/displayInfo";
import { PieceButton } from "./PieceButton";

interface Props {
  optionPieceCycles: PieceName[][];
  setOptionPieceCycles: (optionPieceCycles: PieceName[][]) => void;
  excludePieces: PieceName[];
}

export const PieceSelectRow: SFC<Props> = ({
  optionPieceCycles,
  setOptionPieceCycles,
  excludePieces,
  style,
}) => {
  const piecesToDisplay = pieceDisplayOrder.filter(
    (pieceName) => !excludePieces.includes(pieceName)
  );

  return (
    <View
      style={[
        style,
        {
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
        },
      ]}
    >
      {Object.values([...piecesToDisplay].reverse())
        .filter((name) => name !== undefined)
        .map((name) => {
          const pieceUsed = optionPieceCycles
            .flatMap((pieceCycle: PieceName[]) => pieceCycle)
            .includes(name);
          return (
            <PieceButton
              key={name}
              onPress={onPieceButtonPress(name, optionPieceCycles, setOptionPieceCycles)}
              disabled={pieceUsed}
              pieceName={name}
              style={{ margin: 2 }}
              size={40}
            />
          );
        })}
    </View>
  );
};

const onPieceButtonPress =
  (
    pieceName: PieceName,
    optionPieceCycles: PieceName[][],
    setOptionPieceCycles: (optionPieceCycles: PieceName[][]) => void
  ) =>
  (): void => {
    setOptionPieceCycles([
      ...optionPieceCycles.slice(0, optionPieceCycles.length - 1),
      [...optionPieceCycles[optionPieceCycles.length - 1], pieceName],
    ]);
  };
