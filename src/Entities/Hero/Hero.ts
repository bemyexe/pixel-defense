import {Application, Graphics} from 'pixi.js';
import Entity from '../Entity';

export class Hero extends Entity {
  public view: Graphics;
  constructor(app: Application, x: number, y: number) {
    super(app, x, y);
    this.view = this.createEntity();
  }

  get x() {
    return this.view.x;
  }

  get y() {
    return this.view.y;
  }

  set x(x: number) {
    this.view.x = x;
  }

  set y(y: number) {
    this.view.y = y;
  }
}
