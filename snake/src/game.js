export class Game {
  constructor({ canvas, controls, snake, food, hub, size }) {
    this.canvas = canvas

    this.canvas.width = size
    this.canvas.height = size

    this.controls = controls
    this.snake = snake
    this.food = food

    this.hub = hub

    this.score = 0

    this.ctx = this.canvas.getContext('2d')

    this.#moveFood()
  }

  update() {
    this.#limit()
    this.snake.update(this.controls.direction)

    this.#collition()
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.snake.draw(this.ctx)
    this.food.draw(this.ctx)

    this.#drawBackground()
  }

  #moveFood() {
    const maxCell = this.canvas.width / this.snake.size

    this.food.x = Math.floor(Math.random() * maxCell)
    this.food.y = Math.floor(Math.random() * maxCell)
  }

  #collition() {
    const { snake, food } = this

    if (snake.x === food.x && snake.y === food.y) {
      this.score++

      this.#moveFood()
      snake.grow()

      this.hub.updateScore(this.score)
    }
  }

  #limit() {
    const maxCell = this.canvas.width / this.snake.size

    if (this.snake.x >= maxCell) {
      this.snake.x = -1
    }

    if (this.snake.x < -1) {
      this.snake.x = maxCell
    }

    if (this.snake.y >= maxCell) {
      this.snake.y = -1
    }

    if (this.snake.y < -1) {
      this.snake.y = maxCell
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
