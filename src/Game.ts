import {Application, Text} from 'pixi.js';
import {Hero} from './Entities/Hero/Hero';

const SCREEN_WIDTH = 384;
const SCREEN_HEIGHT = 512;
const PIXEL_SIZE = 16;
const COLOR = 0x000000;
const style = {fill: COLOR};

export default class Game {
  private app: Application;
  private scoreText: Text;
  private hero: Hero;
  constructor(app: Application) {
    this.app = app;
    this.scoreText = new Text({text: 'Score: 0', style});
    this.hero = new Hero(
      app,
      SCREEN_WIDTH / 2 - PIXEL_SIZE,
      SCREEN_HEIGHT - PIXEL_SIZE
    );
    console.log(this.hero);
    this.app.stage.addChild(this.scoreText);
  }

  public keyBoardHandler(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowRight': {
        if (this.hero.x < SCREEN_WIDTH - PIXEL_SIZE) {
          this.hero.x += PIXEL_SIZE;
        }
        break;
      }
      case 'ArrowLeft': {
        if (this.hero.x > 0) {
          this.hero.x -= PIXEL_SIZE;
        }
        break;
      }
    }
  }

  public update() {}
}
