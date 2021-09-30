import { TileProps } from "ui/Tiles/TileProps";

export type TilePressableProps = TileProps & {
  onPress: () => void;
};
