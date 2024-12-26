import React, {
  createContext,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Renderer } from "game/Renderer";
import { GameOptions } from "game/types";
import { GameMaster } from "game/GameMaster";
import { OnlineGameMaster } from "game/OnlineGameMaster";
import axios from "axios";
import { Screens, useNavigation, useRoute } from "navigation";
import { startAutomaticPlay } from "game";

export const GameContext = createContext<{ gameMaster?: GameMaster }>({});

interface SimpleProps {
  gameMaster: GameMaster;
}

export const SimpleGameProvider: FC<SimpleProps> = ({ children, gameMaster }) => {
  useEffect((): (() => void) => {
    return (): void => {
      if (gameMaster instanceof OnlineGameMaster) gameMaster.disconnect();
    };
  }, [gameMaster]);

  return <GameContext.Provider value={{ gameMaster }}>{children}</GameContext.Provider>;
};

interface Props {
  gameOptions?: GameOptions;
  autoPlay?: boolean;
  roomId?: string;
}

// TODO: Clean up
export const GameProvider: FC<Props> = ({
  children,
  gameOptions,
  autoPlay = false,
  roomId: receivedRoomId,
}) => {
  const navigation = useNavigation();
  const { params } = useRoute<Screens.GameScreen>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_updateCounter, setUpdateCounter] = useState(0);
  const [gameMaster, setGameMaster] = useState<GameMaster | undefined>();
  const [roomId, simpleSetRoomId] = useState(receivedRoomId);
  const renderer = useMemo(() => new Renderer(setUpdateCounter), []);

  const setRoomId = useCallback((roomId?: string): void => {
    navigation.setParams({ ...params, roomId }); // For url with roomId
    simpleSetRoomId(roomId);
  }, []);

  const hasGameMaster = gameMaster !== undefined;
  useEffect((): void => {
    if (hasGameMaster && gameMaster instanceof OnlineGameMaster)
      setRoomId(gameMaster?.roomId);
  }, [hasGameMaster]);

  useEffect(() => {
    if (autoPlay && gameMaster) return startAutomaticPlay(gameMaster);
  }, [autoPlay, gameMaster]);

  useEffect((): void => {
    if (hasGameMaster) return;
    if (gameOptions?.spotlight && !roomId) {
      findSpotlightGameRoom().then((foundRoomId) => {
        if (foundRoomId) {
          setRoomId(foundRoomId);
        } else {
          setGameMasterToNewGame({
            renderer,
            setGameMaster,
            roomId,
            gameOptions,
          });
        }
      });
    } else {
      setGameMasterToNewGame({
        renderer,
        setGameMaster,
        roomId,
        gameOptions,
        onSpectating: gameOptions?.spotlight
          ? (): void => setRoomId(undefined)
          : undefined,
      });
    }
  }, [gameOptions, roomId]);

  useEffect((): (() => void) => {
    return (): void => {
      if (gameMaster instanceof OnlineGameMaster) gameMaster.disconnect();
    };
  }, [gameMaster]);

  return <GameContext.Provider value={{ gameMaster }}>{children}</GameContext.Provider>;
};

async function setGameMasterToNewGame({
  renderer,
  setGameMaster,
  roomId,
  gameOptions,
  onSpectating,
}: {
  renderer: Renderer;
  setGameMaster: (gm: GameMaster | undefined) => void;
  roomId?: string;
  gameOptions?: GameOptions;
  onSpectating?: () => void;
}): Promise<void> {
  const newGameMaster =
    gameOptions?.online === true || (gameOptions?.online !== false && roomId)
      ? await OnlineGameMaster.connectNewGame(renderer, gameOptions, roomId, onSpectating)
      : new GameMaster(...GameMaster.processConstructorInputs({ gameOptions, renderer }));

  setGameMaster(newGameMaster);
}

// TODO: default url context?
const DEV_LOBBY_URL =
  process.env.DEV_LOBBY_URL ||
  "https://6hgisa1jjk.execute-api.ap-southeast-2.amazonaws.com/dev/lobby";

async function findSpotlightGameRoom(): Promise<string | undefined> {
  let roomId: string | undefined | null;

  while (roomId === undefined) {
    try {
      const response = await axios.get(DEV_LOBBY_URL);
      if (response.data) {
        roomId =
          response.data.find((game: any) => game?.gameOptions?.spotlight)?.roomId || null; //eslint-disable-line @typescript-eslint/no-explicit-any
      }
    } catch (e) {
      console.log(`Error finding spotlight game: ${e}`); //eslint-disable-line no-console
    }
  }

  return roomId || undefined;
}
