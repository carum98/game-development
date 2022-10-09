export class UI {
  #heardImage = null

  constructor(game) {
    this.game = game

    this.fontSize = 30
    this.fontFamily = 'Creepster'

    this.#heardImage = new Image()
    this.#heardImage.src = './assets/heart.png'
  }

  draw(ctx) {
    ctx.save()

    ctx.font = this.fontSize + 'px ' + this.fontFamily
    ctx.textAlign = 'left'
    ctx.fillStyle = '#fff'

    // Score
    ctx.fillText('Score: ' + this.game.score, 20, 50)

    // Timer
    ctx.font = this.fontSize * 0.8 + 'px ' + this.fontFamily
    ctx.fillText('Time: ' + (this.game.timer * 0.001).toFixed(1), 20, 80)

    // Game Over
    if (this.game.gameOver) {
      ctx.textAlign = 'center'
      ctx.font = this.fontSize * 2 + 'px ' + this.fontFamily

      ctx.fillText('Game Over', this.game.canvasWidth * 0.5, this.game.canvasHeight * 0.5)
    }

    // lives
    for (let i = 0; i < this.game.lives; i++) {
      ctx.drawImage(this.#heardImage, 30 * i + 20, 95, 25, 25)
    }

    ctx.restore()
  }
}

