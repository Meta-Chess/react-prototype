import React, { useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Colors, SFC, Text } from "primitives";
import { PlayerName } from "game";
import { Row } from "ui";
import { Timer } from "components/shared";
import { randomChoice, randomInt } from "utilities";

interface Props {
  player: PlayerName;
}

export const PlayerRow: SFC<Props> = ({ style, player }) => {
  const [name] = useState(randomChoice(["Emmanuel", "Gus", "Angus", "Seb", "Stockfish"]));
  const [iconColor] = useState(randomChoice([Colors.MCHESS_ORANGE, Colors.MCHESS_BLUE]));
  const [rating] = useState(randomInt(100, 3000));

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
      <Timer playerName={player} />
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
