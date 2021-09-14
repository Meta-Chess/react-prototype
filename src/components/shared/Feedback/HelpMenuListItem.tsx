import React, { FC, useCallback } from "react";
import { ListItem, useModals } from "ui";
import { Colors, Text } from "primitives";
import { Category, FeedbackModal } from "./FeedbackModal";

export interface HelpMenuListItemProps {
  context: Record<string, unknown>;
  category?: Category;
  label: string;
  IconComponent: FC<{ color?: string; size?: number }>;
  onPress?: () => void;
}

export const HelpMenuListItem: FC<HelpMenuListItemProps> = ({
  context,
  category,
  label,
  IconComponent,
  onPress,
}) => {
  const modals = useModals();
  const openFeedbackModal = useCallback(() => {
    if (category) {
      modals.show({
        id: Math.random(),
        content: (
          <FeedbackModal category={category} context={context} onClose={modals.hideAll} />
        ),
      });
    }
  }, [category, context, modals]);

  return (
    <ListItem onPress={onPress || openFeedbackModal}>
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
