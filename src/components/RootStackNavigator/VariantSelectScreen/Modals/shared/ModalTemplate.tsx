import React, { ReactNode } from "react";
import { SFC, Colors } from "primitives";
import {
  ButtonLight,
  ButtonSecondaryLight,
  Button,
  ButtonSecondary,
  Card,
  Footer,
} from "ui";
import { Styles } from "primitives/Styles";
import styled from "styled-components/native";

interface Props {
  title: string;
  reset: () => void;
  done: () => void;
  priority: "primary" | "secondary";
  titleComponent?: ReactNode;
  subtitle?: string;
}

export const ModalTemplate: SFC<Props> = ({
  title,
  reset,
  done,
  priority,
  titleComponent,
  subtitle,
  children,
  style,
}) => {
  return (
    <ModalCard
      style={style}
      title={title}
      titleComponent={titleComponent}
      subtitle={subtitle}
    >
      <Footer style={{ padding: 0 }} />
      {children}
      <Footer>
        {priority === "primary" && (
          <>
            <ButtonSecondary label={"Reset"} style={{ flex: 1 }} onPress={reset} />
            <Button label={"Done"} style={{ flex: 1, marginLeft: 8 }} onPress={done} />
          </>
        )}
        {priority === "secondary" && (
          <>
            <ButtonSecondaryLight label={"Reset"} style={{ flex: 1 }} onPress={reset} />
            <ButtonLight
              label={"Done"}
              style={{ flex: 1, marginLeft: 8 }}
              onPress={done}
            />
          </>
        )}
      </Footer>
    </ModalCard>
  );
};

const ModalCard = styled(Card)`
  ${Styles.BOX_SHADOW_STRONG}
  background-color: ${Colors.DARKER.toString()};
  max-height: 400px;
`;
