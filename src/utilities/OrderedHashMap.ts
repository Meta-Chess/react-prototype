export class OrderedHashMap<K, V> extends Map<K, V> {
  getValues(): V[] {
    const values: V[] = [];
    this.forEach((value) => values.push(value));
    return values;
  }

  getKeys(): K[] {
    const keys: K[] = [];
    this.forEach((_value, key) => keys.push(key));
    return keys;
  }
}
