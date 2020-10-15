import { clone } from "lodash";

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

  //TODO: generalise this method to handle dictionaries of types with clone methods.
  clone(): Map<K, V> {
    return new Map(clone(this.dictionary));
  }

  resetTo(
    { dictionary: target }: Map<K, V>,
    resetValue = (x: V | undefined, y: V | undefined): void => {
      x = y;
    },
    cloneValue = (x: V | undefined): V | undefined => x
  ): void {
    var self = this.dictionary; //eslint-disable-line
    Object.keys(self).forEach((key) => {
      if (target[key as K] === undefined) delete self[key as K];
    });
    Object.keys(target).forEach((key) => {
      if (self[key as K] !== undefined) {
        resetValue(self[key as K], target[key as K]);
      } else {
        self = { ...this, [key as K]: cloneValue(target[key as K]) };
      }
    });
  }
}
