import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { GameOptions } from "game";

// This is duplicated in GameContext
//TODO: default url context?
const DEV_LOBBY_URL =
  process.env.DEV_LOBBY_URL ||
  "https://6hgisa1jjk.execute-api.ap-southeast-2.amazonaws.com/dev/lobby";

export interface LobbyGame {
  roomId: string;
  gameOptions: GameOptions;
}

export interface LobbyQueryResult {
  data: LobbyGame[] | undefined;
  error: boolean;
  loading: boolean;
}

export function useLobbyQuery({
  pollInterval,
}: {
  pollInterval?: number;
}): LobbyQueryResult {
  const [data, setData] = useState<LobbyGame[]>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback((): void => {
    setLoading(true);
    axios
      .get(DEV_LOBBY_URL)
      .then((response): void => {
        if (response.status !== 200 || !response.data) {
          console.log(`Loading lobby returned status ${response.status}`); // eslint-disable-line no-console
          setError(true);
        } else {
          setError(false);
        }
        setData(response.data);
        setLoading(false);
      })
      .catch((error): void => {
        console.log(`Error loading lobby: ${error}`); // eslint-disable-line no-console
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(load, [load]);

  useEffect((): (() => void) => {
    const interval = setInterval(() => {
      load();
    }, pollInterval);
    return (): void => clearInterval(interval);
  }, [pollInterval, load]);

  return {
    data,
    error,
    loading,
  };
}
