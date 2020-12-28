import { AnimationData } from "game/types";

class AnimationHandler {
  constructor(public animations: AnimationData[] = [], public liveAnimation = false) {}

  addAnimation(animation: AnimationData): void {
    this.animations.push(animation);
  }

  inAnimation(location: string): boolean {
    if (this.animations.length === 0) {
      return false;
    } else {
      return location in this.animations[0].locations;
    }
  }

  animationRun(): void {
    const animation = this.animations.pop();
    this.liveAnimation = true;
    setTimeout(() => {
      this.liveAnimation = false;
    }, animation?.duration);
  }
}

export { AnimationHandler };
