import { FutureVariantName } from "game";

export interface CurrentCardProps {
  selectedVariants: FutureVariantName[];
  setSelectedVariants: (x: FutureVariantName[]) => void;
}
