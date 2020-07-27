import Color from "color";

export const opacify = (color: string, opacity: number): string =>
  Color(color).alpha(opacity).string();
