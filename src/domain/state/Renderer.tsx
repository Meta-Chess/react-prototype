export class Renderer {
  private updateCount: number;
  constructor(private setACounter: (val: number) => void) {
    this.updateCount = 0;
  }

  render() {
    this.updateCount++;
    this.setACounter(this.updateCount);
  }
}
