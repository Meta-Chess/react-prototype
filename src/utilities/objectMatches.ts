import { typecastKeys } from "./typecastKeys";

export const objectMatches =
  <K extends string | symbol | number>(comparisonObject: { [k in K]?: unknown }) =>
  (object: { [k in K]?: unknown }): boolean => {
    const matches = typecastKeys(comparisonObject).reduce(
      (acc, key) => acc && !!object[key] && object[key] === comparisonObject[key],
      true
    );
    return matches;
  };
