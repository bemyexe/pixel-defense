import {Application, Graphics, Text} from 'pixi.js';
import {Hero} from './Entities/Hero';
import {Bullet} from './Entities/Bullet';
import {Enemy} from './Entities/Enemy';
const PIXEL_COLOR = 0x000000;

const SCREEN_WIDTH = 384;
const SCREEN_HEIGHT = 512;
const PIXEL_SIZE = 16;
const TOP_PADDING = PIXEL_SIZE * 3;
const COLOR = 0x000000;
const BG_PIXEL_COLOR = 0x869174;
const style = {fill: COLOR};

export default class Game {
  private app: Application;
  private scoreText: Text;
  private hero: Hero;
  private bullets: Bullet[] = [];
  private enemies: Enemy[] = [];
  private delayCounter = 0;
  private gameSpeed = 0;
  private scoreCounter = 0;
  private pauseBtn: Graphics;
  // private restartBtn: Graphics;
  private isGamePaused = false;
  private keyBoardHandlerBound: (event: KeyboardEvent) => void;
  constructor(app: Application) {
    this.app = app;
    this.scoreText = new Text({text: 'Score: 0', style});
    const heroView = this.createPixel(
      SCREEN_WIDTH / 2 - PIXEL_SIZE,
      SCREEN_HEIGHT - PIXEL_SIZE
    );
    this.pauseBtn = this.createButtons(240, 0, 'Pause', () => this.pauseGame());
    // this.restartBtn = this.createButtons(300, 0, 'Retry', () =>
    //   console.log('Retry')
    // );
    this.hero = new Hero(heroView);

    this.keyBoardHandlerBound = this.keyBoardHandler.bind(this);
    this.app.stage.addChild(this.scoreText);
  }

  public update() {
    if (this.isFail()) {
      this.gameOver();
      return;
    }

    if (this.isEnemiesCanMove()) {
      this.addEnemyLine();
      this.enemies.forEach((enemy) => {
        enemy.update();
      });
    }
    this.moveBullets();
    this.clear();
  }

  public startGame() {
    document.addEventListener('keydown', this.keyBoardHandlerBound);
  }

  private keyBoardHandler(event: KeyboardEvent) {
    if (this.isGamePaused && event.key !== 'Enter') return;
    switch (event.key) {
      case 'ArrowRight': {
        if (this.hero.x < SCREEN_WIDTH - PIXEL_SIZE) {
          this.hero.moveRigth();
        }
        break;
      }
      case 'ArrowLeft': {
        if (this.hero.x > 0) {
          this.hero.moveLeft();
        }
        break;
      }
      case ' ': {
        const bulletView = this.createPixel(this.hero.x, this.hero.y);
        const bullet = new Bullet(bulletView);
        this.bullets.push(bullet);
        break;
      }
      case 'Enter': {
        this.pauseGame();
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
    this.enemies.forEach((enemy) => {
      if (enemy.isDead) {
        enemy.removeFromStage();
      }
    });
    this.bullets = this.bullets.filter((bullet) => !bullet.isDead);
    this.enemies = this.enemies.filter((enemy) => !enemy.isDead);
  }

  private moveBullets() {
    this.bullets.forEach((bullet) => {
      bullet.moveBullet(bullet);
      this.checkCollision(bullet);
    });
  }

  private addEnemyLine() {
    for (let i = 0; i < SCREEN_WIDTH / PIXEL_SIZE; i++) {
      if (Math.random() <= 0.5) {
        const enemyView = this.createPixel(i * PIXEL_SIZE, TOP_PADDING);
        const enemy = new Enemy(enemyView);
        this.app.stage.addChild(enemyView);
        this.enemies.push(enemy);
      }
    }
  }

  private isEnemiesCanMove() {
    this.delayCounter++;
    if (this.delayCounter < 100) {
      return false;
    }

    this.delayCounter = this.gameSpeed;
    return true;
  }

  private checkCollision(bullet: Bullet) {
    this.enemies.forEach((enemy) => {
      if (enemy.x === bullet.x && enemy.y === bullet.y) {
        enemy.dead();
        bullet.dead();
        this.scoreCounter++;
        this.scoreText.text = `Score: ${this.scoreCounter}`;
        this.gameSpeed += 0.2;
      }
    });
  }

  private isFail() {
    return this.enemies.find((enemy) => enemy.y === this.hero.y) !== undefined;
  }

  private gameOver() {
    document.removeEventListener('keydown', this.keyBoardHandlerBound);

    this.scoreText.text = `You lose! Score: ${this.scoreCounter}`;
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

  private pauseGame() {
    this.isGamePaused = !this.isGamePaused;
    const buttonText = this.pauseBtn.getChildAt(0) as Text;
    if (this.isGamePaused) {
      this.app.ticker.stop();
      buttonText.text = 'Start';
    } else {
      this.app.ticker.start();
      buttonText.text = 'Pause';
    }
    this.app.renderer.render(this.app.stage);
  }

  private createButtons(
    x: number,
    y: number,
    btnText: string,
    callBack: () => void
  ) {
    const view = new Graphics();
    view.rect(0, 0, PIXEL_SIZE * 4, PIXEL_SIZE * 2);
    view.fill(PIXEL_COLOR);
    view.rect(4, 4, PIXEL_SIZE * 3.5, PIXEL_SIZE * 1.5);
    view.fill(BG_PIXEL_COLOR);
    view.x = x;
    view.y = y;
    const style = {fill: COLOR, fontSize: 18};
    const text = new Text({text: btnText, style});
    text.x = 6;
    text.y = 6;
    view.addChild(text);
    view.interactive = true;
    view.cursor = 'pointer';
    view.on('click', callBack);
    this.app.stage.addChild(view);

    return view;
  }
}
