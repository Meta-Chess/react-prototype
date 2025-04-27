/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import { Data, SetData, dataFromString, DataKey, stringifyData } from "./MChessData";

export function useAsyncStorage<K extends DataKey>(
  key: K
): [set: (value: Data<K>) => void, get: () => Promise<Data<K>>] {
  return [
    useCallback((value) => {
      if (value === undefined) AsyncStorage.removeItem(key);
      else AsyncStorage.setItem(key, stringifyData[key](value as SetData<any>));
    }, []),
    useCallback(() => {
      return dataFromString[key](AsyncStorage.getItem(key)) as Data<any>;
    }, []),
  ];
}
