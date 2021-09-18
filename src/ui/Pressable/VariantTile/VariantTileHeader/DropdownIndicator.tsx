import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { SFC, Colors, useHover } from "primitives";
import { DownCaretIcon } from "primitives/icons";

interface Props {
  showAdvancedMenu: boolean;
  setShowAdvancedMenu: (x: boolean) => void;
}
export const DropdownIndicator: SFC<Props> = ({
  showAdvancedMenu,
  setShowAdvancedMenu,
  style,
}) => {
  const [dropdownRef, dropdownHovered] = useHover();
  useEffect(() => {
    if (dropdownHovered) {
      setShowAdvancedMenu(true);
    }
  }, [dropdownHovered]);

  return (
    <TouchableOpacity style={style} ref={dropdownRef}>
      <DownCaretIcon
        color={
          showAdvancedMenu
            ? Colors.TEXT.LIGHT_SECONDARY.fade(0.7).toString()
            : Colors.TEXT.LIGHT_SECONDARY.toString()
        }
      />
    </TouchableOpacity>
  );
};
