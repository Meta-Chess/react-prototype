import Color from "color";

export const contrast = (color: string): string =>
  Color(color).isLight() ? "#000000" : "#FFFFFF";
