export class Map<K extends string | number | symbol, V> {
  private dictionary: { [key in K]?: V };

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
}
