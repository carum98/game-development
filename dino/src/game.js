import { Sprite } from './sprite.js'
import { Background } from './background.js'
import { Dino } from './dino.js'
import { Controls } from './controls.js'
import { Obstacle } from './obstacle.js'
import { Score } from './score.js'
import { GameOver } from './game-over.js'

export class Game {
  constructor({ canvas }) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')

    this.speed = 5
    this.fps = 70

    this.sprite = new Sprite()

    this.controls = new Controls()

    this.background = new Background(this.sprite)
    this.dino = new Dino(this.sprite)

    this.obstacles = []
    this.obstaclesInterval = 2000
    this.obstaclesTimes = 0

    this.score = new Score(this.sprite)

    this.gameOver = new GameOver(this)

    this.isPlaying = false

    // Initial draw
    setTimeout(() => this.draw(), 100);
  }

  update(deltaTime) {
    this.#checkCollition()

    if (this.obstaclesTimes > this.obstaclesInterval) {
      this.obstaclesTimes = 0
      this.#addObstables()
    } else {
      this.obstaclesTimes += deltaTime
    }

    this.background.update(this.speed)
    this.dino.update(this.controls, deltaTime)

    this.obstacles = this.obstacles.filter(item => !item.delete)
    this.obstacles.map(item => item.update(this.speed))

    this.score.update(deltaTime)
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.background.draw(this.ctx)
    this.dino.draw(this.ctx)

    this.obstacles.map(item => item.draw(this.ctx))

    this.score.draw(this.ctx)
  }

  start() {
    this.isPlaying = true
    this.gameOver.gameOver = false
    
    this.obstacles = []
    this.score.value = 0

    this.#gameLoop()
  }

  #gameLoop() {
    let tick = 0

    const nextTick = (timeStamp) => {
      if (this.gameOver.gameOver) return

      const deltaTime = timeStamp - tick

      requestAnimationFrame(nextTick)

      if (timeStamp - tick < 1000 / this.fps) return

      this.draw()
      this.update(deltaTime)

      tick = timeStamp
    }

    nextTick(0)
  }

  #addObstables() {
    this.obstacles.push(new Obstacle(this.sprite, this.ctx.canvas.width))
  }

  #checkCollition() {
    this.obstacles.forEach(obstacle => {
      const { dino } = this

      const widthDino = dino.x + dino.sprite.spriteWidth / dino.sprite.scale
      const heightDino = dino.y + dino.sprite.height / dino.sprite.scale

      const widthObstacle = obstacle.x + obstacle.sprite.width / obstacle.sprite.scale
      const heightObstacle = obstacle.y + obstacle.sprite.height / obstacle.sprite.scale

      if (
        obstacle.x < widthDino &&
        widthObstacle > dino.x &&
        obstacle.y < heightDino &&
        heightObstacle > dino.y
      ) {
        this.isPlaying = false
        this.gameOver.trigger(this.ctx)
      }
    })
  }
}
