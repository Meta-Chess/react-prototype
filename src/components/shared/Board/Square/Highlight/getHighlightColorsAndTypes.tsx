import { Colors } from "primitives";
import { GameMaster, Square, SquareInfo } from "game";
import Color from "color";

export const getHighlightColorsAndTypes = ({
  gameMaster,
  square,
}: {
  gameMaster: GameMaster;
  square: Square;
}): { color: Color; type: "center" | "tile" }[] => {
  return gameMaster.squaresInfo
    .get(square.location) // TODO: sort highlights?
    .map((info) =>
      highlightShouldCoverWholeTile({ info, square })
        ? { type: "tile", color: HIGHLIGHT_COLORS[info].fade(0.3) }
        : {
            type: "center",
            color: HIGHLIGHT_COLORS[info],
          }
    );
};

function highlightShouldCoverWholeTile({
  info,
  square,
}: {
  info: SquareInfo;
  square: Square;
}): boolean {
  return (
    ![
      SquareInfo.PossibleMovePassiveEndPoint,
      SquareInfo.PossibleMoveAggressiveEndPoint,
      SquareInfo.PossibleOtherPlayerMoveEndPoint,
    ].includes(info) || square.hasPiece()
  );
}

const HIGHLIGHT_COLORS: { [key in SquareInfo]: Color } = {
  [SquareInfo.PossibleMovePassiveEndPoint]: Colors.HIGHLIGHT.SUCCESS,
  [SquareInfo.PossibleMoveAggressiveEndPoint]: Colors.HIGHLIGHT.ERROR,
  [SquareInfo.PossibleOtherPlayerMoveEndPoint]: Colors.HIGHLIGHT.INFO,
  [SquareInfo.SelectedCurrentPlayerPiece]: Colors.HIGHLIGHT.WARNING,
  [SquareInfo.SelectedOtherPlayerPiece]: Colors.HIGHLIGHT.INFO,
  [SquareInfo.LastMoveStartPoint]: Colors.HIGHLIGHT.WARNING_LIGHT.fade(0.3),
  [SquareInfo.LastMoveEndPoint]: Colors.HIGHLIGHT.WARNING_LIGHT.fade(0.3),
  [SquareInfo.LastMovePath]: Colors.HIGHLIGHT.WARNING_LIGHT.fade(0.5),
};
