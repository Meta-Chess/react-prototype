import React, { FC, useState, useEffect } from "react";
import { TrackingPixel } from "primitives";
import { Screens, useRoute } from "navigation";
import { GameProvider } from "components/shared";
import { GameScreenWrappedContent } from "./GameScreenWrappedContent";
import { useAsyncStorage } from "components/shared";

export const GameScreen: FC = () => {
  const routeParams = { ...useRoute<Screens.GameScreen>().params };
  const [params, setParams] = useState(routeParams);
  const [loadingFinished, setLoadingFinished] = useState(false);

  const [setMostRecentGameOptions, getMostRecentGameOptions] = useAsyncStorage(
    "mostRecentGameOptions"
  );

  useEffect(() => {
    // this allows nice behavior when visiting '/game' without gameOptions or refreshing on '/game'
    async function handleGameOptions(): Promise<void> {
      if (params.gameOptions) {
        setMostRecentGameOptions(params.gameOptions);
        return;
      }
      if (params.roomId) return;

      const mostRecentGameOptions = await getMostRecentGameOptions();
      if (mostRecentGameOptions === undefined) return;

      setParams({ ...params, gameOptions: { ...mostRecentGameOptions, online: false } });
    }

    handleGameOptions().finally(() => setLoadingFinished(true));
  }, []);

  return (
    <>
      {loadingFinished && (
        <GameProvider {...params}>
          <GameScreenWrappedContent />
          <TrackingPixel urlEnd={"GameScreen"} />
        </GameProvider>
      )}
    </>
  );
};
