import { isPresent } from "ts-is-present";

export function englishList(
  items: string[],
  options?: { connector?: string; singular?: string; plural?: string }
): string {
  if (items.length < 2)
    return [items[0] || "Nothing", options?.singular || options?.plural]
      .filter(isPresent)
      .join(" ");
  return [
    [...items.slice(0, -1), options?.connector || "and"].join(
      items.length > 2 ? ", " : " "
    ),
    items[items.length - 1],
    options?.plural || options?.singular,
  ]
    .filter(isPresent)
    .join(" ");
}
