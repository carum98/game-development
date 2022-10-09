import { states } from './state.js'

export class Player {
  constructor(image, canvasWidth, canvasHeight) {
    this.image = image

    this.width = image.width / 12
    this.height = image.height / 10

    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight

    this.x = 0
    this.y = this.canvasHeight - this.height - 80

    this.vy = 0
    this.weight = 0.5

    this.states = []
    this.currentState = null

    this.speed = 0
    this.maxSpeed = 5

    this.frameX = 0
    this.frameY = 0

    this.maxFrame = 7

    this.fps = 20
    this.timer = 0
    this.interval = 1000 / this.fps
  }

  update(input, deltaTime) {
    this.currentState.handleInput(input)

    // horizontal movement
    this.x += this.speed

    if (input.includes('ArrowRight') && this.currentState.state !== states.HIT) {
      this.speed = this.maxSpeed
    } else if (input.includes('ArrowLeft') && this.currentState.state !== states.HIT) {
      this.speed = -this.maxSpeed
    } else {
      this.speed = 0
    }

    // vertical movement
    this.y += this.vy

    if (!this.onGround()) {
      this.vy += this.weight
    } else {
      this.vy = 0
    }

    // Sprite movement
    if (this.timer > this.interval) {
      if (this.frameX < this.maxFrame - 1) {
        this.frameX++
      } else {
        this.frameX = 0
      }

      this.timer = 0
    } else {
      this.timer += deltaTime
    }

    // Limits
    if (this.x < 0) {
      this.x = 0
    }

    if (this.y > this.canvasHeight - this.height - 80) {
      this.y = this.canvasHeight - this.height - 80
    }

    if (this.x > this.canvasWidth - this.width) {
      this.x = this.canvasWidth - this.width
    }
  }

  draw(ctx) {
    this.currentState.enter()

    // ctx.strokeRect(this.x, this.y, this.width, this.height)

    ctx.drawImage(this.image, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height)
  }

  setState(state) {
    this.currentState = this.states[state]
  }

  onGround() {
    return this.y >= this.canvasHeight - this.height - 80
  }
}
