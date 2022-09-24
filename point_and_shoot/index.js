const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const collition = document.querySelector('#collition')
const ctxCollition = collition.getContext('2d')

canvas.width = collition.width = window.innerWidth
canvas.height = collition.height = window.innerHeight
ctx.font = '50px Impact'

const image = new Image()
image.src = './assets/raven.png'

const imageExplotion = new Image()
imageExplotion.src = './assets/boom.png' 

let timeToNext = 0
let interval = 1000
let lastTime = 0

let score = 0

let gameOver = false

class Raven {
  constructor() {
    this.x = canvas.width
    this.y = Math.random() * (canvas.height - 500)

    this.sizeModifier = Math.random() * 0.6 + 0.4

    this.image = image
    this.spriteWidth = this.image.width / 6
    this.spriteHeight = this.image.height

    this.width = this.spriteWidth * this.sizeModifier
    this.height = this.spriteHeight * this.sizeModifier

    this.directionX = Math.random() * 5 + 3
    this.directionY = Math.random() * 5 - 2.5

    this.frame = 0
    this.maxFrame = 4
    this.timestampFlap = 0
    this.intervalFlap = Math.random() * 50 + 50

    this.delete = false

    this.randomColor = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]
    this.color = `rgb(${this.randomColor[0]}, ${this.randomColor[1]}, ${this.randomColor[2]})`

    this.hasParticles = Math.random() < 0.2
  }

  update(deltaTime) {
    if (this.x < 0 - this.width) {
      gameOver = true
    }

    if (this.y < 0 || this.y > canvas.height - this.height) {
      this.directionY = this.directionY * -1
    }

    this.x -= this.directionX
    this.y += this.directionY

    if (this.x < 0 - canvas.width) {
      this.delete = true
    }

    this.timestampFlap += deltaTime

    if (this.timestampFlap > this.intervalFlap) {
      if (this.frame > this.maxFrame) {
        this.frame = 0
      } else {
        this.frame++
      }

      this.timestampFlap = 0

      if (this.hasParticles) {
        for (let i = 0; i < 5; i++) {
          particles.push(new Particle(this.x, this.y, this.color, this.width))
        }
      }

    }
  }

  draw() {
    ctxCollition.fillStyle = this.color
    ctxCollition.fillRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
  }
}

class Explotion {
  constructor(x, y, size, image) {
    this.x = x
    this.y = y
    this.size = size

    this.image = image
    this.spriteWidth = image.width / 5
    this.spriteHeight = image.height

    this.frame = 0
    this.timeLastFrame = 0
    this.frameInterval = 200

    this.delete = false

    this.sound = new Audio()
    this.sound.src = './assets/boom.wav'
    this.sound.volume = 0.1
  }

  update(deltaTime) {
    if (this.frame === 0) {
      this.sound.play()
    }

    this.timeLastFrame += deltaTime

    if (this.timeLastFrame > this.frameInterval) {
      this.frame++
      this.timeLastFrame = 0

      if (this.frame > 5) {
        this.delete = true
      }
    }
  }

  draw() {
    ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x - this.size / 4, this.y - this.size / 4, this.size, this.size)
  }
}

class Particle {
  constructor(x, y, color, size) {
    this.size = size
    this.x = x + this.size / 2
    this.y = y + this.size / 3
    this.color = color

    this.radius = Math.random() * this.size / 10
    this.maxRadius = Math.random() * 20 + 35

    this.delete = false

    this.speedX = Math.random() * 1 + 0.5
  }

  update() {
    this.x += this.speedX
    this.radius += 0.5

    if (this.radius > this.maxRadius - 5) {
      this.delete = true
    }
  }

  draw() {
    ctx.save()

    ctx.globalAlpha = 1 - this.radius / this.maxRadius
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
  }
}

let ravens = []
let explotions = []
let particles = []

window.addEventListener('click', (e) => {
  const pixelColor = ctxCollition.getImageData(e.x, e.y, 1, 1).data

  ravens.forEach(element => {
    const color = element.randomColor

    if (color[0] === pixelColor[0] && color[1] === pixelColor[1] && color[2] === pixelColor[2]) {
      element.delete = true
      score++

      explotions.push(new Explotion(e.x, e.y, element.width, imageExplotion))
    }
  })
})

function drawScore() {
  ctx.fillStyle = 'black'
  ctx.fillText('Score: ' + score, 50, 75)
  ctx.fillStyle = 'white'
  ctx.fillText('Score: ' + score, 55, 80)
}

function drawGameOver() {
  ctx.textAlign = 'center'
  ctx.fillStyle = 'black'
  ctx.fillText('Game Over - Score: ' + score, canvas.width / 2, canvas.height / 2)

  ctx.textAlign = 'center'
  ctx.fillStyle = 'white'
  ctx.fillText('Game Over - Score: ' + score, canvas.width / 2 + 5, canvas.height / 2 + 5)
}

function animate(timestamp) {
  ctxCollition.clearRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  timeToNext += deltaTime;

  if (timeToNext > interval) {
    ravens.push(new Raven())
    timeToNext = 0

    ravens.sort((a, b) => a.width - b.width)
  }

  drawScore();

  [...particles, ...ravens, ...explotions].forEach(element => element.update(deltaTime));
  [...particles, ...ravens, ...explotions].forEach(element => element.draw());

  explotions = explotions.filter(item => !item.delete)
  ravens = ravens.filter(item => !item.delete)
  particles = particles.filter(item => !item.delete)

  if (gameOver) {
    drawGameOver()
  } else {
    requestAnimationFrame(animate)
  }
}

window.onload = () => {
  animate(0)
}
