import { parseBooleanString, stringifyBoolean } from "./dataParsers";

export type DataKey = keyof UserLocalData;
export type Data<K extends DataKey> = Partial<UserLocalData>[K];
export type SetData<K extends DataKey> = NonNullable<UserLocalData>[K];

/**
 * To add a new data key to local storage
 * 1. add it to UserLocalData
 * 2. add a to-string and a from-data method
 */

export interface UserLocalData {
  lastViewedUpdateOn: Date;
  showDetailedView: boolean;
  zenMode: boolean;
}

export const stringifyData: {
  [key in DataKey]: (value: SetData<key>) => string;
} = {
  lastViewedUpdateOn: (date) => date.toDateString(),
  showDetailedView: stringifyBoolean,
  zenMode: stringifyBoolean,
};

export const dataFromString: {
  [key in DataKey]: (value: Promise<string | null>) => Promise<Data<key>>;
} = {
  lastViewedUpdateOn: async (date) => {
    const dateString = await date;
    return dateString ? new Date(dateString) : undefined;
  },
  showDetailedView: parseBooleanString,
  zenMode: parseBooleanString,
};
