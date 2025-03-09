import React, { FC, Fragment, ReactNode } from "react";
import { PieceDecorationName } from "components/shared/Board/Piece/getPieceDecorationNames";
import { Path, Svg, G } from "react-native-svg";

interface Props {
  pieceDecorationNames?: PieceDecorationName[];
}

// TODO: Probably better to extract decorations as components absolutely positioned on the PieceImage (rather than paths/svgs in here)
export const DecorationsBelowPiece: FC<Props> = ({ pieceDecorationNames }) => {
  if (pieceDecorationNames === undefined || pieceDecorationNames.length === 0) {
    return null;
  }

  return (
    <>
      {pieceDecorationNames?.map((pieceDecorationName, index) => {
        const decorations = getDecorationsBelowPiece(pieceDecorationName);

        return <Fragment key={index}>{decorations}</Fragment>;
      })}
    </>
  );
};

export function getDecorationsBelowPiece(name: PieceDecorationName): ReactNode {
  if (name === PieceDecorationName.NimbusSymbol) {
    // Note- this doesn't actually need to be below the piece anymore
    return (
      <Svg viewBox="0 0 3061.42 3061.42">
        <G scale={0.3} translate={[1814, 220]}>
          <Path
            fill="#F5BF03"
            stroke="#996515"
            strokeWidth={80}
            strokeMiterlimit="10"
            d="M2370.66,1330.37l281.777-447.62l-528.539,20.215
	c-98.279-92.933-217.014-161.483-346.637-200.13L1530.5,234.999l-246.762,467.836c-129.623,38.646-248.356,107.197-346.636,200.13
	L408.563,882.75l281.777,447.62c-31.343,131.58-31.343,268.681,0,400.261L408.563,2178.25l528.539-20.215
	c98.28,92.934,217.013,161.484,346.636,200.131l246.762,467.835l246.762-467.835c129.623-38.646,248.357-107.197,346.637-200.131
	l528.539,20.215l-281.777-447.619C2402.004,1599.051,2402.004,1461.949,2370.66,1330.37z M1530.5,1900.643
	c-204.424,0-370.143-165.719-370.143-370.143c0-204.424,165.719-370.143,370.143-370.143c204.424,0,370.143,165.719,370.143,370.143
	C1900.643,1734.924,1734.924,1900.643,1530.5,1900.643z"
          />
        </G>
      </Svg>
    );
  }
  return null;
}
