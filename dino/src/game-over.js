export class GameOver {
  constructor(game) {
    this.gameOver = false

    this.sprite = game.sprite.gameOver()

    this.x = game.canvas.width / 3
    this.y = game.canvas.height / 3

    this.dino = game.dino
  }

  trigger(ctx) {
    this.gameOver = true
    this.dino.isDead(ctx)
    this.#draw(ctx)
  }

  clear() {
    this.gameOver = false
  }

  #draw(ctx) {
    const { img, x, y, width, height, scale } = this.sprite

    ctx.drawImage(img, x, y, width, height, this.x, this.y, width / scale, height / scale)
  }
}
