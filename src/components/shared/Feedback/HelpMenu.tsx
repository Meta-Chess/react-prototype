import React, { useState, useCallback, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import {
  SFC,
  Colors,
  HelpIcon,
  Styles,
  BugIcon,
  FeedbackIcon,
  useHover,
  InfoIcon,
  TrackingPixel,
} from "primitives";
import { HorizontalSeparator } from "ui";
import { debounce } from "lodash";
import { useRoute } from "navigation";
import { HelpMenuListItem } from "./HelpMenuListItem";
import { BiNews } from "react-icons/bi";

const MENU_OPTIONS = [
  {
    label: "About",
    IconComponent: InfoIcon,
    category: "INFO",
  },
  {
    label: "Bug report",
    IconComponent: BugIcon,
    category: "BUG",
  },
  {
    label: "Suggestions",
    IconComponent: FeedbackIcon,
    category: "SUGGESTION",
  },
  {
    label: "Change log",
    IconComponent: BiNews,
    category: "SUGGESTION",
  },
] as const;

interface Props {
  context?: Record<string, unknown>;
}

export const HelpMenu: SFC<Props> = ({ context, style }) => {
  const [iconRef, iconHovered] = useHover();
  const [menuRef, menuHovered] = useHover();
  const [menuOpen, setMenuOpen] = useState(false);

  const setMenuOpenDebounced = useCallback(
    debounce((open: boolean): void => setMenuOpen(open), 50),
    []
  );

  const menuShouldOpen = iconHovered || menuHovered;
  useEffect(() => {
    setMenuOpenDebounced(menuShouldOpen);
  }, [menuShouldOpen, setMenuOpenDebounced]);

  const contextWithRoute = { route: useRoute(), ...context };

  return (
    <IconPositioningContainer ref={iconRef} style={style}>
      <HelpIcon />
      {menuOpen && (
        <>
          <TrackingPixel urlEnd={"HelpMenuHover"} />
          <MenuContainer ref={menuRef}>
            {MENU_OPTIONS.map((option) => (
              <View key={option.label}>
                <HelpMenuListItem {...option} context={contextWithRoute} />
                <HorizontalSeparator />
              </View>
            ))}
          </MenuContainer>
        </>
      )}
    </IconPositioningContainer>
  );
};

const MenuContainer = styled(View)`
  position: absolute;
  top: 32px;
  right: 0px;
  border-radius: 4px;
  background-color: ${Colors.DARK.toString()};
  ${Styles.BOX_SHADOW}
  width: 200px;
`;

const IconPositioningContainer = styled(View)`
  position: absolute;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  top: 8px;
  right: 8px;
`;
