export class Path {
  constructor(private end: string, private path?: Path) {}

  getStart(): string {
    return this.toList()[0];
  }

  getEnd(): string {
    return this.end;
  }

  toList(): string[] {
    return [...(this.path?.toList() || []), this.end];
  }
}
