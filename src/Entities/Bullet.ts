import {Graphics} from 'pixi.js';
import {Entity} from './Entity';

const PIXEL_SIZE = 16;
const TOP_PADDING = PIXEL_SIZE * 3;

export class Bullet extends Entity {
  constructor(view: Graphics) {
    super(view);
  }

  public moveBullet(bullet: Bullet) {
    bullet.y -= PIXEL_SIZE;

    if (bullet.y < TOP_PADDING) {
      bullet.dead();
    }
  }
}
