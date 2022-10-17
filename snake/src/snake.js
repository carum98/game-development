import { AXIS } from "./controls.js"

export class Snake {
  constructor({ size, color }) {
    this.x = 1
    this.y = 1

    this.size = size
    this.color = color

    this.direction = null

    this.tail = [{
      x: this.x,
      y: this.y
    }]

    this.tailSize = 1
  }

  update(direction) {
    if (direction) {
      this.direction = direction
    }
  
    if (this.direction !== null) {
      const [axis, value] = AXIS[this.direction]
      this[axis] += value

      if (this.tailSize === this.tail.length) {
        this.tail.shift()
      } 

      this.tail.push({
        x: this.x,
        y: this.y,
      })
    }
  }

  draw(ctx) {
    ctx.save()

    this.tail.forEach(element => {
      ctx.fillStyle = this.color
      ctx.fillRect(element.x * this.size, element.y * this.size, this.size, this.size)
    })

    ctx.restore()
  }

  grow() {
    this.tailSize++
  }
}
