import { Boundary } from "./boundary.js"

export class Points {
  #shallow = []
  #total = 0

  constructor({ points }) {
    this.points = points
    this.#total = points.length
    this.#shallow = points.map(point => point.clone())
  }

  get score() {
    return (this.#total - this.points.length) * 10
  }

  collision(player) {
    const { x, y, velocity } = player

    const xVelocity = x + velocity.x
    const yVelocity = y + velocity.y

    const point = this.points.find(({ x, y }) => x <= xVelocity && x >= xVelocity && y <= yVelocity && y >= yVelocity)

    if (point) {
      const index = this.points.indexOf(point)
      this.points.splice(index, 1)
    }
  }

  isEmptyArea(player) {
    const point = this.points.find(item => {
      const x = item.x - player.x
      const y = item.y - player.y

      return Math.sqrt(x * x + y * y) <= Boundary.width
    })

    return !!point
  }

  draw(ctx) {
    this.points.forEach(point => point.draw(ctx))
  }

  reset() {
    this.points = this.#shallow.map(point => point.clone())
  }
}

export class Point {
  constructor({ x, y }) {
    this.x = x
    this.y = y

    Object.freeze(this)
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2)
    ctx.fillStyle = 'yellow'
    ctx.fill()
    ctx.closePath()
  }

  clone() {
    return new Point(this)
  }
}
