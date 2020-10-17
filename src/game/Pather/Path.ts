import _, { clone } from "lodash";

export class Path {
  constructor(private start: string, private path: string[] = []) {}

  getStart(): string {
    return this.start;
  }

  getEnd(): string {
    return _.last(this.path) || this.start;
  }

  getPath(): string[] {
    return [this.start].concat(this.path);
  }

  push(location: string): number {
    return this.path.push(location);
  }

  clone(): Path {
    return new Path(this.start, clone(this.path));
  }
}
