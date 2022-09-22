const canvas1 = document.querySelector('#canvas1')
const canvas2 = document.querySelector('#canvas2')
const canvas3 = document.querySelector('#canvas3')
const canvas4 = document.querySelector('#canvas4')

const enemy1 = new Image()
enemy1.src = './assets/enemy1.png'

const enemy2 = new Image()
enemy2.src = './assets/enemy2.png'

const enemy3 = new Image()
enemy3.src = './assets/enemy3.png'

const enemy4 = new Image()
enemy4.src = './assets/enemy4.png'

const CANVAS_HEIGHT = canvas1.height = canvas2.height = canvas3.height = canvas4.height = window.innerHeight
const CANVAS_WIDTH = canvas1.width = canvas2.width = canvas3.width = canvas4.width = (window.innerWidth / 4) - 10

const scenes = [
  { 
    enemy: enemy1,
    frames: 6,
    count: 30,
    ctx: canvas1.getContext('2d'),
    animation: 'static'
  },
  {
    enemy: enemy2,
    frames: 6,
    count: 40,
    ctx: canvas2.getContext('2d'),
    animation: 'wave'
  },
  {
    enemy: enemy3,
    frames: 6,
    count: 30,
    ctx: canvas3.getContext('2d'),
    animation: 'snake'
  },
  {
    enemy: enemy4,
    frames: 9,
    count: 30,
    ctx: canvas4.getContext('2d'),
    animation: 'fast'
  },
]

let gameFrame = 0

class Enemy {
  constructor(image, framesCount, ctx, animation) {
    const { height, width } = image

    this.animation = animation
    this.ctx = ctx

    this.image = image
    this.framesCount = framesCount
    this.spriteHeight = height
    this.spriteWidth = width / this.framesCount

    this.height = this.spriteHeight / 2.5
    this.width = this.spriteWidth / 2.5

    this.x = Math.random() * (CANVAS_WIDTH - this.width)
    this.y = Math.random() * (CANVAS_HEIGHT - this.height)

    this.newX = Math.random() * (CANVAS_WIDTH - this.width)
    this.newY = Math.random() * (CANVAS_HEIGHT - this.height)

    this.speed = Math.random() * 4 + 1
    this.flapSpeed = Math.floor(Math.random() * 3 + 1)

    this.angle = 0
    this.angleSpeed = Math.random() * 0.2
    this.curve = Math.random() * 7

    this.snakeSpeed = Math.random() * 1.5 + 0.5

    this.interval = Math.floor(Math.random() * 200 + 50)

    this.frame = 0
    
  }

  update() {
    if (this.animation === 'static') {
      this.x += Math.random() * 5 - 2.5
      this.y += Math.random() * 5 - 2.5
    }

    if (this.animation === 'wave') {
      this.x -= this.speed
      this.y += this.curve * Math.sin(this.angle)

      this.angle += this.angleSpeed

      if (this.x + this.width < 0) this.x = CANVAS_WIDTH
    }

    if (this.animation === 'snake') {
      this.x = CANVAS_WIDTH / 2 * Math.cos(this.angle * Math.PI / 200) + (CANVAS_WIDTH / 2 - this.width / 2)
      this.y = CANVAS_HEIGHT / 2 * Math.sin(this.angle * Math.PI / 300) + (CANVAS_HEIGHT / 2 - this.height / 2)

      this.angle += this.snakeSpeed

      if (this.x + this.width < 0) this.x = CANVAS_WIDTH
    }

    if (this.animation === 'fast') {
      if (gameFrame % this.interval === 0) {
        this.newX = Math.random() * (CANVAS_WIDTH - this.width)
        this.newY = Math.random() * (CANVAS_HEIGHT - this.height)
      }

      let dx = this.x - this.newX
      let dy = this.y - this.newY

      this.x -= dx / 70
      this.y -= dy / 70
    }

    if (gameFrame % this.flapSpeed === 0) {
      this.frame >= this.framesCount - 1 ? this.frame = 0 : this.frame++
    }
  }

  draw() {
    this.ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
  }
}

const enemies = []

function animate() {
  scenes.forEach(({ ctx }) => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  })

  enemies.forEach(element => {
    element.update()
    element.draw()   
  })

  gameFrame++
  requestAnimationFrame(animate)
}

window.onload = () => {
  scenes.forEach(({ enemy, frames, count, ctx, animation}) => {
    enemies.push(...Array.from({length: count})
      .map(x => new Enemy(enemy, frames, ctx, animation)))
  })

  animate()
}

