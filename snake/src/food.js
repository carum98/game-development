export class Food {
  constructor({ size, color }) {
    this.x = 0
    this.y = 0

    this.size = size
    this.color = color
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size)
  }
}
