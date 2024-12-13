import { NavigatorParamList } from "./NavigatorParamList";
import { FutureVariantName } from "game/variants";
import { calculateGameOptions } from "game/variantAndRuleProcessing";
import { Screens } from "./Screens";

export enum NamedGameMode {
  spherical = "spherical",
  mobius = "mobius",
  toroidal = "toroidal",
  cylindrical = "cylindrical",
  hex = "hex",
  nimbus = "nimbus",
}

const gameModeToVariants: { [key in NamedGameMode]: FutureVariantName[] } = {
  spherical: ["spherical"],
  mobius: ["mobius"],
  toroidal: ["toroidal"],
  cylindrical: ["cylindrical"],
  hex: ["hex"],
  nimbus: ["nimbus"],
};

const alternamePathNamings: { [key in NamedGameMode]?: string[] } = {
  [NamedGameMode.spherical]: ["sphere"],
  [NamedGameMode.cylindrical]: ["cylinder"],
  [NamedGameMode.toroidal]: ["torus", "donut"],
};

const offlineBaseGameOptions = {
  checkEnabled: true,
  numberOfPlayers: 2,
  baseVariants: [],
  ruleNamesWithParams: {},
  time: undefined,
  online: false,
  publicGame: false,
};

export const pathToParams = Object.keys(NamedGameMode).reduce((acc, gameMode) => {
  const namedGameMode = gameMode as NamedGameMode;
  const gameOptions = calculateGameOptions(
    offlineBaseGameOptions,
    gameModeToVariants[namedGameMode]
  );
  const onlineGameOptions = { ...gameOptions, online: true, time: 300000 };
  const mode = namedGameMode;

  // TODO: clean up the repetition below
  acc[`/${gameMode}`] = { gameOptions, mode };
  // online route doesn't need a mode param- it has a lobby on refresh
  acc[`/${gameMode}/online`] = {
    gameOptions: onlineGameOptions,
  };
  // also catching trailing slash- the behavior is different in prod, Amplify(?) would map /mode -> /mode/
  acc[`/${gameMode}/`] = { gameOptions, mode };
  acc[`/${gameMode}/online/`] = {
    gameOptions: onlineGameOptions,
  };
  // handling refreshing with query param
  acc[`/game/?mode=${gameMode}`] = { gameOptions, mode };

  alternamePathNamings[namedGameMode]?.forEach((pathName) => {
    acc[`/${pathName}`] = { gameOptions, mode };
    acc[`/${pathName}/online`] = {
      gameOptions: onlineGameOptions,
    };
    acc[`/${pathName}/`] = { gameOptions, mode };
    acc[`/${pathName}/online/`] = {
      gameOptions: onlineGameOptions,
    };
    acc[`/game/?mode=${pathName}`] = { gameOptions, mode };
  });
  return acc;
}, {} as { [key: string]: NavigatorParamList[Screens.GameScreen] });
