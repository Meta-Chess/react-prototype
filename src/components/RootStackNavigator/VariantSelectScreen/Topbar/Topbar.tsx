import React from "react";
import { View } from "react-native";
import { AdviceLevel, FutureVariantName } from "game";
import { SFC, Colors } from "primitives";
import styled from "styled-components/native";
import { HelpMenu } from "components/shared";
import { PlayerOptions } from "./PlayerOptions";
import { FormatOptions } from "./FormatOptions";
import { FormatType, PlayersType } from "../VariantSelectScreen"; //temp
interface Props {
  selectedPlayers: PlayersType;
  setSelectedPlayers: (x: PlayersType) => void;
  selectedFormat: FormatType;
  setSelectedFormat: (x: FormatType) => void;
  selectedVariants: FutureVariantName[];
  displayVariants: FutureVariantName[];
  conflictLevel: AdviceLevel | undefined;
}

const Topbar: SFC<Props> = ({
  selectedPlayers,
  setSelectedPlayers,
  selectedFormat,
  setSelectedFormat,
  selectedVariants,
  displayVariants,
  conflictLevel,
}) => {
  return (
    <Container>
      <OptionsContainer>
        <PlayerOptions
          selectedPlayers={selectedPlayers}
          setSelectedPlayers={setSelectedPlayers}
        />
        <FormatOptions
          selectedFormat={selectedFormat}
          setSelectedFormat={setSelectedFormat}
          style={{ marginLeft: 32 }}
        />
      </OptionsContainer>
      <CenterHelpMenu>
        <HelpMenu context={{ selectedVariants, displayVariants, conflictLevel }} />
      </CenterHelpMenu>
    </Container>
  );
};

const Container = styled(View)`
  height: 40px;
  flex-direction: row;
  background-color: ${Colors.DARK.toString()};
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.DARKISH.toString()};
`;

const OptionsContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  padding-left: 16px;
`;

const CenterHelpMenu = styled(View)`
  margin-top: -4;
  align-self: flex-start;
`;

export { Topbar };
