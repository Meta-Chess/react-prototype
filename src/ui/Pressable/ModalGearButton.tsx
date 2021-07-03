import React from "react";
import { TouchableOpacity } from "react-native";
import { SFC, Colors, useHover } from "primitives";
import { SparkleGearIcon } from "primitives/icons";
import { ModalInfo } from "components/RootStackNavigator/VariantSelectScreen/Modals/shared/ModalTypes";

interface Props {
  modalInfo: ModalInfo;
  setModalInfo: (x: ModalInfo) => void;
}
export const ModalGearButton: SFC<Props> = ({ modalInfo, setModalInfo, style }) => {
  const [ref, hovered] = useHover();
  return (
    <TouchableOpacity
      style={style}
      ref={ref}
      onPress={(): void => {
        setModalInfo(modalInfo);
      }}
    >
      <SparkleGearIcon
        color={
          hovered
            ? Colors.TEXT.LIGHT_SECONDARY.fade(0.7).toString()
            : Colors.TEXT.LIGHT_SECONDARY.toString()
        }
      />
    </TouchableOpacity>
  );
};
