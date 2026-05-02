import { ReactiveElement } from '../../../../simpl4u/core/reactive-element.js';

class Snake {
  static movement = 2;
  static position = { x: 0, y: 0};
  static length = 3;
  static points = 0;
  static body = [];
}

export class MySnake extends ReactiveElement {
  static intervalSetted = false;
  static WIDTH = 64;
  static HEIGHT = 36;
  static chunk = 0;

  constructor() {
    super();
    if (!MySnake.intervalSetted) {
      setInterval(() => {
        this.interval();
      }, 101);
      window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' && Snake.movement !== 1)
          Snake.movement = 3;
        if (e.key === 'ArrowUp' && Snake.movement !== 3)
          Snake.movement = 1;
        if (e.key === 'ArrowRight' && Snake.movement !== 4)
          Snake.movement = 2;
        if (e.key === 'ArrowLeft' && Snake.movement !== 2)
          Snake.movement = 4;
      });
    }
    MySnake.intervalSetted = true;
    this.style = `
canvas {
  border: 1px solid #000000;
  box-shadow: 10px 10px 5px #000000;
  background-color: rgb(0, 155, 0);
}    `;
  }

  interval() {
    this.setField('time', (this.model['time'] || 0) + 1);
  }
  
  template(state) {
    return `<canvas id="canvas" width="960px" height="540px"></canvas>Time:${state?.time || 0}`;
  }
  
  onReady() {
    this.moveSnake();
    this.renderSnake();
  }

  moveSnake() {
    let newBody = {};
    //newBody.x = Snake.
    if (Snake.movement === 1) {
      newBody = Snake.position + {};
      Snake.position.y--;
    }
    if (Snake.movement === 2) {
      Snake.position.x++;
    }
    if (Snake.movement === 3) {
      Snake.position.y++;
    }
    if (Snake.movement === 4) {
      Snake.position.x--;
    }
  }

  renderSnake() {
    const canvas = this.get('canvas');
    let ctx = canvas.getContext('2d');
    MySnake.chunk = canvas.width / MySnake.WIDTH;
    ctx.fillStyle = 'rgb(255,255,0)';
    ctx.fillRect(Snake.position.x * MySnake.chunk, Snake.position.y * MySnake.chunk, MySnake.chunk, MySnake.chunk);
    ctx.stroke();
  }

  reset() {
    Snake.movement = 2;
    Snake.position = { x: 0, y: 0 };
    Snake.points = 0;
    Snake.length = 3;
  }
}
customElements.define('my-snake', MySnake);
