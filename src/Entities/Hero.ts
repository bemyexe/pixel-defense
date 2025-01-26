import {Graphics} from 'pixi.js';
import {Entity} from './Entity';

const PIXEL_SIZE = 16;

export class Hero extends Entity {
  constructor(view: Graphics) {
    super(view);
  }

  public moveRigth() {
    this.x += PIXEL_SIZE;
  }

  public moveLeft() {
    this.x -= PIXEL_SIZE;
  }
}
