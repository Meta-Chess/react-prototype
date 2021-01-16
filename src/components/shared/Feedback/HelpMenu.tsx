import React, { FC, useState, useCallback, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Colors, HelpIcon, Styles, BugIcon, FeedbackIcon, useHover } from "primitives";
import { HorizontalSeparator } from "ui";
import { debounce } from "lodash";
import { useRoute } from "navigation";
import { FeedbackListItem } from "./FeedbackListItem";

const MENU_OPTIONS = [
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
] as const;

interface Props {
  context?: Record<string, unknown>;
}

export const HelpMenu: FC<Props> = ({ context }) => {
  const [iconRef, iconHovered] = useHover();
  const [menuRef, menuHovered] = useHover();
  const [menuOpen, setMenuOpen] = useState(false);

  // We need to suppress exhaustive-deps because it struggles with debounce.
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <IconPositioningContainer ref={iconRef}>
      <HelpIcon />
      {menuOpen && (
        <MenuContainer ref={menuRef}>
          {MENU_OPTIONS.map((option) => (
            <>
              <FeedbackListItem {...option} context={contextWithRoute} />
              <HorizontalSeparator />
            </>
          ))}
        </MenuContainer>
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
