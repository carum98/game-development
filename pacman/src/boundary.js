import { DIRECTION } from './controls.js'

export class Boundaries {
  constructor({ boundaries }) {
    this.boundaries = boundaries
  }

  collision(element) {
    const { x, y, velocity, radius } = element
    let value = false

    for (const boundary of this.boundaries) {
      const { x: xBoundary, y: yBoundary } = boundary
      const sizeBoundary = Boundary.width

      const xVelocity = x + velocity.x
      const yVelocity = y + velocity.y

      value = xBoundary <= xVelocity + radius && xBoundary + sizeBoundary >= xVelocity - radius &&
        yBoundary <= yVelocity + radius && sizeBoundary + yBoundary >= yVelocity - radius

      if (value) break
    }

    return value
  }

  availableMovement(element) {
    const movements = []

    if (!this.collision({ ...element, velocity: { x: 0, y: -8 } })) {
      movements.push(DIRECTION.UP)
    }

    if (!this.collision({ ...element, velocity: { x: 0, y: 8 } })) {
      movements.push(DIRECTION.DOWN)
    }

    if (!this.collision({ ...element, velocity: { x: -8, y: 0 } })) {
      movements.push(DIRECTION.LEFT)
    }

    if (!this.collision({ ...element, velocity: { x: 8, y: 0 } })) {
      movements.push(DIRECTION.RIGHT)
    }

    return movements
  }

  draw(ctx) {
    this.boundaries.forEach(boundary => boundary.draw(ctx))
  }
}

export class Boundary {
  static width = 30
  static height = 30

  constructor({ x, y, type }) {
    this.x = x
    this.y = y

    this.type = type

    this.width = Boundary.width
    this.height = Boundary.height

    this.weight = Boundary.width / 3

    Object.freeze(this)
  }

