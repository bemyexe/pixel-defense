import {Application} from 'pixi.js';

const SCREEN_WIDTH = 384;
const SCREEN_HEIGHT = 512;
const BG_COLOR = 0x869174;

const app = new Application();

(async () => {
  await setup();
})();

async function setup() {
  await app.init({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: BG_COLOR,
  });

  document.body.appendChild(app.canvas);
}
