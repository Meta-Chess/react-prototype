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

  resetTo(
    a: Map<K, V>,
    resetValue: (x: V | undefined, y: V | undefined) => void = (
      x: V | undefined,
      y: V | undefined
    ): void => {
      x = y;
    },
    cloneValue: (x: V | undefined) => V | undefined = (x: V | undefined): V | undefined =>
      x
  ): void {
    var me = this.dictionary; //eslint-disable-line
    const they = a.dictionary;
    Object.keys(me).forEach((key) => {
      if (they[key as K] === undefined) delete me[key as K];
    });
    Object.keys(they).forEach((key) => {
      if (me[key as K] !== undefined) {
        resetValue(me[key as K], they[key as K]);
      } else {
        me = { ...this, [key as K]: cloneValue(they[key as K]) };
      }
    });
  }
}
