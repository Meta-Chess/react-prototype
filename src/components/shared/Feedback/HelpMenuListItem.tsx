import React, { FC, useCallback } from "react";
import { ListItem, useModals } from "ui";
import { Colors, Text } from "primitives";
import { Category, FeedbackModal } from "./FeedbackModal";
import { Screens, useNavigation } from "navigation";

interface Props {
  context: Record<string, unknown>;
  category: Category;
  label: string;
  IconComponent: FC<{ color?: string; size?: number }>;
}

export const HelpMenuListItem: FC<Props> = ({
  context,
  category,
  label,
  IconComponent,
}) => {
  const modals = useModals();
  const openFeedbackModal = useCallback(() => {
    modals.show({
      id: Math.random(),
      content: (
        <FeedbackModal category={category} context={context} onClose={modals.hideAll} />
      ),
    });
  }, [category, context, modals]);

  const navigation = useNavigation();
  const navigateToAboutScreen = useCallback(() => {
    navigation.navigate(Screens.AboutScreen);
  }, [navigation]);

  return (
    <ListItem onPress={category === "INFO" ? navigateToAboutScreen : openFeedbackModal}>
      <IconComponent color={Colors.TEXT.LIGHT_SECONDARY.toString()} size={20} />
      <Text
        cat={"BodyS"}
        style={{ marginLeft: 8 }}
        color={Colors.TEXT.LIGHT_SECONDARY.toString()}
      >
        {label}
      </Text>
    </ListItem>
  );
};
