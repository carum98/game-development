import { AXIS, DIRECTION } from './controls.js'

export class Ghosts {
  #shallow = []

  constructor({ ghosts }) {
    this.ghosts = ghosts
    this.score = 0

    this.#shallow = ghosts.map(ghost => ghost.clone())
  }

  update(game) {
    const { player, boundaries, sound } = game

    this.ghosts.forEach(ghost => ghost.update(boundaries))

    const ghost = this.ghosts.find(ghost => {
      const x = ghost.x - player.x
      const y = ghost.y - player.y

      return Math.sqrt(x * x + y * y) < 20
    })

    if (ghost && !ghost.infected) {
      game.gameover = true
      sound.play('death')
    } else if (ghost && ghost.infected) {
      this.ghosts = this.ghosts.filter(item => item !== ghost)

      // Revive ghost after 4 seconds
      setTimeout(() => {
        this.ghosts.push(this.#shallow.find(item => item.color === ghost.color).clone())
      }, 4000)

      sound.play('eatghost')

      this.score += 200
    }
  }

  draw(ctx) {
    this.ghosts.forEach(ghost => ghost.draw(ctx))
  }

  toogleInfected() {
    this.ghosts.forEach(ghost => ghost.infected = !ghost.infected)
  }

  reset() {
    this.ghosts = this.#shallow.map(ghost => ghost.clone())
    this.score = 0
  }
}

export class Ghost {
  constructor({ x, y, color }) {
    this.x = x
    this.y = y

    this.radius = 13
    this.color = color

    this.infected = false

    this.velocity = {
      x: 0,
      y: 0
    }

    this.movements = []
    this.direction = DIRECTION.UP
  }

  update(boundaries) {
    if (boundaries.collision(this)) {
      this.velocity.x = 0
      this.velocity.y = 0

      this.movements = boundaries.availableMovement(this)
      this.direction = this.movements[Math.floor(Math.random() * this.movements.length)]
    } else {
      const control = AXIS[this.direction]

      if (control) {
        const [axis, value] = Object.entries(control).at(0)
        this.velocity[axis] = value / 2.8
      }
    }

    this.x += this.velocity.x
    this.y += this.velocity.y
  }

  draw(ctx) {
    const x = this.x - this.radius
    const y = this.y

    ctx.save()

    ctx.beginPath()

    ctx.fillStyle = this.infected ? 'blue' : this.color

    // Draw head
    ctx.moveTo(x, y)
    ctx.quadraticCurveTo(x + 15, y - 25, x + 26, y)

    // Draw body
    ctx.moveTo(x, y)
    ctx.fillRect(x, y, this.radius * 2, this.radius)

    // Draw legs
    ctx.arc(x + 5, y + 13, 5, 0, Math.PI)
    ctx.arc(x + 13, y + 13, 5, 0, Math.PI)
    ctx.arc(x + 21, y + 13, 5, 0, Math.PI)

    ctx.fill()
    ctx.closePath()

    ctx.fillStyle = '#ffffff'

    if (this.infected) {
      ctx.beginPath()
      ctx.arc(x + 8, y, 2.5, 0, Math.PI * 8)
      ctx.fill()

      ctx.beginPath()
      ctx.arc(x + 20, y, 2.5, 0, Math.PI * 8)
      ctx.fill()

      // Draw mouth
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(x + 5, y + 8)
      ctx.lineTo(x + 22, y + 8)
      ctx.stroke()

    } else {
      // Draw eyes
      ctx.beginPath()
      ctx.arc(x + 8, y, 4, 0, Math.PI * 8)
      ctx.fill()

      ctx.beginPath()
      ctx.arc(x + 20, y, 4, 0, Math.PI * 8)
      ctx.fill()

      const directionX = 2 * (this.velocity.x === 0 ? 0 : this.velocity.x > 0 ? 1 : -1)
      const directionY = 2 * (this.velocity.y === 0 ? 0 : this.velocity.y > 0 ? 1 : -1)

      // Draw pupils
      ctx.fillStyle = '#000000'

      ctx.beginPath()
      ctx.arc(x + 8 + directionX, y + directionY, 2, 0, Math.PI * 8)
      ctx.fill()

      ctx.beginPath()
      ctx.arc(x + 20 + directionX, y + directionY, 2, 0, Math.PI * 8)
      ctx.fill()
    }

    ctx.restore()
  }

  clone() {
    return new Ghost(this)
  }
}
