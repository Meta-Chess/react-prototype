import React, { useCallback } from "react";
import { View } from "react-native";
import { AdviceLevel, FutureVariantName, GameOptions } from "game";
import { SFC, Colors } from "primitives";
import styled from "styled-components/native";
import { HelpMenu } from "components/shared";
import { PlayerOptions } from "./PlayerOptions";
import { FormatOptions } from "./FormatOptions";
import { FormatName } from "game/formats";
interface Props {
  gameOptions: GameOptions;
  setGameOptions: (x: GameOptions) => void;
  selectedVariants: FutureVariantName[];
  displayVariants: FutureVariantName[];
  conflictLevel: AdviceLevel | undefined;
}

const Topbar: SFC<Props> = ({
  gameOptions,
  setGameOptions,
  selectedVariants,
  displayVariants,
  conflictLevel,
}) => {
  const setNumberOfPlayers = useCallback(
    (numberOfPlayers: number): void =>
      setGameOptions({ ...gameOptions, numberOfPlayers }),
    [gameOptions, setGameOptions]
  );
  const setFormat = useCallback(
    (format: FormatName): void => setGameOptions({ ...gameOptions, format }),
    [gameOptions, setGameOptions]
  );

  return (
    <Container>
      <OptionsContainer>
        <PlayerOptions
          numberOfPlayers={gameOptions.numberOfPlayers}
          setNumberOfPlayers={setNumberOfPlayers}
        />
        <FormatOptions
          format={gameOptions.format}
          setFormat={setFormat}
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
