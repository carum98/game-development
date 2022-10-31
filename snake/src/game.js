export const STATES = {
  RUNNING: 'running',
  PAUSED: 'paused',
  GAMEOVER: 'gameover',
  RESET: 'reset',
}

export class Game {
  constructor({ controls, hub, snake, food, size, speed, collition }) {
    this.canvas = document.getElementById('canvas')

    this.canvas.width = size
    this.canvas.height = size
    this.speed = speed

    this.controls = controls
    this.snake = snake
    this.food = food

    this.hub = hub
    this.score = 0

    this.collitionWithWalls = collition === '1'
    this.maxCell = this.canvas.width / this.snake.size

    this.state = STATES.RUNNING

    this.ctx = this.canvas.getContext('2d')

    this.#moveFood()
    this.#gameLoop()
  }

  update() {
    if (this.collitionWithWalls) {
      this.#collitionWall()
    } else {
      this.#limit()
    }

    this.snake.update(this.controls.direction)

    this.#collitionFood()
    this.#collitionSelf()
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.snake.draw(this.ctx)
    this.food.draw(this.ctx)

    this.#drawBackground()
  }

  #gameLoop() {
    let prevTick = 0

    const animationFrame = (timeStamp) => {
      if (this.state === STATES.GAMEOVER || this.state === STATES.RESET) return

      requestAnimationFrame(animationFrame)

      if (timeStamp - prevTick < 1000 / this.speed) return

      if (this.state === STATES.PAUSED) return

      this.update()
      this.draw()

      prevTick = timeStamp
    }

    animationFrame(0)
  }

  #moveFood() {
    this.food.x = Math.floor(Math.random() * this.maxCell)
    this.food.y = Math.floor(Math.random() * this.maxCell)
  }

  #collitionFood() {
    const { snake, food } = this

    if (snake.x === food.x && snake.y === food.y) {
      this.score++

      this.#moveFood()
      snake.grow()

      this.hub.updateScore(this.score)
    }
  }

  #collitionWall() {
    const { snake: { x, y } } = this

    if (x === this.maxCell || x < -1 || y === this.maxCell || y < -1) {
      this.state = STATES.GAMEOVER
      this.hub.showGameover(this.score)
    }
  }

  #collitionSelf() {
    const { snake: { x, y, tail } } = this

    const head = { x, y }
    const body = tail.slice(0, -1)

    if (body.some(({ x, y }) => head.x === x && head.y === y)) {
      this.state = STATES.GAMEOVER
      this.hub.showGameover(this.score)
    }
  }

  #limit() {
    const { snake: { x, y } } = this

    if (x >= this.maxCell) {
      this.snake.x = -1
    }

    if (x < -1) {
      this.snake.x = this.maxCell
    }

    if (y >= this.maxCell) {
      this.snake.y = -1
    }

    if (y < -1) {
      this.snake.y = this.maxCell
    }
  }

  #drawBackground() {
    this.ctx.save()

    for (let x = 1; x < this.canvas.width; x += this.snake.size) {
      this.ctx.moveTo(x, 0)
      this.ctx.lineTo(x, this.canvas.width)
    }

    for (let y = 1; y < this.canvas.height; y += this.snake.size) {
      this.ctx.moveTo(0, y)
      this.ctx.lineTo(this.canvas.height, y)
    }
    
    this.ctx.strokeStyle = "#ddd";
    this.ctx.stroke()

    this.ctx.restore()
  }
}
