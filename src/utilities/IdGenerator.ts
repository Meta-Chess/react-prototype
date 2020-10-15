export class IdGenerator {
  private nextId: number;

  constructor() {
    this.nextId = 1;
  }

  getId(): number {
    return this.nextId++;
  }
}
