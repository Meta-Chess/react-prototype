export class Renderer {
  private updateCount: number;
  constructor(private setCounter: (val: number) => void) {
    this.updateCount = 0;
  }

  render(): void {
    this.updateCount++;
    this.setCounter(this.updateCount);
  }
}
