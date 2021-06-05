import React from "react";
import { View } from "react-native";
import { SFC } from "primitives";
import { PieceName } from "game/types";
import { pieceDisplayOrder } from "game/displayInfo";
import { PieceButton } from "./PieceButton";

interface Props {
  optionPieceCycles: PieceName[][];
  setOptionPieceCycles: (optionPieceCycles: PieceName[][]) => void;
}

export const PieceSelectRow: SFC<Props> = ({
  optionPieceCycles,
  setOptionPieceCycles,
  style,
}) => {
  return (
    <View
      style={[style, { flex: 1, flexDirection: "row", justifyContent: "space-evenly" }]}
    >
      {Object.values([...pieceDisplayOrder].reverse())
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
              size={40}
            />
          );
        })}
    </View>
  );
};

const onPieceButtonPress = (
  pieceName: PieceName,
  optionPieceCycles: PieceName[][],
  setOptionPieceCycles: (optionPieceCycles: PieceName[][]) => void
) => (): void => {
  setOptionPieceCycles([
    ...optionPieceCycles.slice(0, optionPieceCycles.length - 1),
    [...optionPieceCycles[optionPieceCycles.length - 1], pieceName],
  ]);
};
