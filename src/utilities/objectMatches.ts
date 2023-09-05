import { keys } from "./keys";

export const objectMatches =
  <K extends string | symbol | number>(comparisonObject: { [k in K]?: unknown }) =>
  (object: { [k in K]?: unknown }): boolean => {
    const matches = keys(comparisonObject).reduce(
      (acc, key) => acc && !!object[key] && object[key] === comparisonObject[key],
      true
    );
    return matches;
  };
