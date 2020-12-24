import Color from "color";

export const Colors = {
  WHITE: Color("#FFFFFF"),
  BLACK: Color("#161616"),
  TRANSPARENT: Color().fade(1),
  TEXT: {
    DARK: Color("#212121"),
    LIGHT: Color("#FFFFFF").fade(0.1),
  },
  EMPHATIC: {
    DARK: Color("#000000"),
    LIGHT: Color("#FFFFFF").fade(0.1),
  },
  GREY: Color("#888888"),
  DARKEST: Color("#212121"),
  DARKER: Color("#2A2A2A"),
  DARK: Color("#333333"),
  DARKISH: Color("#4C4C4C"),
  INFO: Color("#4696EC"),
  SUCCESS: Color("#67AC5B"),
  WARNING: Color("#F29C38"),
  ERROR: Color("#E25141"),
  HIGHLIGHT: {
    INFO: Color("#007BFF"),
    SUCCESS: Color("#26EF10"),
    WARNING: Color("#FF8800"),
    ERROR: Color("#FF1900"),
  },
  TRAIT: {
    PIECE: Color("#FF47EE"),
    RESTRICT: Color("#FF2222"),
    ABILITY: Color("#FF5D00"),
    GAME_END: Color("#F0FF00"),
    NEW_PHASE: Color("#8B00FF"),
    GEOMETRY: Color("#00C1FF"),
    TERRAFORM: Color("#0335FC"),
    ALGORITHM: Color("#696867"),
  },
  PLAYER: [Color("#FCFCFC"), Color("#606060")],
  SQUARE: [Color("#A4B9CC"), Color("#E8E5E5"), Color("#DDEEFF")],
  MCHESS_ORANGE: Color("#F26100"),
  MCHESS_BLUE: Color("#99caf7"),
};
