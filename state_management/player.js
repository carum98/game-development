import { status, PlayerStatus } from './state.js'

export class Player {
  constructor(image, canvasWidth, canvasHeight) {
    this.image = image

    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight

    this.width = image.width / 9
    this.height = image.height / 12

    this.x =  canvasWidth / 2 - this.width / 2
    this.y = canvasHeight - this.height

    this.vy = 0
    this.weight = 1

    this.frameX = 0
    this.frameY = 0

    this.status = new PlayerStatus(this)
    this.state = this.status[status.STANDING_RIGHT]

    this.speed = 0
    this.maxSpeed = 10

    this.fps = 20

    this.maxFrame = 7
    this.timer = 0
    this.interval = 1000 / this.fps
  }

  update(input) {
    this.state.handlerInput(input)

    // Horizontal movement
    this.x += this.speed

    if (this.x <= 0) {
      this.x = 0
    } else if (this.x >= this.canvasWidth - this.width) {
      this.x = this.canvasWidth - this.width
    }

    // Vertical movement
    this.y += this.vy

    if (!this.onGround()) {
      this.vy += this.weight
    } else {
      this.vy = 0
    }

    if (this.y > this.canvasHeight - this.height) {
      this.y = this.canvasHeight - this.height
    }
  }

  draw(ctx, deltaTime) {
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

    ctx.drawImage(this.image, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height)
  }

  setState(status) {
    this.state = this.status[status]
    this.state.enter()

    console.log(this.state)
  }

  onGround() {
    return this.y >= this.canvasHeight - this.height
  }
}
