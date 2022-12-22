import { Controls } from './controls.js'
import { drawText } from './util.js'
import { Sound } from './sound.js'

export class Game {
  #preTick = 0
  #fps = 60
  #control = new Controls()
  #highscore = localStorage.getItem('highscore')

  constructor({ player, ghosts, points, boundaries, powers, ctx }) {
    this.player = player
    this.ghosts = ghosts
    this.points = points
    this.boundaries = boundaries
    this.powers = powers
    this.ctx = ctx
    this.gameover = false
    this.sound = new Sound({ player, points })
  }

  init() {
    this.#menu()

    // This is a trick to play the menu sound when the page loads,
    // because the browser blocks audio from playing until the user interacts with the page.
    document.body.addEventListener("click", () => {
      this.sound.play('menu')
    }, { once: true })
  }

  #loop(timeStamp) {
    // If the game is over, load the game over screen and stop the game loop
    if (this.gameover) {
      setTimeout(() => this.#gameover(), 0)
      return
    }

    requestAnimationFrame(this.#loop.bind(this))

    if (timeStamp - this.#preTick < 1000 / this.#fps) return
    this.#preTick = timeStamp

    this.#update()
    this.#draw()
    this.#score()
  }

  #update() {
    const { player, points, boundaries, powers, ghosts } = this

    player.update(this.#control.key, boundaries)

    powers.update(this)
    ghosts.update(this)

    points.collision(player)

    this.sound.update()
  }

  #draw() {
    const { player, points, boundaries, powers, ghosts, ctx } = this

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    points.draw(ctx)
    boundaries.draw(ctx)
    powers.draw(ctx)
    ghosts.draw(ctx)
    player.draw(ctx)
  }

  #reset() {
    const { player, points, ghosts, powers } = this

    player.reset()
    ghosts.reset()
    points.reset()
    powers.reset()
  }

  #menu() {
    const { ctx } = this
    const highscore = localStorage.getItem('highscore') || 0

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawText({ ctx, text: 'PACMAN', x: 290, y: 190, color: 'yellow' })
    drawText({ ctx, text: 'PRESS SPACE TO PLAY', x: 290, y: 300 })

    drawText({ ctx, text: 'HIGH SCORE', x: 290, y: 390 })
    drawText({ ctx, text: highscore, x: 290, y: 420 })

    drawText({ ctx, text: 'By carum98', x: 290, y: 540 })

    // Wait for the user to press space to start the game
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        this.#loop(0)
        this.sound.stop('menu')
      }
    }, { once: true })
  }

  #gameover() {
    const { points, ghosts, boundaries, ctx } = this

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    boundaries.draw(ctx)
    points.draw(ctx)

    drawText({ ctx, text: 'GAME OVER', x: 290, y: 465, color: 'red' })

    // Handle the highscore
    const highscore = Math.max(points.score + ghosts.score, this.#highscore)

    if (highscore > this.#highscore) {
      this.#highscore = highscore
      localStorage.setItem('highscore', highscore)
    }

    // Wait 2 seconds before resetting the game and showing the menu
    setTimeout(() => {
      this.gameover = false

      this.#menu()
      this.#reset()
    }, 2000)
  }

  #score() {
    const { ctx } = this

    const score = this.points.score + this.ghosts.score
    const highscore = Math.max(score, this.#highscore)

    drawText({ ctx, text: score, x: 40, y: 70 })

    drawText({ ctx, text: 'HIGH SCORE', x: 290, y: 30 })
    drawText({ ctx, text: highscore, x: 290, y: 70 })
  }
}