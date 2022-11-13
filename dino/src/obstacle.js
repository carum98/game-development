export class Obstacle {
  constructor(sprite, canvasWidth) {
    const type = Math.random() < 0.5 ? 'cactus1' : 'cactus2'

    this.sprite = sprite[type]()

    this.x = canvasWidth
    this.y = 115

    this.delete = false
  }

  update(speed) {
    this.x -= speed

    if (this.x < -100) {
      this.delete = true
    }
  }

  draw(ctx) {
    const { img, x, y, width, height, scale } = this.sprite

    ctx.drawImage(img, x, y, width, height, this.x, this.y, width / scale, height / scale)
  }
}
