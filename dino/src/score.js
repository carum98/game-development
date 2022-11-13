export class Score {
  constructor(sprite) {
    this.sprite = sprite
    this.value = 0

    this.record = 0

    this.x = 400
    this.y = 0

    this.interval = 200
    this.timer = 0
  }

  update(deltaTime) {
    if (this.timer > this.interval) {
      this.value++
      this.timer = 0
    } else {
      this.timer += deltaTime
    }
  }

  draw(ctx) {
    this.#drawRecordScore(ctx)

    this.#drawScore(ctx, this.record, this.x + 35)
    this.#drawScore(ctx, this.value, this.x + 120)
  }

  #drawRecordScore(ctx) {
    const { img, x, y, width, height } = this.sprite.hi()
    ctx.drawImage(img, x, y, width, height, this.x, this.y, width / 2, height / 2)
  }

  #drawScore(ctx, value, xPos) {
    const { img, x, y, height, spriteWidth, scale } = this.sprite.numbers()

    const score = value.toString().padStart(5, "0").split('')

    score.forEach((value, index) => {
      ctx.drawImage(
        img,
        x + (spriteWidth * value),
        y,
        spriteWidth,
        height,
        xPos + (14 * index),
        this.y,
        spriteWidth / scale,
        height / scale,
      )
    })
  }
}
