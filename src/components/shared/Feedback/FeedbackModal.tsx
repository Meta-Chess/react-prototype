import React, { FC, useCallback, useState } from "react";
import { AbsoluteView, ButtonSecondary, Card, Row, Spinner, TextInput } from "ui";
import { Text, Colors, CloseIcon } from "primitives";
import { IconButton } from "ui/Buttons/IconButton";
import styled from "styled-components/native";

interface Props {
  category: Category;
  context: Record<string, unknown>;
  onClose: () => void;
}

export type Category = "BUG" | "SUGGESTION";

const HEADERS: { [cat in Category]: string } = {
  BUG: "What went wrong?",
  SUGGESTION: "What could we do better?",
};

const PLACEHOLDERS: { [cat in Category]: string } = {
  BUG: "Please enter lots of details!",
  SUGGESTION: "Please give details!",
};

export const FeedbackModal: FC<Props> = ({ category, context, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const submit = useCallback(
    (message): void => {
      setLoading(true);
      setError(false);
      fetch("https://6hgisa1jjk.execute-api.ap-southeast-2.amazonaws.com/dev/feedback", {
        method: "POST",
        body: JSON.stringify({
          category,
          message,
          context,
        }),
      })
        .then(onClose)
        .catch((error) => {
          console.log(error); // eslint-disable-line no-console
          setError(true);
          setLoading(false);
        });
    },
    [category, context, onClose]
  );

  const headerText = HEADERS[category];

  const placeholder = PLACEHOLDERS[category];

  return (
    <Card style={{ width: 440, height: 300 }}>
      <Row style={{ justifyContent: "space-between" }}>
        <Text cat={"DisplayS"}>{headerText}</Text>
        <IconButton Icon={CloseIcon} onPress={onClose} />
      </Row>
      <TextInput
        value={message}
        placeholder={placeholder}
        multiline
        onChangeText={(text: string): void => setMessage(text)}
        style={{ marginTop: 16, flex: 1 }}
      />
      <ButtonRow>
        <Text cat={"BodyXS"} color={Colors.ERROR.toString()} style={{ marginTop: 8 }}>
          {error ? "Failed to send. Try again?" : " "}
        </Text>
        <ButtonSecondary
          label={"Submit"}
          onPress={(): void => submit(message)}
          style={{ width: 140, marginTop: 16 }}
        />
      </ButtonRow>
      {loading && (
        <AbsoluteView style={{ backgroundColor: Colors.DARKEST.fade(0.2).toString() }}>
          <Spinner />
        </AbsoluteView>
      )}
    </Card>
  );
};

const ButtonRow = styled(Row)`
  justify-content: space-between;
`;
