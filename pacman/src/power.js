export class Powers {
  #shallow = []

  constructor({ powers }) {
    this.powers = powers
    this.#shallow = powers.map(power => power.clone())
  }

  update(game) {
    const { player, ghosts, sound } = game

    const power = this.powers.find(power => {
      const x = power.x - player.x
      const y = power.y - player.y

      return Math.sqrt(x * x + y * y) < 20
    })

    // Eat power and toggle ghosts infected
    if (power) {
      this.powers = this.powers.filter(item => item !== power)

      ghosts.toogleInfected()
      sound.play('power')

      setTimeout(() => {
        ghosts.toogleInfected()
      }, 4000)
    }

    this.powers.forEach(power => power.update())
  }

  draw(ctx) {
    this.powers.forEach(power => power.draw(ctx))
  }

  reset() {
    this.powers = this.#shallow.map(power => power.clone())
  }
}

export class Power {
  constructor({ x, y }) {
    this.x = x
    this.y = y

    this.blip = 0
  }

  update() {
    this.blip += 0.5

    if (this.blip > 2 * Math.PI) {
      this.blip = 0
    }
  }

  draw(ctx) {
    if (this.blip < Math.PI) {
      ctx.fillStyle = 'black'
    } else {
      ctx.fillStyle = 'yellow'
    }

    ctx.beginPath()
    ctx.arc(this.x, this.y, 8, 0, 2 * Math.PI)
    ctx.fill()
  }

  clone() {
    return new Power(this)
  }
}