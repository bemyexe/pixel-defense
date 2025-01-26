import {Graphics} from 'pixi.js';
import {Entity} from './Entity';

const PIXEL_SIZE = 16;

export class Enemy extends Entity {
  constructor(view: Graphics) {
    super(view);
  }

  public update() {
    this.moveEnemy();
  }

  private moveEnemy() {
    this.y += PIXEL_SIZE;
  }
}
