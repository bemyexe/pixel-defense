import {Application, Graphics, Text} from 'pixi.js';
import {Hero} from './Entities/Hero';
import {Bullet} from './Entities/Bullet';
const PIXEL_COLOR = 0x000000;

const log = console.log;
const SCREEN_WIDTH = 384;
const SCREEN_HEIGHT = 512;
const PIXEL_SIZE = 16;
const COLOR = 0x000000;
const BG_PIXEL_COLOR = 0x869174;
const style = {fill: COLOR};

export default class Game {
  private app: Application;
  private scoreText: Text;
  private hero: Hero;
  private bullets: Bullet[] = [];
  constructor(app: Application) {
    this.app = app;
    this.scoreText = new Text({text: 'Score: 0', style});
    const heroView = this.createPixel(
      SCREEN_WIDTH / 2 - PIXEL_SIZE,
      SCREEN_HEIGHT - PIXEL_SIZE
    );

    this.hero = new Hero(heroView);

    this.app.stage.addChild(this.scoreText);
  }

  private createPixel(x: number, y: number) {
    const view = new Graphics();
    view.rect(0, 0, PIXEL_SIZE, PIXEL_SIZE);
    view.fill(PIXEL_COLOR);
    view.rect(4, 4, PIXEL_SIZE - 8, PIXEL_SIZE - 8);
    view.stroke({color: BG_PIXEL_COLOR, width: 4});
    view.fill(PIXEL_COLOR);
    view.x = x;
    view.y = y;
    this.app.stage.addChild(view);
    return view;
  }

  public update() {
    this.moveBullets();
    this.clear();
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
      case ' ': {
        const bulletView = this.createPixel(this.hero.x, this.hero.y);
        const bullet = new Bullet(bulletView);
        this.bullets.push(bullet);
        break;
      }
    }
  }

  private clear() {
    this.bullets.forEach((bullet) => {
      if (bullet.isDead) {
        bullet.removeFromStage();
      }
    });
    this.bullets = this.bullets.filter((bullet) => !bullet.isDead);
  }

  private moveBullets() {
    this.bullets.forEach((bullet) => {
      bullet.moveBullet(bullet);
    });
  }
}
