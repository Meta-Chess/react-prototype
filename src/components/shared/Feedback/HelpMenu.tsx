import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import {
  BugIcon,
  Colors,
  FeedbackIcon,
  HelpIcon,
  InfoIcon,
  SFC,
  Styles,
  TrackingPixel,
  useHover,
} from "primitives";
import { HorizontalSeparator } from "ui";
import { debounce } from "lodash";
import { Screens, useNavigation, useRoute } from "navigation";
import { HelpMenuListItem, HelpMenuListItemProps } from "./HelpMenuListItem";
import { BiNews } from "react-icons/bi";

const getMenuOptions = <T extends Exclude<HelpMenuListItemProps, "context">>(
  navigateToAboutScreen?: () => void,
  openChangeLog?: () => void
): T[] => {
  return [
    {
      label: "About",
      IconComponent: InfoIcon,
      onPress: navigateToAboutScreen,
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
      onPress: openChangeLog,
    },
  ].filter((option) => option.category || option.onPress) as T[];
};

interface Props {
  context?: Record<string, unknown>;
  openChangeLog?: () => void;
}

export const HelpMenu: SFC<Props> = ({ context, style, openChangeLog }) => {
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

  const navigation = useNavigation();
  const navigateToAboutScreen = useCallback(() => {
    navigation.navigate(Screens.AboutScreen);
  }, [navigation]);

  return (
    <IconPositioningContainer ref={iconRef} style={style}>
      <HelpIcon />
      {menuOpen && (
        <>
          <TrackingPixel urlEnd={"HelpMenuHover"} />
          <MenuContainer ref={menuRef}>
            {getMenuOptions(navigateToAboutScreen, openChangeLog).map((option) => (
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
