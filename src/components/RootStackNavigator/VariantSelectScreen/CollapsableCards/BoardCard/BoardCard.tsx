import React, { useState, useMemo, useCallback } from "react";
import { View } from "react-native";
import { SFC } from "primitives";
import styled from "styled-components/native";
import { CollapsableCard } from "ui/Containers";
import { GameOptions } from "game";
import { SimpleGameProvider } from "components/shared";
import { ShadowBoard } from "components/RootStackNavigator/StartScreen/ShadowBoard";
import { GameMaster } from "game";
import { calculateGameOptions } from "game/variantAndRuleProcessing/calculateGameOptions";
import { SelectInput } from "ui/Forms";
import { Row } from "ui";
import { boardOrder, boardVariants, BoardVariantName } from "game/boards";
import { futureVariants } from "game/variants";

interface Props {
  boardVariant: BoardVariantName;
  setBoardVariant: (x: BoardVariantName) => void;
  gameOptions: GameOptions;
  setGameOptions: (x: GameOptions) => void;
}

const BoardCard: SFC<Props> = ({
  boardVariant,
  setBoardVariant,
  gameOptions,
  setGameOptions,
  style,
}) => {
  const [renderDependentMenu, setRenderDependentMenu] = useState(true);
  const reRenderDependentMenu = (): void => {
    setRenderDependentMenu(!renderDependentMenu);
  };

  const displayGameMaster = useMemo(
    () => getDisplayGameMaster(boardVariant, gameOptions.numberOfPlayers),
    [boardVariant, gameOptions.numberOfPlayers]
  );

  const playerOptions = useMemo(() => {
    return dropdownPlayerOptions(boardVariants[boardVariant].allowedPlayers);
  }, [boardVariant]);

  const setNumberOfPlayers = useCallback(
    (numberOfPlayers: number): void =>
      setGameOptions({ ...gameOptions, numberOfPlayers }),
    [gameOptions, setGameOptions]
  );

  return (
    <CollapsableCard title={"Board"} style={[style, { overflow: "visible" }]}>
      <Row style={{ height: 200 }}>
        <BoardContainer>
          <SimpleGameProvider gameMaster={displayGameMaster}>
            <ShadowBoard fadeCover={false} />
          </SimpleGameProvider>
        </BoardContainer>
        <DropdownContainer>
          <SelectInput
            style={{ width: "100%", height: 15, overflow: "visible", marginTop: 8 }}
            options={playerOptions}
            onChange={(value): void => {
              setNumberOfPlayers(value);
            }}
            key={renderDependentMenu ? 1 : 0}
          />
          <SelectInput
            style={{
              flex: 1,
              width: "100%",
              height: 15,
              overflow: "visible",
            }}
            options={boardOrder.flatMap((boardVariant) => [
              {
                label: futureVariants[boardVariant].title,
                value: boardVariants[boardVariant],
              },
            ])}
            onChange={(value): void => {
              setBoardVariant(value.variant);
              setNumberOfPlayers(
                boardVariants[value.variant as BoardVariantName].allowedPlayers[0]
              );
              reRenderDependentMenu();
            }}
          />
        </DropdownContainer>
      </Row>
    </CollapsableCard>
  );
};

const DropdownContainer = styled(View)`
  overflow: visible;
  flex: 1;
  margin-left: 12;
  margin-right: 4;
  flex-direction: column-reverse;
  align-self: flex-start;
`;

const BoardContainer = styled(View)`
  width: 200;
  height: 200;
  justify-content: center;
  align-items: center;
`;

export { BoardCard };

function getDisplayGameMaster(board: BoardVariantName, players: number): GameMaster {
  return new GameMaster(
    ...GameMaster.processConstructorInputs({
      gameOptions: calculateGameOptions(
        { checkEnabled: false, numberOfPlayers: players },
        [board]
      ),
    })
  );
}

function dropdownPlayerOptions(allowablePlayers: number[]): PlayerOption[] {
  return allowablePlayers.flatMap((playerNumber) => [
    {
      label: playerNumber.toString() + " Players",
      value: playerNumber,
    },
  ]);
}

interface PlayerOption {
  label: string;
  value: number;
}