  draw(ctx) {
    const { x, y, width, height, weight } = this

    ctx.beginPath()

    ctx.strokeStyle = 'blue'
    ctx.lineWidth = 2

    ctx.save()

    if (this.type === '═' || this.type === '╼' || this.type === '╾' || this.type === '━') {
      if (this.type === '╾') {
        ctx.translate(weight, 0)
      }

      if (this.type === '╼') {
        ctx.translate(-weight, 0)
      }

      ctx.moveTo(x, y + weight)
      ctx.lineTo(x + width, y + weight)
      ctx.moveTo(x, y + height - weight)
      ctx.lineTo(x + width, y + height - weight)

      if (this.type === '╼' || this.type === '━') {
        ctx.lineTo(x + width, y + weight)
      }

      if (this.type === '╾' || this.type === '━') {
        ctx.moveTo(x, y + weight)
        ctx.lineTo(x, y + height - weight)
      }
    } else if (this.type === '║' || this.type === '╽' || this.type === '╿' || this.type === '┃') {
      if (this.type === '╿') {
        ctx.translate(0, weight)
      }

      if (this.type === '╽') {
        ctx.translate(0, -weight)
      }

      ctx.moveTo(x + weight, y)
      ctx.lineTo(x + weight, y + height)
      ctx.moveTo(x + width - weight, y)
      ctx.lineTo(x + width - weight, y + height)

      if (this.type === '╽' || this.type === '┃') {
        ctx.lineTo(x + weight, y + height)
      }

      if (this.type === '╿' || this.type === '┃') {
        ctx.moveTo(x + weight, y)
        ctx.lineTo(x + width - weight, y)
      }
    } else if (this.type === '╔' || this.type === '╒' || this.type === '╓' || this.type === '┌') {
      ctx.moveTo(x + width, y + weight)
      ctx.lineTo(x + weight, y + weight)
      ctx.lineTo(x + weight, y + height)
      ctx.moveTo(x + width, y + weight * 2)
      ctx.lineTo(x + weight * 2, y + weight * 2)
      ctx.lineTo(x + weight * 2, y + height)

      if (this.type === '╒' || this.type === '┌') {
        ctx.lineTo(x + weight, y + height)
      }

      if (this.type === '╓' || this.type === '┌') {
        ctx.moveTo(x + width, y + weight)
        ctx.lineTo(x + width, y + height - weight)
      }
    } else if (this.type === '╗' || this.type === '╕' || this.type === '╖' || this.type === '┐') {
      ctx.moveTo(x, y + weight)
      ctx.lineTo(x + width - weight, y + weight)
      ctx.lineTo(x + width - weight, y + height)
      ctx.moveTo(x, y + weight * 2)
      ctx.lineTo(x + width - weight * 2, y + weight * 2)
      ctx.lineTo(x + width - weight * 2, y + height)

      if (this.type === '╕' || this.type === '┐') {
        ctx.lineTo(x + width - weight, y + height)
      }

      if (this.type === '╖' || this.type === '┐') {
        ctx.moveTo(x, y + weight)
        ctx.lineTo(x, y + height - weight)
      }
    } else if (this.type === '╚' || this.type === '╙' || this.type === '╘' || this.type === '└') {
      ctx.moveTo(x + weight, y)
      ctx.lineTo(x + weight, y + height - weight)
      ctx.lineTo(x + width, y + height - weight)
      ctx.moveTo(x + weight * 2, y)
      ctx.lineTo(x + weight * 2, y + height - weight * 2)
      ctx.lineTo(x + width, y + height - weight * 2)

      if (this.type === '╙' || this.type === '└') {
        ctx.lineTo(x + width, y + height - weight)
      }

      if (this.type === '╘' || this.type === '└') {
        ctx.moveTo(x + weight, y)
        ctx.lineTo(x + width - weight, y)
      }
    } else if (this.type === '╝' || this.type === '╜' || this.type === '╛' || this.type === '┘') {
      ctx.moveTo(x + width - weight, y)
      ctx.lineTo(x + width - weight, y + height - weight)
      ctx.lineTo(x, y + height - weight)
      ctx.moveTo(x + width - weight * 2, y)
      ctx.lineTo(x + width - weight * 2, y + height - weight * 2)
      ctx.lineTo(x, y + height - weight * 2)

      if (this.type === '╜' || this.type === '┘') {
        ctx.lineTo(x, y + height - weight)
      }

      if (this.type === '╛' || this.type === '┘') {
        ctx.moveTo(x + width - weight, y)
        ctx.lineTo(x + weight, y)
      }
    } else if (this.type === '╦') {
      ctx.moveTo(x, y + weight)
      ctx.lineTo(x + width, y + weight)
      ctx.moveTo(x, y + height - weight)
      ctx.lineTo(x + width - weight * 2, y + height - weight)
      ctx.lineTo(x + width - weight * 2, y + height)
      ctx.moveTo(x + weight * 2, y + height)
      ctx.lineTo(x + weight * 2, y + height - weight)
      ctx.lineTo(x + width, y + weight * 2)
    } else if (this.type === '╩') {
      ctx.moveTo(x + weight, y)
      ctx.lineTo(x + weight, y + weight)
      ctx.lineTo(x, y + height - weight * 2)
      ctx.moveTo(x + weight * 2, y)
      ctx.lineTo(x + weight * 2, y + weight)
      ctx.lineTo(x + width, y + height - weight * 2)
      ctx.moveTo(x, y + height - weight)
      ctx.lineTo(x + width, y + height - weight)
    } else if (this.type === '╠') {
      ctx.moveTo(x + weight, y)
      ctx.lineTo(x + weight, y + height)
      ctx.moveTo(x + width - weight, y)
      ctx.lineTo(x + width - weight, y + height - weight * 2)
      ctx.lineTo(x + width, y + height - weight * 2)
      ctx.moveTo(x + weight * 2, y + height)
      ctx.lineTo(x + weight * 2, y + height - weight)
      ctx.lineTo(x + width, y + weight * 2)
    } else if (this.type === '╣') {
      ctx.moveTo(x + width - weight, y)
      ctx.lineTo(x + width - weight, y + height)
      ctx.moveTo(x + weight, y)
      ctx.lineTo(x + weight, y + height - weight * 2)
      ctx.lineTo(x, y + height - weight * 2)
      ctx.moveTo(x + width - weight * 2, y + height)
      ctx.lineTo(x + width - weight * 2, y + height - weight)
      ctx.lineTo(x, y + weight * 2)
    }

    ctx.stroke()

    ctx.restore()
  }
}
