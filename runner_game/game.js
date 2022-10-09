import { UI } from './ui.js'
import { states } from './state.js'
import { Collition } from './animation.js'

export class Game {
  #enemyTypes = []
  #boomImage = null

  constructor(player, background, boomImage, enemies, canvasWidth, canvasHeight) {
    this.#enemyTypes = enemies
    this.#boomImage = boomImage

    this.player = player

    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight

    this.speed = 0
    this.maxSpeed = 2

    this.background = background

    this.enemies = []
    this.enemyInterval = 2000
    this.enemyTimer = 0

    this.particles = []
    this.collitions = []

    this.score = 0
    this.lives = 5

    this.ui = new UI(this)

    this.gameOver = false

    this.timer = 0
    this.maxTimer = 20000
  }

  update(input, deltaTime) {
    if (this.timer > this.maxTimer) {
      this.gameOver = true
    } else {
      this.timer += deltaTime
    }

    this.#checkCollition()

    this.background.update(this.speed)
    this.player.update(input.keys, deltaTime)

    if (this.enemyTimer > this.enemyInterval) {
      this.enemyTimer = 0

      this.#addEnemy()
    } else {
      this.enemyTimer += deltaTime
    }

    this.enemies = this.enemies.filter(item => !item.delete)
    this.particles = this.particles.filter(item => !item.delete)
    this.collitions = this.collitions.filter(item => !item.delete);

    [...this.enemies, ...this.particles, ...this.collitions].forEach(item => item.update(deltaTime))
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

    this.background.draw(ctx)
    this.player.draw(ctx);

    [...this.enemies, ...this.particles, ...this.collitions].forEach(item => item.draw(ctx))

    this.ui.draw(ctx)
  }

  #checkCollition() {
    this.enemies.forEach(enemy => {
      if (
        enemy.x < this.player.x + this.player.width &&
        enemy.x + enemy.width > this.player.x &&
        enemy.y < this.player.y + this.player.height &&
        enemy.y + enemy.height > this.player.y
      ) {
        enemy.delete = true

        this.collitions.push(new Collition(this.#boomImage, this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5))

        if ([states.ROLLING, states.DIVING].includes(this.player.currentState.state)) {
          this.score++
        } else {
          this.player.setState(states.HIT)

          this.lives--

          if (this.lives === 0) {
            this.gameOver = true
          }
        }      
      }  
    })
  }

  #getEnemyType(type) {
    const enemy = this.#enemyTypes.find(item => item.name === type).instance.clone()
    enemy.initialPosition(this)

    return enemy
  }

  #addEnemy() {
    const flyEnemy = this.#getEnemyType('Fly')
    this.enemies.push(flyEnemy)

    if (this.speed > 0 && Math.random() < 0.5) {
      const platEnemy = this.#getEnemyType('Plant')
      this.enemies.push(platEnemy)
    } else if (this.speed > 0) {
      const spiderEnemy = this.#getEnemyType('Spider')
      this.enemies.push(spiderEnemy)
    }
  }
}
