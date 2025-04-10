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
import { FcRules } from "react-icons/fc";

const getMenuOptions = <T extends Exclude<HelpMenuListItemProps, "context">>(
  navigateToAboutScreen?: () => void,
  ruleConfig?: string[]
): T[] => {
  return [
    {
      label: "About",
      IconComponent: InfoIcon,
      onPress: navigateToAboutScreen,
    },
    ...(ruleConfig && ruleConfig.length > 0
      ? [
          {
            label: "Rules",
            IconComponent: FcRules,
            onPress: undefined,
          },
        ]
      : []),
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
  ].filter(
    (option) =>
      option.category ||
      option.onPress ||
      (option.label === "Rules" && ruleConfig?.length)
  ) as T[];
};

interface Props {
  context?: Record<string, unknown>;
  ruleConfig?: string[];
}

export const HelpMenu: SFC<Props> = ({ context, style, ruleConfig }) => {
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
            {getMenuOptions(navigateToAboutScreen, ruleConfig).map((option) => (
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
  right: 6px;
`;
