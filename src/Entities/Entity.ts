import {Graphics} from 'pixi.js';

export class Entity {
  protected view: Graphics;
  private isDeadState: boolean = false;

  constructor(view: Graphics) {
    this.view = view;
  }

  get x() {
    return this.view.x;
  }

  set x(number: number) {
    this.view.x = number;
  }

  get y() {
    return this.view.y;
  }

  set y(number: number) {
    this.view.y = number;
  }

  get isDead() {
    return this.isDeadState;
  }

  public dead() {
    return (this.isDeadState = true);
  }

  public removeFromStage() {
    if (this.view.parent !== null) {
      this.view.removeFromParent();
    }
  }
}
