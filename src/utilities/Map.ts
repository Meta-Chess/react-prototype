type dictionary<K extends string | number | symbol, V> = { [key in K]?: V };

export class Map<K extends string | number | symbol, V> {
  private dictionary: dictionary<K, V>;
  private cloneValue: (value?: V) => V | undefined;
  private resetValue?: (valueToReset: V, targetValue: V) => void;

  constructor({
    dictionary = {},
    cloneValue = (v?: V): V | undefined => v,
    resetValue = undefined,
  }: {
    dictionary?: dictionary<K, V>;
    cloneValue?: (value?: V) => V | undefined;
    resetValue?: (valueToReset: V, targetValue: V) => void;
  }) {
    this.dictionary = dictionary;
    this.cloneValue = cloneValue;
    this.resetValue = resetValue;
  }

  static dictionaryFromKeyArrayAndValueGenerator<K extends string | number | symbol, V>({
    keys,
    valueGenerator,
  }: {
    keys: Array<K>;
    valueGenerator: (k: K) => V;
  }): dictionary<K, V> {
    const dictionary: dictionary<K, V> = {};
    keys.forEach((key) => (dictionary[key] = valueGenerator(key)));
    return dictionary;
  }

  push(...kvPairs: [{ key: K; value?: V }]): void {
    kvPairs.forEach(({ key, value }) => (this.dictionary[key] = value));
  }

  get(key: K): V | undefined {
    return this.dictionary[key];
  }

  remove(key: K): void {
    delete this.dictionary[key];
  }

  keys(): K[] {
    return Object.keys(this.dictionary) as K[];
  }

  values(): V[] {
    return Object.values(this.dictionary) as V[];
  }

  clone(): Map<K, V> {
    return new Map<K, V>({
      dictionary: Map.dictionaryFromKeyArrayAndValueGenerator({
        keys: this.keys(),
        valueGenerator: (k: K) => this.cloneValue(this.get(k)) as V,
      }),
      cloneValue: this.cloneValue,
      resetValue: this.resetValue,
    });
  }

  resetTo(savePoint: Map<K, V>): void {
    this.keys().forEach((key) => this.resetKey(key, savePoint));
  }

  private resetKey(key: K, savePoint: Map<K, V>): void {
    const valueToReset = this.get(key);
    const targetValue = savePoint.get(key);
    if (!targetValue) {
      this.remove(key);
    } else if (valueToReset && this.resetValue) {
      this.resetValue(valueToReset, targetValue);
    } else {
      this.push({ key, value: this.cloneValue(targetValue) });
    }
  }
}
