import React, { useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Colors, SFC, Text } from "primitives";
import { Player } from "game/types";
import { Row } from "ui";
import { Timer } from "./Timer";
import { randomChoice, randomInt } from "utilities";

interface Props {
  player: Player;
}

export const PlayerRow: SFC<Props> = ({ style, player }) => {
  const [name] = useState(randomChoice(["Emmanuel", "Gus", "Angus", "Seb", "Matt"]));
  const [iconColor] = useState(randomChoice([Colors.MCHESS_ORANGE, Colors.MCHESS_BLUE]));
  const [rating] = useState(randomInt(400, 2000));

  return (
    <StyledRow style={style}>
      <Row>
        <PlayerIcon style={{ backgroundColor: iconColor.fade(0.3).toString() }} />
        <View style={{ marginLeft: 8 }}>
          <Text cat={"BodyM"}>{name}</Text>
          <Text cat={"BodyXS"} color={Colors.TEXT.LIGHT_SECONDARY.toString()}>
            {rating}
          </Text>
        </View>
      </Row>
      <Timer player={player} />
    </StyledRow>
  );
};

const StyledRow = styled(Row)`
  justify-content: space-between;
  padding: 12px 8px;
`;

// We should do real player icons sometime
const PlayerIcon = styled(View)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
