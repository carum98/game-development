const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const wormImage = new Image()
wormImage.src = './assets/enemy_worm.png'

const ghostImage = new Image()
ghostImage.src = './assets/enemy_ghost.png'

const spiderImage = new Image()
spiderImage.src = './assets/enemy_spider.png'

canvas.height = window.innerHeight - 250
canvas.width = window.innerHeight - 300

window.addEventListener('load', () => {
  class Game {
    constructor(ctx, width, height) {
      this.ctx = ctx
      this.width = width
      this.height = height

      this.enemies = []
      this.enemyTypes = ['worm', 'ghost', 'spider']

      this.interval = 1000
      this.timer = 0
    }

    update(deltaTime) {
      this.enemies = this.enemies.filter(element => !element.delete)

      if (this.timer > this.interval) {
        this.#addEnemy()
        this.timer = 0
      } else {
        this.timer += deltaTime
      }

      this.enemies.forEach(element => element.update(deltaTime))
    }

    draw() {
      this.ctx.clearRect(0, 0, this.width, this.height)
      this.enemies.forEach(element => element.draw())
    }

    #addEnemy() {
      const randomType = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)]

      if (randomType === 'worm') {
        this.enemies.push(new Worm(this))
      }

      if (randomType === 'ghost') {
        this.enemies.push(new Ghost(this))
      }

      if (randomType === 'spider') {
        this.enemies.push(new Spider(this))
      }
    }
  }

  class Enemy {
    constructor(game, image, frames) {
      this.game = game

      this.image = image
      this.spriteWidth = image.width / frames
      this.spriteHeight = image.height

      this.width = this.spriteWidth / 2
      this.height = this.spriteHeight / 2

      this.x = this.game.width
      this.y = this.game.height

      this.frame = 0
      this.maxFrames = frames
      this.interval = 100
      this.timer = 0

      this.vx = Math.random() * 0.1 + 0.1

      this.delete = false
    }

    update(deltaTime) {
      this.x -= this.vx * deltaTime

      if (this.x < 0 - this.game.width) {
        this.delete = true
      }

      if (this.timer > this.interval) {
        if (this.frame < this.maxFrames - 1) {
          this.frame++
        } else {
          this.frame = 0
        }

        this.timer = 0
      } else {
        this.timer += deltaTime
      }
    }

    draw() {
      this.game.ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
  }

  class Worm extends Enemy {
    constructor(game) {
      super(game, wormImage, 6)

      this.y = this.game.height - this.height
    }
  }

  class Ghost extends Enemy {
    constructor(game) {
      super(game, ghostImage, 6)

      this.y = Math.random() * this.game.height * 0.6
      this.angle = 0
      this.curve = Math.random() * 1
    }

    update(deltaTime) {
      super.update(deltaTime)
      this.y += Math.sin(this.angle) * this.curve
      this.angle += 0.02
    }

    draw() {
      this.game.ctx.save()
      this.game.ctx.globalAlpha = 0.7
      super.draw()
      ctx.restore()
    }
  }

  class Spider extends Enemy {
    constructor(game) {
      super(game, spiderImage, 6)

      this.vx = 0
      this.vy = Math.random() * 0.1 + 0.1

      this.x = Math.random() * this.game.width
      this.y = 0 - this.height

      this.maxLength = Math.random() * this.game.height
    }

    update(deltaTime) {
      super.update(deltaTime)

      this.y += this.vy * deltaTime

      if (this.y > this.maxLength) {
        this.vy *= -1
      }
    }

    draw() {
      this.game.ctx.beginPath()
      this.game.ctx.moveTo(this.x + this.width / 2, 0)
      this.game.ctx.lineTo(this.x + this.width / 2, this.y + 10)
      this.game.ctx.stroke()
      super.draw()
    }
  }

  const game = new Game(ctx, canvas.width, canvas.height)
  let lastTime = 1

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp

    game.draw()
    game.update(deltaTime)

    requestAnimationFrame(animate)
  }

  animate(0)
})

