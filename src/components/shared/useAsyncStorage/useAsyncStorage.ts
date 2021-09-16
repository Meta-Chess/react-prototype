import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";

interface mChessData {
  lastViewedUpdateOn: Date;
}

type setData = NonNullable<mChessData>;
type getData = Partial<mChessData>;

export function useAsyncStorage<K extends keyof mChessData>(
  key: K
): [set: (value: setData[K]) => void, get: () => Promise<getData[K]>] {
  return [
    useCallback((value) => AsyncStorage.setItem(key, stringifyData[key](value)), []),
    useCallback(() => dataFromString[key](AsyncStorage.getItem(key)), []),
  ];
}

const stringifyData: { [key in keyof mChessData]: (value: setData[key]) => string } = {
  lastViewedUpdateOn: (date) => date.toDateString(),
};

const dataFromString: {
  [key in keyof mChessData]: (value: Promise<string | null>) => Promise<getData[key]>;
} = {
  lastViewedUpdateOn: async (date) => {
    const dateString = await date;
    return dateString ? new Date(dateString) : undefined;
  },
};
