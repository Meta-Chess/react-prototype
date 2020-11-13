import { GameOptions } from "game/types";
import { variants, VariantName, Rule } from "game";
import { ruleFuseMap, FutureVariantName, futureVariants } from "game/variants";

export function CalcGameOptions(selectedVariants: (string | number)[]): GameOptions {
  const concatRules: Rule[] = ([] as Rule[]).concat(
    ...selectedVariants.map(
      (key) => futureVariants[key as FutureVariantName].rules as Rule[]
    )
  );

  //when these (unionRules, fusedRules) were constants, they would not update with the state change
  let unionRules: Rule[] = variants["Chess"].rules;
  for (const rule of concatRules) {
    if (!unionRules.includes(rule)) {
      unionRules = unionRules.concat([rule]);
    }
  }
  let fusedRules: Rule[] = [];
  for (const rule of unionRules) {
    let match = false;
    if (Object.keys(ruleFuseMap).includes(rule["name"])) {
      for (const clashingRuleName in ruleFuseMap[rule["name"]]) {
        if (unionRules.map((r) => r["name"]).includes(clashingRuleName)) {
          match = true;
          fusedRules = fusedRules.concat(ruleFuseMap[rule["name"]][clashingRuleName]);
        }
      }
    }
    if (!match) fusedRules = fusedRules.concat([rule]);
  }

  fusedRules = fusedRules.sort((
    n1 //TEMP: gross sorting so double step/hex cylinder isnt dropped on board create
  ) =>
    n1["name"] === "Long board" || n1["name"] === "Hexagon" || n1["name"] === "Standard"
      ? -1
      : 1
  );

  return {
    variant: "Variant Fusion" as VariantName,
    customTitle:
      ([] as string[])
        .concat(
          ...selectedVariants.map(
            (key) => futureVariants[key as FutureVariantName].title as string
          )
        )
        .join(" ") + " Chess",
    customRules: fusedRules,
    time: undefined,
    checkEnabled: true,
    fatigueEnabled: false,
    atomicEnabled: false,
    flipBoard: false,
    overTheBoard: false,
    online: false,
  } as GameOptions;
}
