import { useCallback, useEffect, useState } from "react";
import { Data, DataKey } from "./MChessData";
import { useAsyncStorage } from "./useAsyncStorage";

export function useUserSettings<K extends DataKey>(
  key: K,
  defaultValue?: Data<K>
): [setting: Data<K>, setSetting: (setting: Data<K>) => void] {
  const [save, load] = useAsyncStorage(key);
  const [setting, set] = useState<Data<K>>(defaultValue);

  useEffect(() => loadUserSettings({ load, save, set, defaultValue }), []);

  const setSetting = useCallback((value: Data<K>): void => {
    set(value);
    save(value);
  }, []);

  return [setting, setSetting];
}

const loadUserSettings = <K extends DataKey>(input: LoadUserSettingsInput<K>): void =>
  void loadAsynchronously(input);

const loadAsynchronously = async <K extends DataKey>({
  load,
  save,
  set,
  defaultValue,
}: LoadUserSettingsInput<K>): Promise<void> => {
  const lastSetting = await load();
  if (shouldSaveDefault(lastSetting, defaultValue)) save(defaultValue);
  else set(lastSetting);
};

interface LoadUserSettingsInput<K extends DataKey> {
  load: () => Promise<Data<K>>;
  save: (setting?: Data<K>) => void;
  set: (setting?: Data<K>) => void;
  defaultValue?: Data<K>;
}

function shouldSaveDefault(
  lastSetting: unknown | undefined,
  defaultValue: unknown | undefined
): boolean {
  return lastSetting === undefined && defaultValue !== undefined;
}
