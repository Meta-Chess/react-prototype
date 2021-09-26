export const stringifyBoolean = (bool: boolean): string => (bool ? "true" : "false");
export const parseBooleanString = async (
  bool: Promise<string | null>
): Promise<boolean | undefined> => {
  const boolString = await bool;
  return boolString !== undefined ? (boolString === "true" ? true : false) : undefined;
};
