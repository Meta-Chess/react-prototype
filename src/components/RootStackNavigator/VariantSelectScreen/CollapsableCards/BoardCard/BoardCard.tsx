import React, { useState, useMemo, useCallback, useEffect } from "react";
import { View } from "react-native";
import { SFC } from "primitives";
import { GameOptions } from "game";
import { SelectInput } from "ui/Forms";
import { Row } from "ui";
import { FormatName } from "game/formats";
import { Colors } from "primitives";
import { CollapsableCard } from "ui";
import styled from "styled-components/native";
import {
  SimpleGameProvider,
  StaticBoardViewProvider,
  getDefaultBoardVisualisation,
} from "components/shared";
import { ShadowBoard } from "components/RootStackNavigator/StartScreen/ShadowBoard";
import { GameMaster } from "game";
import { calculateGameOptions } from "game/variantAndRuleProcessing/calculateGameOptions";
import { FutureVariantName } from "game/variants";
import { range } from "utilities";

interface Props {
  selectedVariantsForFormat: FutureVariantName[];
  gameOptions: GameOptions;
  setGameOptions: (x: GameOptions) => void;
}

const BoardCard: SFC<Props> = ({
  selectedVariantsForFormat,
  gameOptions,
  setGameOptions,
  style,
}) => {
  const setNumberOfPlayers = useCallback(
    (numberOfPlayers: number): void =>
      setGameOptions({ ...gameOptions, numberOfPlayers }),
    [gameOptions, setGameOptions]
  );

  const [playerSelectInputKey, setPlayerSelectInputKey] = useState(1);
  const reRenderPlayerSelect = (): void => {
    setPlayerSelectInputKey(playerSelectInputKey ? 0 : 1);
  };

  const { displayGameMaster, playerOptions, currentPlayerOption } = useMemo(() => {
    const displayGameMaster = getDisplayGameMaster(
      selectedVariantsForFormat,
      gameOptions.format,
      gameOptions.numberOfPlayers
    );
    const playerOptions = getPossibleNumberOfPlayers(displayGameMaster).map(
      (players) => ({
        label: players.toString(),
        value: players,
      })
    );
    const currentPlayerOption = playerOptions.find(
      (option) => option.value === gameOptions.numberOfPlayers
    );
    return { displayGameMaster, playerOptions, currentPlayerOption };
  }, [selectedVariantsForFormat, gameOptions]);

  useEffect(() => {
    const possibleNumberOfPlayers = getPossibleNumberOfPlayers(displayGameMaster);

    if (!possibleNumberOfPlayers.includes(gameOptions.numberOfPlayers)) {
      setNumberOfPlayers(possibleNumberOfPlayers[0]);
      reRenderPlayerSelect();
    }
  }, [selectedVariantsForFormat, gameOptions]);

  return (
    <CollapsableCard title={"Board"} style={[style, { overflow: "visible" }]}>
      <Row style={{ justifyContent: "center", flex: 1 }}>
        <SimpleGameProvider gameMaster={displayGameMaster}>
          <BoardContainer>
            <StaticBoardViewProvider
              boardVisualisation={getDefaultBoardVisualisation(displayGameMaster)}
              autoRotateCamera={true}
              backgroundColor={Colors.TRANSPARENT}
            >
              <ShadowBoard shadowFade={1.0} />
            </StaticBoardViewProvider>
          </BoardContainer>
        </SimpleGameProvider>
        <DropdownContainer>
          <SelectInput
            options={playerOptions}
            defaultOption={currentPlayerOption}
            onChange={(value): void => {
              setNumberOfPlayers(value);
            }}
            key={playerSelectInputKey}
          />
        </DropdownContainer>
      </Row>
    </CollapsableCard>
  );
};

export { BoardCard };

const BoardContainer = styled(View)`
  width: 200px;
  height: 200px;
`;

const DropdownContainer = styled(View)`
  width: 56px;
  margin-left: 32px;
`;

function getDisplayGameMaster(
  selectedVariantsForFormat: FutureVariantName[],
  format: FormatName,
  numberOfPlayers: number
): GameMaster {
  return new GameMaster(
    ...GameMaster.processConstructorInputs({
      gameOptions: calculateGameOptions(
        {
          checkEnabled: false,
          numberOfPlayers,
          format,
        },
        selectedVariantsForFormat
      ),
    })
  );
}

function getPossibleNumberOfPlayers(gameMaster: GameMaster): number[] {
  // TODO: update this logic when we can select baseVariants for random and rolling in the frontend
  const format = gameMaster.getFormatName();
  if (["randomVariants", "rollingVariants"].includes(format)) return [2];

  const rules = gameMaster.getRuleNames();
  const maxPlayers = rules.includes("longBoard") ? 6 : 2;
  return range(2, maxPlayers - 1);
}
