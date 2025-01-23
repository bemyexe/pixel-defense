import {Application, Graphics} from 'pixi.js';

const PIXEL_SIZE = 16;
const BG_PIXEL_COLOR = 0x869174;
const PIXEL_COLOR = 0x000000;

export default class Entity {
  private _x: number;
  private _y: number;
  private app: Application;
  private isDeadState: boolean = false;
  constructor(app: Application, x: number, y: number) {
    this.app = app;
    this._x = x;
    this._y = y;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  set x(x: number) {
    this._x = x;
  }

  set y(y: number) {
    this._y = y;
  }

  get isDead() {
    return this.isDeadState;
  }

  public dead() {
    return (this.isDeadState = true);
  }

  public createEntity() {
    const view = new Graphics();
    view.rect(0, 0, PIXEL_SIZE, PIXEL_SIZE);
    view.fill(PIXEL_COLOR);
    view.rect(4, 4, PIXEL_SIZE - 8, PIXEL_SIZE - 8);
    view.stroke({color: BG_PIXEL_COLOR, width: 4});
    view.fill(PIXEL_COLOR);
    view.x = this._x;
    view.y = this._y;

    this.app.stage.addChild(view);
    return view;
  }
}
