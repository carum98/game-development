import { AXIS } from './controls.js'

export class Player {
  #shallow = {
    x: 0,
    y: 0,
  }

  constructor({ x, y }) {
    this.x = x
    this.y = y

    this.radius = 10

    this.velocity = {
      x: 0,
      y: 0
    }

    // Mouth movement
    this.mouth = {
      radians: 0.75,
      direction: 0,
      speed: 0.15
    }

    this.#shallow = {
      x,
      y,
    }
  }

  update(direction, boundaries) {
    const control = AXIS[direction]

    if (control && boundaries.availableMovement(this).includes(direction)) {
      const [axis, value] = Object.entries(control).at(0)
      this.velocity[axis] = value

      this.mouth.direction = control.rotation
    }

    if (boundaries.collision(this)) {
      this.velocity.x = 0
      this.velocity.y = 0
    }

    this.x += this.velocity.x
    this.y += this.velocity.y

    // Mouth movement
    if (this.mouth.radians < 0 || this.mouth.radians > .75) {
      this.mouth.speed = -this.mouth.speed
    }

    this.mouth.radians += this.mouth.speed
  }

  draw(ctx) {
    ctx.save()

    // Mouth
    ctx.translate(this.x, this.y)
    ctx.rotate(this.mouth.direction)
    ctx.translate(-this.x, -this.y)

    // Body
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, this.mouth.radians, Math.PI * 2 - this.mouth.radians)
    ctx.lineTo(this.x, this.y)
    ctx.closePath()

    ctx.fillStyle = 'yellow'
    ctx.fill()
    ctx.restore()
  }

  reset() {
    this.x = this.#shallow.x
    this.y = this.#shallow.y
  }
}

