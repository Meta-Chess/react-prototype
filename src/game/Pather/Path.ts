import { clone, last } from "lodash";

export class Path {
  private readonly start: string;
  private readonly path: string[];

  constructor(start: string, path: string[] = []) {
    this.start = start;
    this.path = [this.start].concat(path);
  }

  getStart(): string {
    return this.start;
  }

  getEnd(): string {
    return last(this.path) || this.start;
  }

  getPath(): string[] {
    return this.path;
  }

  push(location: string): number {
    return this.path.push(location);
  }

  clone(): Path {
    return new Path(this.start, clone(this.path.slice(1)));
  }
}
