const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const CANVAS_HEIGHT = canvas.height = 700
const CANVAS_WIDTH = canvas.width = 500

const canvasPosition = canvas.getBoundingClientRect()

const image = new Image()
image.src = './assets/boom.png'

const explotions = []

class Explotion {
  constructor(x, y, image) {

    this.image = image
    this.spriteWidth = image.width / 5
    this.spriteHeight = image.height

    this.width = this.spriteWidth / 2
    this.height = this.spriteHeight / 2

    this.x = x
    this.y = y

    this.timer = 0
    this.frame = 0

    this.angle = Math.random() * 6.2
  }

  update() {
    this.timer++
    if (this.timer % 10 === 0) {
      this.frame++
    }
  }

  draw() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)

    ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, 0 - this.width / 2, 0 - this.height / 2, this.width, this.height)

    ctx.restore()
  }
}

canvas.addEventListener('click', createExplotion)
canvas.addEventListener('mousemove', createExplotion)

function createExplotion(event) {
  const x = event.x - canvasPosition.left
  const y = event.y - canvasPosition.top

  explotions.push(new Explotion(x, y, image))
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  
  explotions.forEach((element, index) => {
    element.update()
    element.draw()

    if (element.frame > 5) {
      explotions.splice(index, 1)
    }
  })

  requestAnimationFrame(animate)
}

window.onload = () => {
  animate()
}

