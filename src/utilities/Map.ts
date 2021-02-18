import { clone, isEqual } from "lodash";

export class Map<K extends string | number | symbol, V> {
  public dictionary: { [key in K]?: V };

  constructor(dictionary?: { [key in K]?: V }) {
    this.dictionary = dictionary || {};
  }

  static fromKeyArrayWithValueGenerator<K extends string | number | symbol, V>({
    keys,
    valueGenerator,
  }: {
    keys: Array<K>;
    valueGenerator: (k: K) => V;
  }): Map<K, V> {
    return new Map<K, V>().pushAll(
      keys.map((key) => ({ key, value: valueGenerator(key) }))
    );
  }

  push({ key, value }: { key: K; value: V }): Map<K, V> {
    return new Map<K, V>({ ...this.dictionary, [key]: value });
  }

  pushAll(pairs: Array<{ key: K; value: V }>): Map<K, V> {
    const asDictionary = pairs.reduce(
      (acc, pair) => ({
        ...acc,
        [pair.key]: pair.value,
      }),
      {}
    );
    return new Map<K, V>({ ...this.dictionary, ...asDictionary });
  }

  get(key: K): V | undefined {
    return this.dictionary[key];
  }

  keys(): K[] {
    return Object.keys(this.dictionary) as K[];
  }

  values(): V[] {
    return Object.values(this.dictionary) as V[];
  }

  //TODO: generalise this method to handle dictionaries of types with clone methods.
  clone(): Map<K, V> {
    return new Map(clone(this.dictionary));
  }

  resetTo(
    { dictionary: target }: Map<K, V>,
    resetWith = (x: V, y: V): void => {
      x = y;
    },
    cloneWith = (x: V | undefined): V | undefined => x
  ): void {
    (Object.keys(self) as K[]).forEach((key) => {
      if (target[key] === undefined) this.dictionary[key] = undefined;
    });
    (Object.keys(target) as K[]).forEach((key) => {
      const selfValue = this.dictionary[key] as V | undefined;
      const targetValue = target[key] as V | undefined;
      if (["string", "number"].includes(typeof target[key])) {
        this.dictionary[key] = target[key];
      } else if (selfValue !== undefined && targetValue !== undefined) {
        resetWith(selfValue, targetValue);
      } else {
        this.dictionary[key] = cloneWith(target[key]);
      }
    });
  }

  clear(): void {
    this.dictionary = {};
  }
}
