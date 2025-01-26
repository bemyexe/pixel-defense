import {Application} from 'pixi.js';
import Game from './Game';

const SCREEN_WIDTH = 384;
const SCREEN_HEIGHT = 512;
const BG_COLOR = 0x869174;

const app = new Application();

(async () => {
  await setup();
  const game = new Game(app);
  const keyDownHandler = (event: KeyboardEvent) => game.keyBoardHandler(event);
  document.addEventListener('keydown', keyDownHandler);
  app.ticker.add(game.update, game);
})();

async function setup() {
  await app.init({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: BG_COLOR,
  });

  document.body.appendChild(app.canvas);
}
