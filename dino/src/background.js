export class Background {
  constructor(sprite) {
    this.sprite = sprite

    this.x = 0
    this.y = 0
  }

  update(speed) {
    const { width, scale } = this.sprite.floor()

    if (this.x < (-width / scale)) {
      this.x = 0
    } else {
      this.x -= speed
    }
  }

  draw(ctx) {
    const { img, x, y, width, height, scale } = this.sprite.floor()

    const yPos = ctx.canvas.height - 20

    ctx.drawImage(img, x, y, width, height, this.x, yPos, width / scale, height / scale)
    ctx.drawImage(img, x, y, width, height, this.x + (width / scale) - 30, yPos, width / scale, height / scale)
  }
}
