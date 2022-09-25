const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

canvas.height = 720
canvas.width = 1300

const imagePlayer = new Image()
imagePlayer.src = './assets/player.png'

const imageBackground = new Image()
imageBackground.src = './assets/background_single.png'

const imageEnemy = new Image()
imageEnemy.src = './assets/enemy.png'

const availableKeys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight']

window.addEventListener('load', () => {
  let score = 0
  let gameOver = false

  class InputHandler {
    constructor() {
      this.keys = []

      window.addEventListener('keydown', ({ key }) => {
        if (availableKeys.includes(key) && !this.keys.includes(key)) {
          this.keys.push(key)
        } else if (key === 'Enter' && gameOver) {
          restartGame()
        }
      })

      window.addEventListener('keyup', ({ key }) => {
        if (availableKeys.includes(key) && this.keys.includes(key)) {
          this.keys.splice(this.keys.indexOf(key), 1)
        }
      })
    }
  }

  class Player {
    constructor(image, canvasWidth, canvasHeight) {
      this.canvasWidth = canvasWidth
      this.canvasHeight = canvasHeight

      this.maxFrame = 9

      this.image = image
      this.spriteWidth = image.width / this.maxFrame
      this.spriteHeight = image.height / 2

      this.width = 200
      this.height = 200

      this.x = 0
      this.y = this.canvasHeight - this.height

      this.vy = 0

      this.frameX = 0
      this.frameY = 0

      this.speed = 0
      this.weight = 1

      this.fps = 20
      this.interval = 1000 / this.fps
      this.timer = 0
    }

    update(input, deltaTime, enemies) {
      // collition detection
      enemies.forEach(enemy => {
        const dx = (enemy.x + enemy.width / 2.5) - (this.x + this.width / 2)
        const dy = (enemy.y + enemy.height / 2) - (this.y + this.height / 2)

        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < enemy.width / 2 + this.width / 2.5) {
          gameOver = true
        }
      })


      // sprite animation
      if (this.timer > this.interval) {
        if (this.frameX >= this.maxFrame - 1) {
          this.frameX = 0
        } else {
          this.frameX++
        }

        this.timer = 0
      } else {
        this.timer += deltaTime
      }

      // controls
      if (input.keys.includes('ArrowRight')) {
        this.speed = 7
      } else if (input.keys.includes('ArrowLeft')) {
        this.speed = -5
      } else {
        this.speed = 0
      }

      if (input.keys.includes('ArrowUp') && this.#onGround()) {
        this.vy -= 32
      }

      // Horizontal
      this.x += this.speed

      if (this.x < 0) {
        this.x = 0
      } else if (this.x > this.canvasWidth - this.width) {
        this.x = this.canvasWidth - this.width
      }

      // Vertical
      this.y += this.vy

      if (!this.#onGround()) {
        this.vy += this.weight
        this.frameY = 1
        this.maxFrame = 7
      } else {
        this.vy = 0
        this.frameY = 0
        this.maxFrame = 9
      }

      if (this.y > this.canvasHeight - this.height) {
        this.y = this.canvasHeight - this.height
      }
    }

    draw(ctx) {
      // ctx.strokeStyle = 'blue'
      // ctx.beginPath()
      // ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2)
      // ctx.stroke()

      ctx.drawImage(this.image, this.spriteWidth * this.frameX, this.spriteHeight * this.frameY, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }

    restart() {
      this.x = 0
      this.timer = 0
      this.frameX = 0
      this.frameY = 0
    }

    #onGround() {
      return this.y >= this.canvasHeight - this.height
    }
  }

  class Background {
    constructor(image, canvasWidth) {
      this.image = image
      this.width = this.image.width
      this.height = canvasWidth

      this.x = 0
      this.y = 0

      this.speed = 3
    }

    update() {
      this.x -= this.speed

      if (this.x < 0 - this.width) {
        this.x = 0
      }
    }

    draw(ctx) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
      ctx.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width,this.height)
    }

    restart() {
      this.x = 0
    }
  }

  class Enemy {
    constructor(image, canvasWidth, canvasHeight) {
      this.image = image
      
      this.maxFrame = 6

      this.width = image.width / this.maxFrame
      this.height = image.height

      this.x = canvasWidth
      this.y = canvasHeight - this.height

      this.frame = 0

      this.fps = 20
      this.interval = 1000 / this.fps
      this.timer = 0

      this.speed = 2

      this.delete = false
    }

    update(deltaTime) {
      if (this.timer > this.interval) {
        if (this.frame >= this.maxFrame - 1) {
          this.frame = 0
        } else {
          this.frame++
        }

        this.timer = 0
      } else {
        this.timer += deltaTime
      }

      this.x -= this.speed

      if (this.x < 0 - this.width) {
        this.delete = true
        score++
      }
    }

    draw(ctx) {
      // ctx.strokeStyle = 'blue'
      // ctx.beginPath()
      // ctx.arc(this.x + this.width / 2.5, this.y + this.height / 2, this.width / 2.5, 0, Math.PI * 2)
      // ctx.stroke()

      ctx.drawImage(this.image, this.width * this.frame, 0, this.width, this.height, this.x, this.y, this.width, this.height)
    }
  }

  let enemies = []
  const enemyInterval = 2000
  let enemyTimer = 0
  let randomInterval = 0

  function handlerEnemies(deltaTime) {
    if (enemyTimer > enemyInterval + randomInterval) {
      enemies.push(new Enemy(imageEnemy, canvas.width, canvas.height))
      randomInterval = Math.random() * 1000 + 500
      enemyTimer = 0
    } else {
      enemyTimer += deltaTime
    }

    enemies.forEach(element => {
      element.draw(ctx)
      element.update(deltaTime)
    })

    enemies = enemies.filter(element => !element.delete)
  }


  function displayScore(ctx) {
    ctx.textAlign = 'left'
    ctx.font = '40px Helvetica'
    ctx.fillStyle = 'black'
    ctx.fillText('Score: ' + score, 20, 50)
    ctx.fillStyle = 'white'
    ctx.fillText('Score: ' + score, 22, 52)
  }

  function displayGameOver(ctx) {
    ctx.textAlign = 'center'
    ctx.font = '60px Helvetica'
    ctx.fillStyle = 'black'
    ctx.fillText('Game Over, Press \'Enter\' to restart', canvas.width / 2, canvas.height / 2)
    ctx.fillStyle = 'white'
    ctx.fillText('Game Over, Press \'Enter\' to restart', canvas.width / 2 + 2, canvas.height / 2 + 2)
  }

  function restartGame() {
    gameOver = false

    enemies = []
    score = 0

    player.restart()
    background.restart()

    animate(0)
  }

  const input = new InputHandler()
  const player = new Player(imagePlayer, canvas.width, canvas.height)
  const background = new Background(imageBackground, canvas.width)

  let lastTime = 0

  function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    
    background.update()
    background.draw(ctx)

    player.update(input, deltaTime, enemies)
    player.draw(ctx)

    handlerEnemies(deltaTime)
    displayScore(ctx)

    if (gameOver) {
      displayGameOver(ctx)
    } else {
      requestAnimationFrame(animate)
    }
  }

  animate(0)
})
