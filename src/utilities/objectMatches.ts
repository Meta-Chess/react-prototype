// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const objectMatches =
  (comparisonObject: Obj) =>
  (object: any): boolean => {
    const matches = Object.keys(comparisonObject).reduce(
      (acc, key) => acc && !!object[key] && object[key] === comparisonObject[key],
      true
    );
    return matches;
  };

type Obj = { [key in string | number | symbol]: unknown };
